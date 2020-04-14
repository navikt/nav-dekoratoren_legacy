import React from 'react';
import BEMHelper from 'utils/bem';
import Navlogo from 'ikoner/meny/Navlogo';
import InnloggingsstatusProvider from 'provider/Innloggingsstatus-provider';

import LoggInnKnapp from '../meny/logginn/Logg-inn-knapp';
import Navn from '../meny/navn/Navn';

import './HeaderSimple.less';

const cls = BEMHelper('simple-header');

export const SimpleHeader = () => {
    return (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                <Navlogo className={cls.element('logo')} viewIndex={true} />
                <InnloggingsstatusProvider>
                    <div className={cls.element('right')}>
                        <Navn />
                        <LoggInnKnapp />
                    </div>
                </InnloggingsstatusProvider>
            </div>
        </div>
    );
};
