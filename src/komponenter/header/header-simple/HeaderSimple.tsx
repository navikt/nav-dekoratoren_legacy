import React from 'react';
import BEMHelper from 'utils/bem';
import Navlogo from 'ikoner/meny/Navlogo';
import Navn from './navn/Navn';
import LoggInnKnapp from 'komponenter/header/header-regular/common/logg-inn-knapp/LoggInnKnapp';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import './HeaderSimple.less';

export const SimpleHeader = () => {
    const cls = BEMHelper('simple-header');

    return (
        <Sticky>
            <div className={cls.className}>
                <div className={cls.element('content')}>
                    <Navlogo className={cls.element('logo')} viewIndex={true} />
                    <div className={cls.element('right')}>
                        <Navn />
                        <LoggInnKnapp />
                    </div>
                </div>
            </div>
        </Sticky>
    );
};
