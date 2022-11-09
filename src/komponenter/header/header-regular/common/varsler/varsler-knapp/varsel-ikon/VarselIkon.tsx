import React from 'react';
import { Bell } from '@navikt/ds-icons';
import style from './VarselIkon.module.scss';

type Props = {
    antallUleste?: number;
};

export const VarselIkon = ({ antallUleste = 0 }: Props) => {
    return (
        <>
            <Bell aria-hidden />
            <div className={`${style.ulestSirkel} ${antallUleste === 0 ? style.hide : ''}`} />
        </>
    );
};
