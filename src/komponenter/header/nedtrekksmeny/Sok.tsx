import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            inputValue: e.currentTarget.value,
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
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
                    onSubmit={event => this.handleSubmit(event, URL)}
                >
                    <Input
                        className="sok-input"
                        type="search"
                        label="Søk:"
                        aria-label="Søk"
                        placeholder="Hva leter du etter?"
                        onChange={event => this.handleChange(event)}
                    />
                    <div className="sok-knapp btn">
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
