import React from 'react';
import { Bell } from '@navikt/ds-icons';
import style from './VarselIkon.module.scss';
import lukkVarslerIkon from 'ikoner/varsler/lukkVarslerIkon.svg'
import { Bilde } from 'komponenter/common/bilde/Bilde'; 

type Props = {
    antallUleste?: number;
};

export const VarselIkon = ({ antallUleste = 0 }: Props) => {
    return (
        <>
            <Bell width={"24px"} height={"24px"} aria-hidden className={style.varselBellIkon} />
            <Bilde altText={''} asset={lukkVarslerIkon} className={style.lukkVarslerIkon}/>
            <div className={`${style.ulestSirkel} ${antallUleste === 0 ? style.hide : ''}`} />
        </>
    );
};
