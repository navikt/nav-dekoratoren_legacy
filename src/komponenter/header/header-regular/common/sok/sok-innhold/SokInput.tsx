import { finnTekst } from 'tekster/finn-tekst';
import { Locale } from 'store/reducers/language-duck';
import SokKnapper from './SokKnapper';
import React from 'react';
import { TextField } from '@navikt/ds-react';
import { useClientSide } from 'utils/hooks/useClientSide';
import './SokInput.less';
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
    const isClientSide = useClientSide();
    const inputValue = isClientSide ? writtenInput : '';

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
                />
                <SokKnapper writtenInput={writtenInput} onReset={onReset} id={id} />
            </div>
        </>
    );
};
export default SokInput;
