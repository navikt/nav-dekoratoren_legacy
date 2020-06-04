import React from 'react';
import BEMHelper from 'utils/bem';
import NavLogoSimple from 'komponenter/header/header-simple/logo/NavLogoSimple';
import Navn from './navn/Navn';
import LoggInnKnapp from 'komponenter/header/header-regular/common/knapper/logg-inn-knapp/LoggInnKnapp';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import './HeaderSimple.less';

export const SimpleHeader = () => {
    const cls = BEMHelper('simple-header');

    return (
        <Sticky>
            <div className={cls.className}>
                <div className={cls.element('content')}>
                    <NavLogoSimple
                        className={cls.element('logo')}
                        viewIndex={true}
                    />
                    <div className={cls.element('right')}>
                        <Navn />
                        <LoggInnKnapp />
                    </div>
                </div>
            </div>
        </Sticky>
    );
};
