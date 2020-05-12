import React from 'react';
import BEMHelper from 'utils/bem';
import Navlogo from 'ikoner/meny/Navlogo';
import Navn from './navn/Navn';
import { LoggInnKnappMobil } from 'komponenter/header/header-regular/mobil/logg-inn/LoggInnKnappMobil';
import './HeaderSimple.less';

export const SimpleHeader = () => {
    const cls = BEMHelper('simple-header');

    return (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                <Navlogo className={cls.element('logo')} viewIndex={true} />
                <div className={cls.element('right')}>
                    <Navn />
                    <LoggInnKnappMobil />
                </div>
            </div>
        </div>
    );
};
