import React from 'react';
import BEMHelper from 'utils/bem';
import InnloggingsstatusProvider from 'store/providers/Innloggingsstatus';
import LoggInnKnapp from '../header-regular/meny/logginn/Logg-inn-knapp';
import Navlogo from 'ikoner/meny/Navlogo';
import Navn from '../navn/Navn';
import './HeaderSimple.less';


export const SimpleHeader = () => {
    const cls = BEMHelper('simple-header');

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
