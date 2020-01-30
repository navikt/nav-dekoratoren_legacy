import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import cls from 'classnames';
import { Input } from 'nav-frontend-skjema';
import { Language } from '../../../../reducer/language-duck';
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
import Mobilsokknapp from './sok-innhold/sok-modal/sok-modal-knapp/Mobilsokknapp';
import './Sok.less';
import Environment, { genererUrl } from '../../../../utils/Environment';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';

interface StateProps {
    language: Language;
}

const predefinedlistview = 5;

class Sok extends React.Component<StateProps, InputState> {
    handleChangeThrottled: ReturnType<typeof throttle>;
    ismounted: boolean = false;

    constructor(props: StateProps) {
        super(props);
        this.state = {
            inputString: '',
            writtenInput: '',
            items: [defaultData],
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
        const url = Environment.sokeresultat;

        if (this.ismounted) {
            this.setState({
                inputString: input,
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
                    this.setState({
                        items: json.hits,
                    });
                }
            });
    }

    handleSelect(selection: SokeresultatData) {
        window.location.href = selection.href.startsWith('http')
            ? selection.href
            : genererUrl(selection.href);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        const redirectTo = genererUrl(url);
        location.href = redirectTo;
    }

    input = (inputValue: string): string => {
        if (inputValue) {
            return inputValue;
        }
        return this.state.inputString;
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

    setDownshitchanges = (
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
                            inputString: this.state.items[
                                state.highlightedIndex
                            ].displayName,
                        });
                        return this.setDownshitchanges(
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
                return this.setDownshitchanges(
                    state.isOpen,
                    state.highlightedIndex,
                    this.state.inputString,
                    changes
                );

            case Downshift.stateChangeTypes.keyDownArrowUp:
                if (state.isOpen) {
                    this.gethighlightedindex(state, false);
                    if (typeof state.highlightedIndex === 'number') {
                        this.setState({
                            inputString: this.state.items[
                                state.highlightedIndex
                            ].displayName,
                        });
                        return this.setDownshitchanges(
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

    render() {
        const { inputString, items } = this.state;
        const { language } = this.props;
        const URL = `https://www-x1.nav.no/sok?ord=${inputString}`;
        const lenkeAlleTreff = visAlleTreff(inputString);
        const klassenavn = cls('sok-input', {
            engelsk: language === Language.ENGELSK,
        });

        if (items && items.length > 0) {
            if (
                items[0].displayName &&
                items[0].displayName === this.state.writtenInput
            ) {
                items.shift();
            }
            items.unshift(visAlleTreff(this.state.writtenInput));
        }

        return (
            <Downshift
                stateReducer={this.stateReducer}
                onChange={selection => {
                    this.handleSelect(selection);
                }}
                onInputValueChange={(changes: string, stateAndHelpers: any) => {
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
                            onSubmit={event => this.handleSubmit(event, URL)}
                        >
                            <>
                                <div className="sok-wrapper">
                                    <div className="media-mobil-tablet">
                                        <Innholdstittel>
                                            Hva leter du etter?
                                        </Innholdstittel>
                                    </div>
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
                                            />
                                            <Mobilsokknapp />
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
                                                              (item, index) => (
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
                                    </div>
                                </div>
                            </>
                        </form>
                    );
                }}
            </Downshift>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Sok);
