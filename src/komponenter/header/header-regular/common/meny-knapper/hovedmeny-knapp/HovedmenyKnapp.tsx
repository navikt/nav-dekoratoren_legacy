import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapper/MenylinjeKnapp';
import HamburgerIkon from 'komponenter/header/header-regular/common/meny-knapper/ikoner/hamburger-ikon/HamburgerIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Tekst from 'tekster/finn-tekst';

type Props = {
    isOpen: boolean;
    onClick: () => void;
    hovedmenyClassname: string;
    id?: string;
};

export const HovedmenyKnapp = ({
    isOpen,
    onClick,
    hovedmenyClassname,
    id,
}: Props) => (
    <MenylinjeKnapp
        isOpen={isOpen}
        classname={hovedmenyClassname}
        onClick={onClick}
        ariaControls={hovedmenyClassname}
        id={id}
    >
        <HamburgerIkon isOpen={isOpen} />
        <Undertittel>
            <Tekst id="meny-knapp" />
        </Undertittel>
    </MenylinjeKnapp>
);
