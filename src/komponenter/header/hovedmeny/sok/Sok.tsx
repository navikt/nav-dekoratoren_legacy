import React, { createRef } from 'react';
import throttle from 'lodash.throttle';
import Downshift from 'downshift';
import Knapp from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { API } from '../../../../api/api';
import { SokeresultatData, InputState, defaultData, visAlleTreff } from './sok-utils';
import './Sok.less';

class Sok extends React.Component<{}, InputState> {
    handleChangeThrottled: ReturnType<typeof throttle>;

    constructor(props: {}) {
        super(props);
        this.state = {
            inputString: '',
            items: [defaultData],
        };
        this.handleChangeThrottled = throttle (
            this.handleValueChange.bind(this),
            200
        );
    }

    handleValueChange(input: string) {
        const url = API.sokeresultat;

        this.setState({
            inputString: input,
        });

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
                this.setState({
                    items: json.hits,
                });
            });
    }

    handleSelect (selection: SokeresultatData) {
        location.href = `https://www-x1.nav.no${selection.href}`;
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        location.href = url;
    }

    render() {
        const { inputString, items } = this.state;
        const URL = `${'https://www-x1.nav.no/sok'}?ord=${inputString}`;
        const lenkeAlleTreff = visAlleTreff(inputString);

        return (
            <form
                className="sok"
                role="search"
                onSubmit={event => this.handleSubmit(event, URL)}
            >
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
                        highlightedIndex,
                        selectedItem,
                    }) => (
                        <div className="sok-container">
                            <div className="sok-input-resultat">

                                <Input
                                    {...getInputProps()}
                                    className= "sok-input"
                                    placeholder= "Hva leter du etter?"
                                />

                                <ul className="sokeresultat-liste" {...getMenuProps()}>

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
                                                         style: {
                                                             backgroundColor:
                                                                 highlightedIndex ===
                                                                 index
                                                                     ? 'lightgray'
                                                                     : 'white',
                                                             fontWeight:
                                                                 selectedItem ===
                                                                 item
                                                                     ? 'bold'
                                                                     : 'normal',
                                                         },
                                                     })}
                                                >
                                                    <div className="overskrift">
                                                        <Undertittel>
                                                            {item.displayName}
                                                        </Undertittel>
                                                    </div>
                                                    <div className="highlight">
                                                        <Normaltekst>
                                                            {item.highlight ? item.highlight.replace(/<\/?[^>]+(>|$)/g, '') : ''}
                                                        </Normaltekst>
                                                    </div>
                                                </li>
                                            ))
                                        : null}
                                </ul>
                            </div>

                            <div className="sok-knapp btn">
                                <Knapp type="standard" htmlType="submit">
                                    SØK
                                </Knapp>
                            </div>
                        </div>
                    )}
                </Downshift>
            </form>
        );
    }
}

export default Sok;