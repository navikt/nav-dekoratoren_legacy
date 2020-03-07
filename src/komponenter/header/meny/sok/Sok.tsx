import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import cls from 'classnames';
import { Input } from 'nav-frontend-skjema';
import { Language } from '../../../../reducer/language-duck';
import Environment, { genererUrl } from '../../../../utils/Environment';
import { finnTekst } from '../../../../tekster/finn-tekst';
import {
    defaultData,
    InputState,
    SokeresultatData,
    visAlleTreff,
} from './sok-utils';
import SokeforslagIngress from './sok-innhold/SokeforslagIngress';
import Sokeforslagtext from './sok-innhold/Sokeforslagtext';
import DesktopSokknapp from './sok-innhold/DesktopSokknapp';
import Sokknapp from './sok-innhold/sok-modal/sok-modal-knapp/Sokknapp';
import './Sok.less';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';
import BEMHelper from '../../../../utils/bem';

interface StateProps {
    language: Language;
}

interface Props {
    tabindex?: boolean;
}

const predefinedlistview = 5;
const mobileCls = BEMHelper('sok');

class Sok extends React.Component<StateProps & Props, InputState> {
    handleChangeThrottled: ReturnType<typeof throttle>;
    ismounted: boolean = false;

    constructor(props: StateProps & Props) {
        super(props);
        this.state = {
            selectedInput: '',
            writtenInput: '',
            items: [defaultData],
            setBackground: false,
        };
        this.handleChangeThrottled = throttle(
            this.handleValueChange.bind(this),
            200
        );
    }

    componentDidMount(): void {
        this.ismounted = true;
    }

    componentWillUnmount(): void {
        this.ismounted = false;
    }

    cssIndex = (index: number) => {
        return { '--listmap': index } as React.CSSProperties;
    };

    handleValueChange(input: string) {
        const url = `${Environment.APP_BASE_URL}/api/sok`;
        if (input === '') {
            this.setState({ setBackground: false });
        }

        if (this.ismounted) {
            this.setState({
                selectedInput: input,
                writtenInput: input,
            });
        }

        fetch(`${url}?ord=${input}`)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(response => response.json())
            .then(json => {
                if (this.ismounted) {
                    const tmp = [...json.hits];
                    tmp.unshift(visAlleTreff(this.state.writtenInput));
                    this.setState({
                        items: tmp,
                    });
                }
            });
    }

    handleSelect(selection: SokeresultatData) {
        window.location.href = genererUrl(selection.href);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        window.location.href = genererUrl(url);
    }

    input = (inputValue: SokeresultatData): string => {
        if (inputValue) {
            return inputValue.displayName;
        }
        return this.state.selectedInput;
    };

    gethighlightedindex = (
        state: DownshiftState<any>,
        keypressdown: boolean
    ) => {
        if (state.isOpen) {
            if (typeof state.highlightedIndex === 'number') {
                return keypressdown &&
                    state.highlightedIndex !== predefinedlistview
                    ? (state.highlightedIndex += 1)
                    : !keypressdown && state.highlightedIndex !== 0
                    ? (state.highlightedIndex -= 1)
                    : state.highlightedIndex;
            }
            if (typeof state.highlightedIndex === 'object') {
                return (state.highlightedIndex = 0);
            }
        }
    };

    setDownshiftchanges = (
        isopen: boolean,
        highlightedindex: number | null,
        inputvalue: string,
        changes: StateChangeOptions<any>
    ) => {
        return {
            ...changes,
            isOpen: isopen,
            highlightedIndex: highlightedindex,
            inputValue: inputvalue,
        };
    };

    stateReducer = (
        state: DownshiftState<any>,
        changes: StateChangeOptions<any>
    ) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.keyDownArrowDown:
                if (state.isOpen) {
                    this.gethighlightedindex(state, true);

                    if (typeof state.highlightedIndex === 'number') {
                        this.setState({
                            selectedInput: this.state.items[
                                state.highlightedIndex
                            ].displayName,
                        });
                        return this.setDownshiftchanges(
                            state.isOpen,
                            state.highlightedIndex,
                            this.state.items[
                                state.highlightedIndex
                                    ? state.highlightedIndex
                                    : 0
                            ].displayName,
                            changes
                        );
                    }
                }
                return this.setDownshiftchanges(
                    state.isOpen,
                    state.highlightedIndex,
                    this.state.selectedInput,
                    changes
                );

            case Downshift.stateChangeTypes.keyDownArrowUp:
                if (state.isOpen) {
                    this.gethighlightedindex(state, false);
                    if (typeof state.highlightedIndex === 'number') {
                        this.setState({
                            selectedInput: this.state.items[
                                state.highlightedIndex
                            ].displayName,
                        });
                        return this.setDownshiftchanges(
                            state.isOpen,
                            state.highlightedIndex,
                            this.state.items[
                                state.highlightedIndex
                                    ? state.highlightedIndex
                                    : 0
                            ].displayName,
                            changes
                        );
                    }
                }
                return {
                    ...changes,
                    isOpen: state.isOpen,
                    highlightedIndex: state.highlightedIndex,
                };
            default:
                return changes;
        }
    };

    enableBackground = (isOpen: boolean) => {
        if (isOpen !== this.state.setBackground) {
            this.setState({ setBackground: isOpen });
        }
    };

    render() {
        const { selectedInput, items } = this.state;
        const { language } = this.props;
        const URL = `${Environment.APP_BASE_URL}/api/sok?ord=${selectedInput}`;
        const klassenavn = cls('sok-input', {
            engelsk: language === Language.ENGELSK,
        });

        return (
            <>
                <Downshift
                    stateReducer={this.stateReducer}
                    onChange={selection => {
                        this.handleSelect(selection);
                    }}
                    onInputValueChange={(
                        changes: string,
                        stateAndHelpers: any
                    ) => {
                        this.enableBackground(stateAndHelpers.isOpen);
                        stateAndHelpers.getInputProps();
                        this.handleChangeThrottled(changes);
                    }}
                    itemToString={item => this.input(item)}
                >
                    {({
                        getInputProps,
                        getItemProps,
                        getLabelProps,
                        getMenuProps,
                        isOpen,
                        inputValue,
                    }) => {
                        return (
                            <form
                                className="sok"
                                id="sok"
                                role="search"
                                onSubmit={event => {
                                    triggerGaEvent({
                                        category: GACategory.Header,
                                        action: 'søk',
                                        label: selectedInput,
                                    });
                                    this.handleSubmit(event, URL);
                                }}
                            >
                                <>
                                    <div className="sok-wrapper">
                                        <div className="sok-container">
                                            <div className="sok-input-resultat">
                                                <Input
                                                    {...getInputProps()}
                                                    className={klassenavn}
                                                    placeholder={finnTekst(
                                                        'sok-input-placeholder',
                                                        language
                                                    )}
                                                    label={finnTekst(
                                                        'sok-input-label',
                                                        language
                                                    )}
                                                    aria-label={finnTekst(
                                                        'sok-input-label',
                                                        language
                                                    )}
                                                    id={
                                                        'desktop-decorator-sok-input'
                                                    }
                                                />
                                                />
                                                <ul
                                                    className="sokeresultat-liste"
                                                    {...getMenuProps()}
                                                >
                                                    {isOpen &&
                                                    inputValue !== '' &&
                                                    items
                                                        ? items
                                                              .slice(
                                                                  0,
                                                                  predefinedlistview +
                                                                      1
                                                              )
                                                              .map(
                                                                  (
                                                                      item,
                                                                      index
                                                                  ) => (
                                                                      <li
                                                                          {...getItemProps(
                                                                              {
                                                                                  key: index,
                                                                                  index,
                                                                                  item,
                                                                              }
                                                                          )}
                                                                          style={this.cssIndex(
                                                                              index
                                                                          )}
                                                                      >
                                                                          <SokeforslagIngress
                                                                              className="sok-resultat-listItem"
                                                                              displayName={
                                                                                  item.displayName
                                                                              }
                                                                          />
                                                                          <Sokeforslagtext
                                                                              highlight={
                                                                                  item.highlight
                                                                              }
                                                                          />
                                                                      </li>
                                                                  )
                                                              )
                                                        : null}
                                                </ul>
                                            </div>
                                            <DesktopSokknapp />
                                            <Sokknapp />
                                        </div>
                                    </div>
                                </>
                            </form>
                        );
                    }}
                </Downshift>
                <div className="media-sm-mobil mobil-meny">
                    <div
                        className={mobileCls.element(
                            'bakgrunn',
                            this.state.setBackground ? 'active' : ''
                        )}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Sok);
