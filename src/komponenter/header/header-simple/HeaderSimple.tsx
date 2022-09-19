import React from 'react';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import Navn from './navn/Navn';
import LoggInnKnapp from 'komponenter/header/header-regular/common/logg-inn/LoggInnKnapp';
import { Sticky } from 'komponenter/header/header-regular/common/sticky/Sticky';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import Logo from 'ikoner/meny/nav-logo-black.svg';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { Status } from '../../../api/api';
import style from './HeaderSimple.module.scss';

export const HeaderSimple = () => {
    const { innloggingsstatus } = useSelector((state: AppState) => ({
        innloggingsstatus: state.innloggingsstatus.status,
    }));

    return (
        <Sticky>
            <div className={style.simpleHeader}>
                <div className={style.content}>
                    <NavLogoLenke
                        analyticsEventArgs={{
                            category: AnalyticsCategory.Header,
                            action: 'navlogo-mobilmeny',
                        }}
                        ikon={Logo}
                    />
                    <div className={style.right}>
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
