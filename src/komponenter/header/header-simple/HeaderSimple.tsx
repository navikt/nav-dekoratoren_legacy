import React from 'react';
import BEMHelper from 'utils/bem';
import InnloggingsstatusProvider from 'provider/Innloggingsstatus-provider';
import LoggInnKnapp from '../header-regular/meny/logginn/Logg-inn-knapp';
import Navlogo from 'ikoner/meny/Navlogo';
import Navn from '../navn/Navn';
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
