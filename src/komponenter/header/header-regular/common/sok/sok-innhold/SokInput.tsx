import { Systemtittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { finnTekst } from 'tekster/finn-tekst';
import { Input } from 'nav-frontend-skjema';
import SokKnapper from './SokKnapper';
import React from 'react';
import { Language } from 'store/reducers/language-duck';
import './SokInput.less';

type Props = {
    className: string;
    getInputProps: any;
    language: Language;
    tabIndex: boolean | undefined;
    writtenInput: string;
    onReset: () => void;
};

export const SokInput = ({
    language,
    writtenInput,
    onReset,
    className,
    getInputProps,
    tabIndex,
}: Props) => {
    return (
        <>
            <div className={'sok-input__tittel'}>
                <Systemtittel>
                    <Tekst id="sok-knapp" />
                </Systemtittel>
            </div>
            <div className="sok-input-container">
                <Input
                    {...getInputProps()}
                    className={className}
                    placeholder={finnTekst('sok-input-placeholder', language)}
                    label={finnTekst('sok-input-label', language)}
                    aria-label={finnTekst('sok-input-label', language)}
                    tabIndex={tabIndex ? 0 : -1}
                />
                <SokKnapper writtenInput={writtenInput} onReset={onReset} />
            </div>
        </>
    );
};

export default SokInput;
