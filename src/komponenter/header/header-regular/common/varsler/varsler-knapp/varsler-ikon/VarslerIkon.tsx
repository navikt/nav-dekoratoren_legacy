import React from 'react';
import BEMHelper from 'utils/bem';
import { EtikettLiten } from 'nav-frontend-typografi';
import './VarslerIkon.less';

type Props = {
    isOpen: boolean;
    antallUleste?: number;
};

export const VarslerIkon = ({ isOpen, antallUleste = 0 }: Props) => {
    const cls = BEMHelper('varselbjelle-ikon');

    return (
        <div
            className={`${cls.className}${
                isOpen ? ` ${cls.className}--open` : ''
            }`}
        >
            <div className={cls.element('ring')} />
            <div className={cls.element('bell')} />
            <div className={cls.element('lip')} />
            <div className={cls.element('clapper')} />
            <div
                className={cls.element(
                    'ulest-sirkel',
                    antallUleste === 0 ? 'hide' : ''
                )}
            >
                <EtikettLiten className={cls.element('ulest-antall')}>
                    {antallUleste < 10 ? antallUleste : '9+'}
                </EtikettLiten>
            </div>
        </div>
    );
};
