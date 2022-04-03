import React from 'react';
import BEMHelper from 'utils/bem';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import Navn from './navn/Navn';
import LoggInnKnapp from 'komponenter/header/header-regular/common/logg-inn/LoggInnKnapp';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import Logo from 'ikoner/meny/nav-logo-black.svg';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducers';
import './HeaderSimple.less';
import { Status } from '../../../api/api';

const cls = BEMHelper('simple-header');

export const HeaderSimple = () => {
    const { innloggingsstatus } = useSelector((state: AppState) => ({
        innloggingsstatus: state.innloggingsstatus.status,
    }));

    return (
        <Sticky>
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
                        {innloggingsstatus === Status.OK && (
                            <>
                                <Navn />
                                <LoggInnKnapp />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Sticky>
    );
};
