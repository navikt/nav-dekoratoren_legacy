import MenylinjeKnapp from '../MenylinjeKnapp';
import { VarselIkon } from '../ikoner/varsel-ikon/VarselIkon';
import Tekst from 'tekster/finn-tekst';
import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { VarslerData } from 'store/reducers/varselinnboks-duck';
import './VarslerKnapp.less';

type Props = {
    onClick: () => void;
    isOpen: boolean;
    varsler: VarslerData;
    varslerDropdownClassname: string;
    id?: string;
};

export const VarslerKnapp = (props: Props) => {
    const ariaLabel = `Varsler. Du har ${
        props.varsler.antall > 0 ? props.varsler.antall : 'ingen'
    } varsler.`;

    return (
        <MenylinjeKnapp
            onClick={props.onClick}
            isOpen={props.isOpen}
            classname={'varselbjelle'}
            id={props.id}
            ariaControls={props.varslerDropdownClassname}
            ariaLabel={ariaLabel}
        >
            <VarselIkon
                isOpen={props.isOpen}
                antallUleste={props.varsler.uleste}
            />
            <Undertittel className={'varselbjelle__tekst'}>
                <Tekst id={'varsler-tittel'} />
            </Undertittel>
        </MenylinjeKnapp>
    );
};
