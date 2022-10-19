import React from 'react';
import Tekst from 'tekster/finn-tekst';
import SokIkon from 'komponenter/header/header-regular/common/sok/sok-ikon/SokIkon';
import { Button } from '@navikt/ds-react';
import './SokKnapper.scss';

interface Props {
    writtenInput?: string;
    onReset: () => void;
    id?: string;
}

const SokKnapper = ({ writtenInput, onReset, id }: Props) => {
    return (
        <div className={'sok-knapper__container'}>
            {writtenInput && (
                <Button
                    type={'button'}
                    id={id ? `${id}-reset` : undefined}
                    className={`${'sok-knapper__knapp'} ${'sok-knapper__knapp-avbryt'}`}
                    variant="secondary"
                    onClick={onReset}
                    icon={
                        <span className={'sok-knapper__ikon-container'}>
                            <SokIkon />
                        </span>
                    }
                >
                    <span className={'sok-knapper__knapp-tekst'}>
                        <Tekst id="sok-reset" />
                    </span>
                </Button>
            )}
            <Button
                type="submit"
                id={id ? `${id}-submit` : undefined}
                className={`${'sok-knapper__knapp'} ${'sok-knapper__knapp-submit'}`}
                icon={
                    <span className={'sok-knapper__ikon-container'}>
                        <SokIkon />
                    </span>
                }
            >
                <span className={'sok-knapper__knapp-tekst'}>
                    <Tekst id="sok-knapp" />
                </span>
            </Button>
        </div>
    );
};

export default SokKnapper;
