import React from 'react';
import SokIkon from '../../../../ikoner/mobilmeny/SokIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Tekst from '../../../../../tekster/finn-tekst';

interface Props {
    className: string;
    modalIsOpen: () => void;
}

const SokKnapp = ({ className, modalIsOpen }: Props) => {
    return (
        <button className={className} onClick={() => modalIsOpen()}>
            <SokIkon />
            <Undertittel>
                <Tekst id="sok-mobil-knapp" />
            </Undertittel>
        </button>
    );
};

export default SokKnapp;
