import React from 'react';
import './VarselIkon.less';
import BEMHelper from '../../../../../../../utils/bem';
import { EtikettLiten } from 'nav-frontend-typografi';

type Props = {
    isOpen: boolean;
    antallUleste?: number;
};

export const VarselIkon = ({ isOpen, antallUleste = 0 }: Props) => {
    const cls = BEMHelper('varselbjelle-ikon');

    return (
        <div className={cls.element('container')}>
            <div className={cls.element('bjelle', isOpen ? 'open' : '')}>
                <div className={cls.element('ring', isOpen ? 'open' : '')} />
                <div className={cls.element('bell', isOpen ? 'open' : '')} />
                <div className={cls.element('lip', isOpen ? 'open' : '')} />
                <div className={cls.element('clapper', isOpen ? 'open' : '')} />
                {!!antallUleste && (
                    <div
                        className={cls.element(
                            'ulest-sirkel',
                            isOpen ? 'open' : ''
                        )}
                    >
                        <EtikettLiten className={cls.element('ulest-antall')}>
                            {antallUleste < 10 ? antallUleste : '9+'}
                        </EtikettLiten>
                    </div>
                )}
            </div>
        </div>
    );
};
