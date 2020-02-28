import React from 'react';
import './VarselIkon.less'
import BEMHelper from '../../../../../utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../../../tekster/finn-tekst';
import MenylinjeKnapp from '../MenylinjeKnapp';

const ikon = require('../../../../../ikoner/varsler/alarm.svg');

type Props = {
    isOpen: boolean;

}

export const VarselIkon = ({isOpen}: Props) => {
    const cls = BEMHelper('varsel-meny-ikon');

    return (
        <div
            className={cls.element('container')}
        >
            <img alt={''} src={ikon} className={cls.element('bjelle', isOpen ? 'open' : '')} />
            <div className={cls.element('tekst')}>
                <Undertittel className={'varsler-tekst'}>
                    <Tekst id={'varsler'} />
                </Undertittel>
            </div>
        </div>
    );
};

export default VarselIkon
