import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import { logAmplitudeEvent } from 'utils/amplitude';

// Prevents SSR crash
const Chatbot = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;

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
});

type ActionFilterMap = [((input: string) => boolean)[], string[]];

const actionFilterMap: ActionFilterMap[] = [
    [[(input) => /www\.nav\.no\/no\/person(\/.*?)?/.test(input)], ['privatperson']],
    [[(input) => /www\.nav\.no\/no\/bedrift(\/.*)?/.test(input)], ['arbeidsgiver']],
];

export const ChatbotWrapper = ({ ...properties }: any) => {
    const { isChatbotEnabled } = useSelector(stateSelector);

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

    const isStaging = hostname && stagingUrlHosts.includes(hostname);
    const boostApiUrlBase = isStaging ? 'https://staging-nav.boost.ai/api/chat/v2' : 'https://nav.boost.ai/api/chat/v2';

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
            {...properties}
            {...{ boostApiUrlBase, actionFilters }}
            analyticsCallback={properties.analyticsCallback ?? logAmplitudeEvent}
        />
    ) : null;
};
