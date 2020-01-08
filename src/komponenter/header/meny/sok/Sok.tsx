import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import Downshift from 'downshift';
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
import Environment from '../../../../utils/Environment';

interface StateProps {
    language: Language;
}

class Sok extends React.Component<StateProps, InputState> {
    handleChangeThrottled: ReturnType<typeof throttle>;
    ismounted: boolean = false;

    constructor(props: StateProps) {
        super(props);
        this.state = {
            inputString: '',
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

    handleValueChange(input: string) {
        const url = Environment.sokeresultat;

        if (this.ismounted) {
            this.setState({
                inputString: input,
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
        location.href = `https://www-x1.nav.no${selection.href}`;
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        location.href = url;
    }

    render() {
        const { inputString, items } = this.state;
        const { language } = this.props;
        const URL = `https://www-x1.nav.no/sok?ord=${inputString}`;
        const lenkeAlleTreff = visAlleTreff(inputString);
        const klassenavn = cls('sok-input', {
            engelsk: language === Language.ENGELSK,
        });

        return (
            <Downshift
                onChange={selection => {
                    this.handleSelect(selection);
                }}
                onInputValueChange={(changes: string) => {
                    this.handleChangeThrottled(changes);
                }}
                itemToString={item => (item ? item.highlight : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                }) => (
                    <form
                        className="sok"
                        id="sok"
                        role="search"
                        onSubmit={event => this.handleSubmit(event, URL)}
                    >
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
                                    {isOpen && inputValue !== '' && items
                                        ? items
                                              .slice(0, 5)
                                              .concat(lenkeAlleTreff)
                                              .map((item, index) => (
                                                  <li
                                                      {...getItemProps({
                                                          key: index,
                                                          index,
                                                          item,
                                                      })}
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
                                              ))
                                        : null}
                                </ul>
                            </div>
                            <DesktopSokknapp />
                        </div>
                    </form>
                )}
            </Downshift>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Sok);
