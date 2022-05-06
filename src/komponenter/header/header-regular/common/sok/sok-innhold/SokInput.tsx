import { Systemtittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { finnTekst } from 'tekster/finn-tekst';
import { Input } from 'nav-frontend-skjema';
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
    id?: string;
};

export const SokInput = (props: Props) => {
    const { onChange, onReset } = props;
    const { language, writtenInput, className, id } = props;

    // Only set the input value in the browser, to prevent execution-order
    // dependent SSR warnings under certain circumstances
    const inputValue = verifyWindowObj() ? writtenInput || '' : undefined;

    return (
        <>
            <div className={'sok-input__tittel'}>
                <Systemtittel>
                    <Tekst id="sok-knapp-sokefelt" />
                </Systemtittel>
            </div>
            <div className="sok-input-container">
                <Input
                    id={id}
                    onChange={(e) => onChange(e.target.value)}
                    className={className}
                    value={inputValue}
                    aria-label={finnTekst('sok-knapp-sokefelt', language)}
                    type="search"
                />
                <SokKnapper writtenInput={writtenInput} onReset={onReset} id={id} />
            </div>
        </>
    );
};

export default SokInput;
