import React from 'react';
import BEMHelper from 'utils/bem';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import Navn from './navn/Navn';
import LoggInnKnapp from 'komponenter/header/header-regular/common/knapper/logg-inn-knapp/LoggInnKnapp';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import { GACategory } from 'utils/google-analytics';
import './HeaderSimple.less';

export const SimpleHeader = () => {
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
