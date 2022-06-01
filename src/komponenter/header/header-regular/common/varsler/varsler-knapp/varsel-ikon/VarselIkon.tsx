import React from 'react';
import BEMHelper from 'utils/bem';
import { Bell } from '@navikt/ds-icons';

import './VarselIkon.less';

type Props = {
    antallUleste?: number;
};

export const VarselIkon = ({ antallUleste = 0 }: Props) => {
    const cls = BEMHelper('varselbjelle-ikon');

    return (
        <>
            <Bell />
            <div className={cls.element('ulest-sirkel', antallUleste === 0 ? 'hide' : '')}></div>
        </>
    );
};
