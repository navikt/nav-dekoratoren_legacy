import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Link } from '@navikt/ds-react';
import { Monitor } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';

import style from './DelSkjermLenke.module.scss';
import { loadExternalScript } from 'utils/external-scripts';
import { VNGAGE_ID, VngageUserState, vendorScripts } from 'komponenter/header/vendorScripts';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { checkVergic } from '../vergic';
import { selectFeatureToggles } from 'store/selectors';

export const DelSkjermLenke = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { NAV_GROUP_ID } = useSelector((state: AppState) => state.environment);
    const featureToggles = useSelector(selectFeatureToggles);

    const openCallback = useCallback(() => {
        const interval = setInterval(() => {
            const userState = localStorage.getItem(`vngage_${VNGAGE_ID.toLowerCase()}`);
            const parsedUserState = userState ? (JSON.parse(userState) as VngageUserState) : null;

            let isLoaded = false;

            if (checkVergic(window.vngage)) {
                isLoaded = window.vngage.get('queuestatus', NAV_GROUP_ID);
            }

            if (isLoaded && parsedUserState && parsedUserState.user.state === 'Ready') {
                clearInterval(interval);
                setIsOpen(true);
            }
        }, 32);

        return () => clearInterval(interval);
    }, [NAV_GROUP_ID, featureToggles]);

    const openModal = () => {
        analyticsEvent({
            eventName: 'Modal åpnet',
            category: AnalyticsCategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });

        // Åpne modal hvis vergic er loaded, eller vise a det er stengt uten a loade script. Kan implementeres på en tydligere måte. Men tar det som en del av omskrivningen.
        const shouldOpen = window.vngage || !featureToggles['dekoratoren.skjermdeling'];

        if (shouldOpen) {
            setIsOpen(true);
            return;
        }

        loadExternalScript(vendorScripts.skjermdeling).then(() => {
            openCallback();
        });
    };
    const closeModal = () => {
        analyticsEvent({
            eventName: 'Modal lukket',
            category: AnalyticsCategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setIsOpen(false);
    };

    return (
        <>
            <Link onClick={openModal} className={classNames(style.delSkjermLenke, 'globalLenkeFooter')} href="#">
                <Tekst id="footer-del-skjerm" />
                <Monitor title="monitor-ikon" titleId="footer-monitor-icon" aria-hidden />
            </Link>
            {isOpen && <DelSkjermModal isOpen={isOpen} onClose={closeModal} />}
        </>
    );
};
