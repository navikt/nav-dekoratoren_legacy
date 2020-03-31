import React from 'react';
import BEMHelper from '../../utils/bem';
import './HeaderSimple.less';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import InnloggingsstatusProvider from '../../provider/Innloggingsstatus-provider';
import LoggInnKnapp from './meny/logginn/Logg-inn-knapp';

const cls = BEMHelper('simple-header');

export const SimpleHeader = () => {
    return (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                <NavLogoRod classname={cls.element('logo')} />
                <InnloggingsstatusProvider>
                    <LoggInnKnapp />
                </InnloggingsstatusProvider>
            </div>
        </div>
    );
};
