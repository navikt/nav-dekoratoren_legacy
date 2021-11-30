import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import { logAmplitudeEvent } from 'utils/amplitude';
import { MenuValue } from '../../../utils/meny-storage-utils';

// Prevents SSR crash
const Chatbot = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;

const testUrlHosts = [
    'dekoratoren.ekstern.dev.nav.no',
];

const stagingUrlHosts = [
    'www-q0.nav.no',
    'www-q1.nav.no',
    'www-q2.nav.no',
    'www-q3.nav.no',
    'www-q4.nav.no',
    'www-q5.nav.no',
    'www-q6.nav.no',
    'dekoratoren.dev.nav.no',
    'dev.nav.no',
    'localhost',
];

const stateSelector = (state: AppState) => ({
    isChatbotEnabled: state.environment.PARAMS.CHATBOT,
    context: state.arbeidsflate.status,
    env: state.environment.ENV,
});

const boostApiUrlBaseTest = 'https://navtest.boost.ai/api/chat/v2';
const boostApiUrlBaseStaging = 'https://staging-nav.boost.ai/api/chat/v2';
const boostApiUrlBaseProd = 'https://nav.boost.ai/api/chat/v2';

type ActionFilter = 'privatperson' | 'arbeidsgiver' | 'NAV_TEST';

const contextFilterMap: { [key in MenuValue]?: ActionFilter[] } = {
    [MenuValue.PRIVATPERSON]: ['privatperson'],
    [MenuValue.ARBEIDSGIVER]: ['arbeidsgiver'],
};

const getActionFilters = (context: MenuValue, isProd: boolean): ActionFilter[] => {
    const contextFilter = contextFilterMap[context] || [];
    return isProd ? contextFilter : [...contextFilter, 'NAV_TEST'];
};

export const ChatbotWrapper = () => {
    const { isChatbotEnabled, context, env } = useSelector(stateSelector);

    // Do not mount chatbot on initial render. Prevents hydration errors
    // due to inconsistensies between client and server html, as chatbot
    // is not rendered server-side
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(isChatbotEnabled);
    }, [isChatbotEnabled]);

    const hostname = verifyWindowObj() && window.location.hostname;
    const pathname = verifyWindowObj() && window.location.pathname;
    const origin = hostname && pathname && `${hostname}${pathname}`;

    const isTest = hostname && testUrlHosts.includes(hostname);
    const isStaging = hostname && stagingUrlHosts.includes(hostname);
    const boostApiUrlBase = isTest
        ? boostApiUrlBaseTest
        : isStaging 
            ? boostApiUrlBaseStaging 
            : boostApiUrlBaseProd;

    let actionFilters;

    if (isStaging) {
        actionFilters = ['NAV_TEST'];
    }

    if (origin) {
        if (!actionFilters) {
            actionFilters = [];
        }

        actionFilterMap.forEach(([tests, filters]) => {
            if (tests.find((test) => test(origin))) {
                actionFilters.push(...filters);
            }
        });
    }

    return isMounted ? (
        <Chatbot
            boostApiUrlBase={boostApiUrlBase}
            actionFilters={getActionFilters(context, isProd)}
            analyticsCallback={logAmplitudeEvent}
        />
    ) : null;
};
