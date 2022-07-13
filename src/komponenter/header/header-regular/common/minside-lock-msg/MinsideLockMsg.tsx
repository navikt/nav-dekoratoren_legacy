import React from 'react';
import { BodyShort, Panel } from '@navikt/ds-react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import Lock from 'ikoner/meny/Lock';

import './MinsideLockMsg.less';

const cls = BEMHelper('minside-lock');

export const MinsideLockMsg = () => {
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
