import Tekst from 'tekster/finn-tekst';
import { Input, Label } from 'nav-frontend-skjema';
import SokKnapper from './SokKnapper';
import React from 'react';
import { Locale } from 'store/reducers/language-duck';
import { verifyWindowObj } from 'utils/Environment';
import './SokInput.less';
type Props = {
    className: string;
    language: Locale;
    writtenInput: string;
    onChange: (value: string) => void;
    onReset: () => void;
    id: string;
};
export const SokInput = (props: Props) => {
    const { onChange, onReset } = props;
    const { writtenInput, className, id } = props;
    // Only set the input value in the browser, to prevent execution-order
    // dependent SSR warnings under certain circumstances
    const inputValue = verifyWindowObj() ? writtenInput || '' : undefined;

    return (
        <>
            <Label className="sok-input-resultat" htmlFor={id}>
                <Tekst id={'sok-knapp-sokefelt'} />
            </Label>
            <div className="sok-input-container">
                <Input
                    id={id}
                    onChange={(e) => onChange(e.target.value)}
                    className={className}
                    value={inputValue}
                    type="search"
                />
                <SokKnapper writtenInput={writtenInput} onReset={onReset} id={id} />
            </div>
        </>
    );
};
export default SokInput;
