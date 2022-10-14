import React from 'react';
import Tekst from 'tekster/finn-tekst';
import SokIkon from 'komponenter/header/header-regular/common/sok/sok-ikon/SokIkon';
import 'komponenter/header/header-regular/common/sok/sok-innhold/SokKnapper.scss';

interface Props {
    writtenInput?: string;
    onReset: () => void;
    id?: string;
}

const SokKnapper = ({ writtenInput, onReset, id }: Props) => {
    return (
        <div className={'sok-knapper__container'}>
            {writtenInput && (
                <button
                    type={'button'}
                    id={id ? `${id}-reset` : undefined}
                    className={`${'sok-knapper__knapp'} ${'sok-knapper__knapp-avbryt'}`}
                    onClick={onReset}
                >
                    <span className={'sok-knapper__ikon-container'}>
                        <SokIkon isOpen={true} />
                    </span>
                    <span className={'sok-knapper__knapp-tekst'}>
                        <Tekst id="sok-reset" />
                    </span>
                </button>
            )}
            <button
                type="submit"
                id={id ? `${id}-submit` : undefined}
                className={`${'sok-knapper__knapp'} ${'sok-knapper__knapp-submit'}`}
            >
                <span className={'sok-knapper__ikon-container'}>
                    <SokIkon isOpen={false} />
                </span>
                <span className={'sok-knapper__knapp-tekst'}>
                    <Tekst id="sok-knapp" />
                </span>
            </button>
        </div>
    );
};

export default SokKnapper;
