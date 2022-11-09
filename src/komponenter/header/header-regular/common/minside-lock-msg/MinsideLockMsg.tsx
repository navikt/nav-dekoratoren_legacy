import React from 'react';
import { BodyShort, Panel } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import Lock from 'ikoner/meny/Lock';
import style from './MinsideLockMsg.module.scss';

export const MinsideLockMsg = () => {
    return (
        <Panel className={style.panel}>
            <div className={style.ikon}>
                <Lock />
            </div>
            <div className={style.msg}>
                <BodyShort>
                    <Tekst id={'lock-msg-infotekst'} />
                </BodyShort>
            </div>
        </Panel>
    );
};
