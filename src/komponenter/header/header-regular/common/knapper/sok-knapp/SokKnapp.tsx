import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/knapper/MenylinjeKnapp';
import SokMenyIkon from 'komponenter/header/header-regular/common/knapper/ikoner/sok-ikon/SokMenyIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Tekst from 'tekster/finn-tekst';

type Props = {
    onClick: () => void;
    isOpen: boolean;
    sokDropdownClassname: string;
    id?: string;
};

export const SokKnapp = (props: Props) => (
    <MenylinjeKnapp
        onClick={props.onClick}
        isOpen={props.isOpen}
        classname={props.sokDropdownClassname}
        ariaControls={props.sokDropdownClassname}
        id={props.id}
    >
        <SokMenyIkon isOpen={props.isOpen} />
        <Undertittel>
            <Tekst id={'sok-knapp'} />
        </Undertittel>
    </MenylinjeKnapp>
);
