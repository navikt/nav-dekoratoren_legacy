import React from 'react';
import BEMHelper from '../../utils/bem';
import InnloggingsstatusProvider from '../../provider/Innloggingsstatus-provider';
import LoggInnKnapp from './meny/logginn/Logg-inn-knapp';
import Navlogo from '../../ikoner/meny/Navlogo';
import './HeaderSimple.less';
import Navn from './meny/navn/Navn';

const cls = BEMHelper('simple-header');

export const SimpleHeader = () => {
    return (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                <Navlogo />
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
