import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/knapper/MenylinjeKnapp';
import HamburgerIkon from 'komponenter/header/header-regular/common/knapper/ikoner/hamburger-ikon/HamburgerIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Tekst from 'tekster/finn-tekst';

type Props = {
    isOpen: boolean;
    onClick: () => void;
    id?: string;
};

const classname = 'hovedmeny';

export const HovedmenyKnapp = ({ isOpen, onClick, id }: Props) => (
    <MenylinjeKnapp
        isOpen={isOpen}
        classname={classname}
        onClick={onClick}
        ariaControls={classname}
        id={id}
    >
        <HamburgerIkon isOpen={isOpen} />
        <Undertittel>
            <Tekst id="meny-knapp" />
        </Undertittel>
    </MenylinjeKnapp>
);
