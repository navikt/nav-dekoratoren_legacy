import { finnTekst } from 'tekster/finn-tekst';
import { Locale } from 'store/reducers/language-duck';
import SokKnapper from './SokKnapper';
import React from 'react';
import { verifyWindowObj } from 'utils/Environment';
import { TextField } from '@navikt/ds-react';
import 'komponenter/header/header-regular/common/sok/sok-innhold/SokInput.scss';
type Props = {
    className: string;
    writtenInput: string;
    language: Locale;
    onChange: (value: string) => void;
    onReset: () => void;
    id: string;
};
export const SokInput = (props: Props) => {
    const { className, writtenInput, language, onChange, onReset, id } = props;
    // Only set the input value in the browser, to prevent execution-order
    // dependent SSR warnings under certain circumstances
    const inputValue = verifyWindowObj() ? writtenInput || '' : undefined;

    return (
        <>
            <div className="sok-input-container">
                <TextField
                    id={id}
                    onChange={(e) => onChange(e.target.value)}
                    className={className}
                    value={inputValue}
                    type="text"
                    label={finnTekst('sok-knapp-sokefelt', language)}
                    autoComplete="off"
                />
                <SokKnapper writtenInput={writtenInput} onReset={onReset} id={id} />
            </div>
        </>
    );
};
export default SokInput;
