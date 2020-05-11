import React from 'react';
import { AppState } from 'store/reducers';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';
import cls from 'classnames';
import { Language } from 'store/reducers/language-duck';
import { genererUrl } from 'utils/Environment';
import { defaultData, InputState } from './sok-utils';
import { SokeresultatData, visAlleTreff } from './sok-utils';
import { GACategory, gaEvent } from 'utils/google-analytics';
import BEMHelper from 'utils/bem';
import { EnvironmentState } from 'store/reducers/environment-duck';
import SokResultater from './sok-innhold/SokResultater';
import { SokInput } from './sok-innhold/SokInput';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import './Sok.less';

interface StateProps {
    language: Language;
    environment: EnvironmentState;
    menuIsOpen: boolean;
}

interface Props {
    tabindex?: boolean;
    id?: string;
    isOpen: boolean;
}

const predefinedlistview = 5;
const mobileCls = BEMHelper('sok');
const dropdownTransitionDuration = 300;

class Sok extends React.Component<StateProps & Props, InputState> {
    fetchSearchResultThrottled: ReturnType<typeof debounce>;
    ismounted: boolean = false;
    initialState = {
        loading: false,
        selectedInput: '',
        writtenInput: '',
        items: [defaultData],
        setBackground: false,
        fetchError: false,
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

    componentDidUpdate(prevProps: Readonly<StateProps & Props>) {
        if (prevProps !== this.props) {
            const dropdownElement = document.getElementById(
                'desktop-sok-dropdown'
            ) as HTMLElement;
            if (this.props.isOpen) {
                if (dropdownElement) {
                    setTimeout(
                        () => (dropdownElement.style.maxHeight = '100rem'),
                        dropdownTransitionDuration
                    );
                }
            } else {
                if (dropdownElement) {
                    dropdownElement.style.removeProperty('max-height');
                    setTimeout(
                        () => this.setState(this.initialState),
                        dropdownTransitionDuration
                    );
                }
            }
        }
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
                fetchError: false,
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
                        visAlleTreff(XP_BASE_URL, this.state.writtenInput)
                    );
                    this.setState({
                        items: tmp,
                        loading: false,
                        fetchError: false,
                    });
                }
            })
            .catch((err) => {
                if (this.ismounted) {
                    this.setState({
                        loading: false,
                        fetchError: true,
                    });
                    console.error(err);
                }
            });
    };

    handleSelect = (selection: SokeresultatData | null) => {
        if (!selection) {
            return;
        }
        const { XP_BASE_URL } = this.props.environment;
        window.location.href = genererUrl(XP_BASE_URL, selection.href);
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { XP_BASE_URL } = this.props.environment;
        const { selectedInput } = this.state;
        gaEvent({
            category: GACategory.Header,
            label: selectedInput,
            action: 'søk',
        });
        const url = `${XP_BASE_URL}/sok?ord=${selectedInput}`;
        window.location.href = genererUrl(XP_BASE_URL, url);
    };

    input = (inputValue: SokeresultatData | null): string => {
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
        const {
            items,
            writtenInput,
            loading,
            selectedInput,
            fetchError,
        } = this.state;
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
                        stateAndHelpers: any
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
                    }) => (
                        <form
                            id="sok"
                            role="search"
                            className="sok"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="sok-container">
                                <div className="sok-input-resultat">
                                    <SokInput
                                        className={klassenavn}
                                        getInputProps={getInputProps}
                                        language={language}
                                        tabIndex={this.props.tabindex}
                                        writtenInput={writtenInput}
                                        onReset={() => {
                                            setState({ isOpen: false });
                                            this.resetDisplay();
                                        }}
                                        id={this.props.id}
                                    />
                                    {loading ? (
                                        <Spinner tekstId={'spinner-sok'} />
                                    ) : (
                                        inputValue && (
                                            <SokResultater
                                                writtenInput={writtenInput}
                                                items={items}
                                                predefinedlistview={
                                                    predefinedlistview
                                                }
                                                getMenuProps={getMenuProps}
                                                getItemProps={getItemProps}
                                                language={language}
                                                fetchError={fetchError}
                                            />
                                        )
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
                                : ''
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
