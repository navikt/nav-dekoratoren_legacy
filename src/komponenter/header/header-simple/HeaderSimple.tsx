import React from 'react';
import BEMHelper from 'utils/bem';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import Navn from './navn/Navn';
import LoggInnKnapp from 'komponenter/header/header-regular/common/logg-inn/LoggInnKnapp';
import { StickyHeader } from 'komponenter/header/header-regular/common/sticky/StickyHeader';
import { AnalyticsCategory } from 'utils/analytics';
import Logo from 'ikoner/meny/nav-logo-black.svg';
import './HeaderSimple.less';

export const HeaderSimple = () => {
    const cls = BEMHelper('simple-header');

    return (
        <StickyHeader>
            <div className={cls.className}>
                <div className={cls.element('content')}>
                    <NavLogoLenke
                        analyticsEventArgs={{
                            category: AnalyticsCategory.Header,
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
        </StickyHeader>
    );
};
