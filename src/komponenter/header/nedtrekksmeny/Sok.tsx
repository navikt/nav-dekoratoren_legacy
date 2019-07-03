import * as React from 'react';
// import { Input } from 'nav-frontend-skjema';
// import Downshift from 'downshift';
import './Sok.less';
import SearchBox from './searchbox';

/* const items = [
    'apple',
    'pear',
    'orange',
    'grape',
    'banana',
    'avocado',
    'grape',
    'mango',
    'lichi',
    'melon',
    'pineapple',
]; */

interface InputState {
    inputValue: string;
}

interface SokProps {}

class Sok extends React.Component<SokProps, InputState> {
    /* state: InputState = {
        inputValue: '',
    };

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            inputValue: e.currentTarget.value,
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
        e.preventDefault();
        location.href = url;
    } */

    render() {
        // const { inputValue } = this.state;
        // const URL = `${'https://www-x1.nav.no/sok'}?ord=${inputValue}`;
        return (
            <>
                <SearchBox
                    placeholder="Search for .."
                    items={[
                        'React Vienna',
                        'React Finland',
                        'Jest',
                        'Javascript',
                        'Node',
                        'Enzyme',
                        'Reactjs',
                    ]}
                />
            </>
        );
    }
}

export default Sok;
