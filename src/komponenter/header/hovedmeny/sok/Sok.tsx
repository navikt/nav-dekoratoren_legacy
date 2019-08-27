import * as React from 'react';
import throttle from 'lodash.throttle';
import Downshift from 'downshift';
import { Input } from 'nav-frontend-skjema';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { API } from '../../../../api/api';

import './Sok.less';

interface Data {
    priority: boolean;
    displayName: string;
    href: string;
    highlight: string;
    publish: {
        from: string;
        first: string;
    };
    modifiedTime: string;
    className: string;
}

export const defaultData: Data = {
    priority: false,
    displayName: '',
    href: '',
    highlight: '',
    publish: {
        from: '',
        first: '',
    },
    modifiedTime: '',
    className: '',
};

interface InputState {
    inputString: string;
    items: Data[];
}

class Sok extends React.Component<{}, InputState> {
    handleChangeThrottled: ReturnType<typeof throttle>;

    constructor(props: {}) {
        super(props);
        this.state = {
            inputString: '',
            items: [defaultData],
        };
        this.handleChangeThrottled = throttle (
            this.handleChange.bind(this),
            2000
        );
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(input: string) {
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
        console.log('state.items:', this.state.items);
    }

    handleSelect (selection: Data) {
        location.href = `https://www-x1.nav.no${selection.href}`;
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        location.href = url;
    }

    render() {
        const { inputString, items } = this.state;
        const URL = `${'https://www-x1.nav.no/sok'}?ord=${inputString}`;

        const lenkeAlleTreff: Data[] = [{
            priority: false,
            displayName: `Se alle treff (${inputString})`,
            href: `/sok?ord=${inputString}`,
            highlight: '',
            publish: {
                from: '',
                first: '',
            },
            modifiedTime: '',
            className: '',
        }];

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
                                    {...getInputProps() }
                                    className="sok-input"
                                    type="search"
                                    label="Søk:"
                                    placeholder="Hva leter du etter?"
                                    aria-label="Søk"
                                />

                                <ul className="sokeresultat-liste" {...getMenuProps()}>

                                    {isOpen && inputValue
                                        ? items
                                            .filter(
                                                item =>
                                                    !inputValue ||
                                                    (item.highlight.toLowerCase().includes(inputValue.toLowerCase()) ||
                                                        item.displayName.toLowerCase().includes(inputValue.toLowerCase()))
                                            )
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
                                                    className="sokeresultat-item"
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
                                <button
                                    className="knapp knapp--hoved"
                                    type="submit"
                                >
                                    SØK
                                </button>
                            </div>
                        </div>
                    )}
                </Downshift>
            </form>
        );
    }
}

export default Sok;