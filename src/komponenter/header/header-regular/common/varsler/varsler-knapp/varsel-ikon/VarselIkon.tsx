import React from 'react';
import BEMHelper from 'utils/bem';
import { Label } from '@navikt/ds-react';
import './VarselIkon.less';

type Props = {
    isOpen: boolean;
    antallUleste?: number;
};

export const VarselIkon = ({ isOpen, antallUleste = 0 }: Props) => {
    const cls = BEMHelper('varselbjelle-ikon');
    const clsName = cls.className.concat(isOpen ? ' ' + cls.modifier('open') : '');

    return (
        <div className={clsName}>
            <div className={cls.element('ring')} />
            <div className={cls.element('bell')} />
            <div className={cls.element('lip')} />
            <div className={cls.element('clapper')} />
            <div className={cls.element('ulest-sirkel', antallUleste === 0 ? 'hide' : '')}>
                <Label size="small" className={cls.element('ulest-antall')}>
                    {antallUleste < 10 ? antallUleste : '9+'}
                </Label>
            </div>
        </div>
    );
};
