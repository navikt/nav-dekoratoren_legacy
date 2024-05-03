import { finnTekst } from 'tekster/finn-tekst';
import { Locale } from 'store/reducers/language-duck';
import React from 'react';
import { verifyWindowObj } from 'utils/Environment';
import { Search } from '@navikt/ds-react';
import 'komponenter/header/header-regular/common/sok/sok-innhold/SokInput.scss';
type Props = {
    className: string;
    writtenInput: string;
    language: Locale;
    audience: string;
    onChange: (value: string) => void;
    onReset: () => void;
    id: string;
};
export const SokInput = (props: Props) => {
    const { className, writtenInput, language, audience, onChange, id } = props;
    // Only set the input value in the browser, to prevent execution-order
    // dependent SSR warnings under certain circumstances
    const inputValue = verifyWindowObj() ? writtenInput || '' : undefined;

    return (
        <>
            <div className="sok-input-container">
                <Search
                    id={id}
                    onChange={(value) => onChange(value)}
                    className={className}
                    value={inputValue}
                    type="text"
                    label={finnTekst('sok-knapp-sokefelt', language, audience)}
                    autoComplete="off"
                />
            </div>
        </>
    );
};
export default SokInput;
