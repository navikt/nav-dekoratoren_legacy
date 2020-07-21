import React from 'react';
import BEMHelper from 'utils/bem';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import Navn from './navn/Navn';
import LoggInnKnapp from 'komponenter/header/header-regular/common/logg-inn/LoggInnKnapp';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import { GACategory } from 'utils/google-analytics';
import Logo from 'ikoner/meny/nav-logo-black.svg';
import './HeaderSimple.less';

export const HeaderSimple = () => {
    const cls = BEMHelper('simple-header');

    return (
        <Sticky>
            <div className={cls.className}>
                <div className={cls.element('content')}>
                    <NavLogoLenke
                        gaEventArgs={{
                            category: GACategory.Header,
                            action: 'navlogo-mobilmeny',
                        }}
                        ikon={Logo}
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
