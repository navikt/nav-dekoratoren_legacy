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
    id?: string;
};

const defaultKeys = ['Home', 'End'];

export const SokInput = ({
    language,
    writtenInput,
    onReset,
    className,
    getInputProps,
    tabIndex,
    id,
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
                    {...getInputProps({
                        onKeyDown: (e: any) => {
                            if (defaultKeys.includes(e.key)) {
                                e.nativeEvent.preventDownshiftDefault = true;
                                return;
                            }
                        },
                    })}
                    className={className}
                    placeholder={finnTekst('sok-input-placeholder', language)}
                    label={finnTekst('sok-input-label', language)}
                    aria-label={finnTekst('sok-input-label', language)}
                    tabIndex={tabIndex ? 0 : -1}
                    id={id}
                />
                <SokKnapper writtenInput={writtenInput} onReset={onReset} />
            </div>
        </>
    );
};

export default SokInput;
