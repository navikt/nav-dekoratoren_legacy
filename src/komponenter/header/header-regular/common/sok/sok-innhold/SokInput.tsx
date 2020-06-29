import { Systemtittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { finnTekst } from 'tekster/finn-tekst';
import { Input } from 'nav-frontend-skjema';
import SokKnapper from './SokKnapper';
import React, { ChangeEvent } from 'react';
import { Language } from 'store/reducers/language-duck';
import './SokInput.less';

type Props = {
    className: string;
    language: Language;
    writtenInput: string;
    onChange: (value: string) => void;
    onReset: () => void;
    id?: string;
};

export const SokInput = (props: Props) => {
    const { onChange, onReset } = props;
    const { language, writtenInput, className, id } = props;
    return (
        <>
            <div className={'sok-input__tittel'}>
                <Systemtittel>
                    <Tekst id="sok-knapp" />
                </Systemtittel>
            </div>
            <div className="sok-input-container">
                <Input
                    id={id}
                    onChange={(e) => onChange(e.target.value)}
                    className={className}
                    value={writtenInput}
                    placeholder={finnTekst('sok-input-placeholder', language)}
                    label={finnTekst('sok-input-label', language)}
                    aria-label={finnTekst('sok-input-label', language)}
                />
                <SokKnapper writtenInput={writtenInput} onReset={onReset} />
            </div>
        </>
    );
};

export default SokInput;
