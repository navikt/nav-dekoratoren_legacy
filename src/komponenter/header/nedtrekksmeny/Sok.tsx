import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { API } from '../../../api/api';
import throttle from 'lodash.throttle';
import Downshift from 'downshift';
import './Sok.less';
// import SokInput from './Sok-input';

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

interface Sokeresultat {
    overskrift: string;
    highlight: string;
}

export function Sokeresultat({ overskrift, highlight }: Sokeresultat) {
    return (
        <div>
            <div className="overskrift">{overskrift}</div>
            <div className="highlight">{highlight}</div>
        </div>
    );
}

interface InputState {
    inputString: string;
    items: Data[];
}

class Sok extends React.Component<{}, InputState> {
    handleInputThrottled: ReturnType<typeof throttle>;

    constructor(props: {}) {
        super(props);
        this.state = {
            inputString: '',
            items: [defaultData],
        };
        this.handleInputThrottled = throttle(
            this.handleChange.bind(this),
            2000
        );
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: string) {
        const url = API.sokeresultat;

        this.setState({
            inputString: e,
        });

        fetch(`${url}?ord=${e}`)
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
                console.log('json:', json);
            });
        console.log('state:', this.state.items);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        location.href = url;
    }

    render() {
        const { inputString, items } = this.state;
        const URL = `${'https://www-x1.nav.no/sok'}?ord=${inputString}`;

        return (
            <form
                className="input-container"
                role="search"
                onSubmit={event => this.handleSubmit(event, URL)}
            >
                <Downshift
                    onInputValueChange={(changes: string) => {
                        console.log('Changes', changes);
                        this.handleChange(changes);
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
                        <div className="sok">
                            <Input
                                {...getInputProps()}
                                className="sok-input"
                                type="search"
                                label="Søk:"
                                placeholder="Hva leter du etter?"
                                aria-label="Søk"
                            />
                            <div className="sok-knapp btn">
                                <button
                                    className="knapp knapp--hoved"
                                    type="submit"
                                >
                                    SØK
                                </button>
                            </div>
                            <ul {...getMenuProps()}>
                                {isOpen
                                    ? items
                                          .filter(
                                              item =>
                                                  !inputValue ||
                                                  item.highlight.includes(
                                                      inputValue
                                                  )
                                          )
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
                                                  {item.highlight}
                                              </li>
                                          ))
                                    : null}
                            </ul>
                        </div>
                    )}
                </Downshift>
            </form>
        );
    }
}

export default Sok;

/*

                            <div>
                                {fetchdata
                                    ? fetchdata.map(result => (
                                        <Sokeresultat overskrift={result.displayName} highlight={result.highlight} />
                                    ))
                                    : null}
                            </div>

import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { API } from '../../../api/api';
import throttle from 'lodash.throttle';
import './Sok.less';
// import SokInput from './Sok-input';

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

interface Sokeresultat {
    overskrift: string;
    highlight: string;
}

export function Sokeresultat({ overskrift, highlight }: Sokeresultat ) {
    return <div><div className="overskrift">{overskrift}</div><div className="highlight">{highlight}</div></div>;
}

interface InputState {
    inputValue: string;
    fetchdata: Data[];
}

class Sok extends React.Component<{}, InputState> {

    handleInputThrottled: ReturnType<typeof throttle>

    constructor(props: {}) {
        super(props);
        this.state = {
            inputValue: '',
            fetchdata: [defaultData],
        };
        this.handleInputThrottled = throttle(this.handleChange.bind(this), 2000);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        const url = API.sokeresultat;

        this.setState({
            inputValue: e.currentTarget.value,
        });

        fetch(`${url}?ord=${e.currentTarget.value}`)
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
                    fetchdata: json.hits,
                });
                console.log('json:', json);
            });
        console.log('state:', this.state.fetchdata);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        location.href = url;
    }

    render() {
        const { inputValue, fetchdata } = this.state;
        const URL = `${'https://www-x1.nav.no/sok'}?ord=${inputValue}`;

        return (
            <div className="sok">
                <form
                    className="input-container"
                    role="search"
                    onSubmit={event => this.handleSubmit(event, URL)}
                >
                    <Input
                        className="sok-input"
                        type="search"
                        label="Søk:"
                        aria-label="Søk"
                        placeholder="Hva leter du etter?"
                        onChange={event => {
                            this.handleInputThrottled(event);
                        }}
                    />
                    <div className="sok-knapp btn">
                        <button className="knapp knapp--hoved" type="submit">
                            SØK
                        </button>
                    </div>
                </form>
                <div>
                    {fetchdata
                        ? fetchdata.map(result => (
                            <Sokeresultat overskrift={result.displayName} highlight={result.highlight} />
                        ))
                        : null}
                </div>
            </div>
        );
    }
}

export default Sok;
 */

/*

<div className="sok">
                    <form
                        className="input-container"
                        role="search"
                        onSubmit={event => this.handleSubmit(event, URL)}
                    >
                        <SokInput
                            options={fetchdata}
                            onChange={this.handleChange}
                        />
                        <div className="sok-knapp">
                            <button className="knapp knapp--hoved" type="submit">
                                SØK
                            </button>
                        </div>
                    </form>
                </div>

import * as React from 'react';
import Input from './Input';
import sokeresultat from './sokeresultat';
import './Sok.less';

interface InputState {
    inputValue: string;
}

interface SokProps {}

class Sok extends React.Component<SokProps, InputState> {
    constructor(props: SokProps) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(): void {
        fetch(FYLKER_OG_KOMMUNER_PATH)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(response => response.json())
            .then(json => this.setState({ fylkesinndeling: json }));
    }

    onChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            inputValue: e.currentTarget.value,
        });
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        location.href = url;
    }

    render() {
        const { inputValue } = this.state;
        const URL = `${'https://www-x1.nav.no/sok'}?ord=${inputValue}`;

        return (
            <div className="sok">
                <form
                    className="input-container"
                    role="search"
                    onSubmit={event => this.onSubmit(event, URL)}
                >
                    <Input
                        items={sokeresultat.hits}
                        onChange={this.onChange}
                        name="Søk"
                        placeholder="Hva leter du etter?"
                    />
                    <div className="sok-knapp">
                        <button className="knapp knapp--hoved" type="submit">
                            SØK
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
export default Sok;

import React from 'react';
import Downshift from 'downshift';

interface OwnProps {
    items: any[];
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    // label: string;
    placeholder: string;
    name: string;
}

const Input = ({ items, onChange, placeholder, name }: OwnProps) => {
    const className = 'sok-input';
    return (
        <Downshift
            onChange={onChange}
            itemToString={item => (item ? item.displayName : '')}
        >
            {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
            }) => (
                <div>
                    <input
                        name={name}
                        {...getInputProps({ placeholder, className })}
                        type="search"
                        label="Søk:"
                        aria-label="Søk"
                    />
                    {isOpen ? (
                        <div className="downshift-dropdown">
                            {items
                                .filter(
                                    item =>
                                        !inputValue ||
                                        item.displayName
                                            .toLowerCase()
                                            .includes(inputValue.toLowerCase())
                                )
                                .map((item, index) => (
                                    <div
                                        className="dropdown-item"
                                        {...getItemProps({
                                            key: item,
                                            index,
                                            item,
                                        })}
                                        style={{
                                            backgroundColor:
                                                highlightedIndex === index
                                                    ? 'lightgray'
                                                    : 'white',
                                            fontWeight:
                                                selectedItem === item
                                                    ? 'bold'
                                                    : 'normal',
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                        </div>
                    ) : null}
                </div>
            )}
        </Downshift>
    );
};
export default Input; */
