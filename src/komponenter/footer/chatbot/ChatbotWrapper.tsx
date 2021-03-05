import React, { useEffect, useState } from 'react';
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

export const ChatbotWrapper = ({ ...properties }: any) => {
    const { isChatbotEnabled } = useSelector(stateSelector);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const chatbotVersion122IsMounted = document.getElementsByClassName('gxKraP').length > 0;
        setIsMounted(!chatbotVersion122IsMounted && isChatbotEnabled);
    }, [isChatbotEnabled]);

    const isStaging = verifyWindowObj() && stagingUrlHosts.includes(window.location.hostname);
    const boostApiUrlBase = isStaging ? 'https://staging-nav.boost.ai/api/chat/v2' : 'https://nav.boost.ai/api/chat/v2';
    const actionFilters = isStaging ? ['NAV_TEST'] : undefined;

    return isMounted ? (
        <Chatbot
            {...properties}
            {...{ boostApiUrlBase, actionFilters }}
            analyticsCallback={properties.analyticsCallback ?? logAmplitudeEvent}
        />
    ) : null;
};
