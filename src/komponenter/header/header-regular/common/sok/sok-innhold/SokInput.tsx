import { Systemtittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { finnTekst } from 'tekster/finn-tekst';
import { Input } from 'nav-frontend-skjema';
import SokKnapper from './SokKnapper';
import React from 'react';
import { Locale } from 'store/reducers/language-duck';
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
                    placeholder={finnTekst('sok-input-placeholder', language)}
                    aria-label={finnTekst('sok-input-placeholder', language)}
                    type="search"
                />
                <SokKnapper
                    writtenInput={writtenInput}
                    onReset={() => {
                        onReset();
                        const inputElement = document.getElementById(id) as HTMLInputElement;
                        if (inputElement) {
                            inputElement.value = '';
                        }
                    }}
                    id={id}
                />
            </div>
        </>
    );
};

export default SokInput;
