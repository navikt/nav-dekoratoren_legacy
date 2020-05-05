import React from 'react';
import { AppState } from 'store/reducers';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import cls from 'classnames';
import { Input } from 'nav-frontend-skjema';
import { Language } from 'store/reducers/language-duck';
import { genererUrl } from 'utils/Environment';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { defaultData, InputState } from './sok-utils';
import { SokeresultatData, visAlleTreff } from './sok-utils';
import SokKnapper from 'komponenter/header/header-regular/meny/sok/sok-innhold/SokKnapper';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import { Systemtittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import BEMHelper from 'utils/bem';
import { EnvironmentState } from 'store/reducers/environment-duck';
import './Sok.less';
import SokResultater from 'komponenter/header/header-regular/meny/sok/sok-innhold/SokResultater';

interface StateProps {
    language: Language;
    environment: EnvironmentState;
    menuIsOpen: boolean;
}

interface Props {
    tabindex?: boolean;
}

const predefinedlistview = 5;
const mobileCls = BEMHelper('sok');

class Sok extends React.Component<StateProps & Props, InputState> {
    fetchSearchResultThrottled: ReturnType<typeof debounce>;
    ismounted: boolean = false;
    initialState = {
        loading: false,
        selectedInput: '',
        writtenInput: '',
        items: [defaultData],
        setBackground: false,
    };

    constructor(props: StateProps & Props) {
        super(props);
        this.state = this.initialState;
        this.fetchSearchResultThrottled = debounce(this.fetchSearchResult, 200);
    }

    componentDidMount(): void {
        this.ismounted = true;
    }

    componentWillUnmount(): void {
        this.ismounted = false;
    }

    handleValueChange = (input: string) => {
        if (this.ismounted) {
            if (input === this.state.writtenInput) {
                return;
            }
            if (input === '') {
                this.setState({ setBackground: false });
            }

            this.setState({
                selectedInput: input,
                writtenInput: input,
            });

            if (input) {
                this.setState({
                    loading: true,
                });
            }
            this.fetchSearchResultThrottled(input);
        }
    };

    fetchSearchResult = (input: string) => {
        const { APP_BASE_URL, XP_BASE_URL } = this.props.environment;
        const url = `${APP_BASE_URL}/api/sok`;
        fetch(`${url}?ord=${input}`)
            .then((response) => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((response) => response.json())
            .then((json) => {
                if (this.ismounted) {
                    const tmp = [...json.hits];
                    tmp.unshift(
                        visAlleTreff(XP_BASE_URL, this.state.writtenInput),
                    );
                    this.setState({
                        items: tmp,
                        loading: false,
                    });
                }
            });
    };

    handleSelect = (selection: SokeresultatData) => {
        const { XP_BASE_URL } = this.props.environment;
        window.location.href = genererUrl(XP_BASE_URL, selection.href);
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { XP_BASE_URL } = this.props.environment;
        const { selectedInput } = this.state;
        triggerGaEvent({
            category: GACategory.Header,
            label: selectedInput,
            action: 'søk',
        });
        const url = `${XP_BASE_URL}/sok?ord=${selectedInput}`;
        window.location.href = genererUrl(XP_BASE_URL, url);
    };

    input = (inputValue: SokeresultatData): string => {
        if (inputValue) {
            return inputValue.displayName;
        }
        return this.state.selectedInput;
    };

    gethighlightedindex = (
        state: DownshiftState<any>,
        keypressdown: boolean,
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
        changes: StateChangeOptions<any>,
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
        changes: StateChangeOptions<any>,
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
                            changes,
                        );
                    }
                }
                return this.setDownshiftchanges(
                    state.isOpen,
                    state.highlightedIndex,
                    this.state.selectedInput,
                    changes,
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
                            changes,
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
        if (
            (isOpen !== this.state.setBackground &&
                this.state.writtenInput === '') ||
            (!isOpen && this.state.writtenInput === '')
        ) {
            this.setState({ setBackground: isOpen });
        }
    };

    resetDisplay = () => {
        this.setState({ ...this.initialState });
    };

    render() {
        const { items, writtenInput, loading, selectedInput } = this.state;
        const { language } = this.props;
        const klassenavn = cls('sok-input', {
            engelsk: language === Language.ENGELSK,
        });

        return (
            <>
                <Downshift
                    stateReducer={this.stateReducer}
                    onChange={this.handleSelect}
                    onInputValueChange={(
                        changes: string,
                        stateAndHelpers: any,
                    ) => {
                        this.enableBackground(stateAndHelpers.isOpen);
                        this.handleValueChange(changes);
                    }}
                    inputValue={selectedInput}
                    itemToString={(item) => this.input(item)}
                >
                    {({
                          getInputProps,
                          getItemProps,
                          getMenuProps,
                          inputValue,
                          setState,
                          itemToString,
                          clearItems,
                      }) => (
                        <form
                            id="sok"
                            role="search"
                            className="sok"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="sok-container">
                                <div className="sok-input-resultat">
                                    <div className={'sok-input__tittel'}>
                                        <Systemtittel>
                                            <Tekst id="sok-knapp" />
                                        </Systemtittel>
                                    </div>
                                    <div className="sok-input-container">
                                        <Input
                                            {...getInputProps()}
                                            className={klassenavn}
                                            placeholder={finnTekst(
                                                'sok-input-placeholder',
                                                language,
                                            )}
                                            label={finnTekst(
                                                'sok-input-label',
                                                language,
                                            )}
                                            aria-label={finnTekst(
                                                'sok-input-label',
                                                language,
                                            )}
                                            tabIndex={
                                                this.props.tabindex ? 0 : -1
                                            }
                                        />
                                        <SokKnapper
                                            writtenInput={writtenInput}
                                            onReset={() => {
                                                setState({ isOpen: false });
                                                this.resetDisplay();
                                            }}
                                        />
                                    </div>
                                    {loading ? (
                                        <div className={'sokeresultat-spinner'}>
                                            <NavFrontendSpinner />
                                        </div>
                                    ) : inputValue && (
                                        <SokResultater
                                            writtenInput={writtenInput}
                                            items={items}
                                            predefinedlistview={predefinedlistview}
                                            getMenuProps={getMenuProps}
                                            getItemProps={getItemProps}
                                            language={language}
                                        />
                                    )}
                                </div>
                            </div>
                        </form>
                    )}
                </Downshift>
                <div className="media-sm-mobil mobil-meny">
                    <div
                        className={mobileCls.element(
                            'bakgrunn',
                            this.state.setBackground && this.props.menuIsOpen
                                ? 'active'
                                : '',
                        )}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
    environment: state.environment,
    menuIsOpen: state.dropdownToggles.hovedmeny,
});

export default connect(mapStateToProps)(Sok);
