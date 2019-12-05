import React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Tekst from '../../../../../tekster/finn-tekst';
import SokIkon from '../../../../../ikoner/mobilmeny/SokIkon';

interface Props {
    className: string;
    modalIsOpen: () => void;
}

const SokModalToggleknapp = ({ className, modalIsOpen }: Props) => {
    return (
        <button className={className} onClick={() => modalIsOpen()}>
            <SokIkon />
            <Undertittel>
                <Tekst id="sok-mobil-knapp" />
            </Undertittel>
        </button>
    );
};

export default SokModalToggleknapp;
