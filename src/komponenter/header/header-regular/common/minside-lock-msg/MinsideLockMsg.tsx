import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import Panel from 'nav-frontend-paneler';
import Lock from 'ikoner/meny/Lock';
import './MinsideLockMsg.less';

export const MinsideLockMsg = () => {
    const cls = BEMHelper('minside-lock');
    return (
        <Panel className={cls.element('panel')}>
            <div className={cls.element('ikon')}>
                <Lock />
            </div>
            <div className={cls.element('msg')}>
                <BodyShort>
                    <Tekst id={'lock-msg-infotekst'} />
                </BodyShort>
            </div>
        </Panel>
    );
};

export default MinsideLockMsg;
