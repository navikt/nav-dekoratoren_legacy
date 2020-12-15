import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import { logAmplitudeEvent } from 'utils/amplitude';

// Prevents SSR crash
const Chatbot = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;
const stagingUrlHosts = ['www-q0.nav.no', 'www-q1.nav.no', 'www-q6.nav.no', 'dekoratoren.dev.nav.no'];

const stateSelector = (state: AppState) => ({
    isChatbotEnabled: state.environment.PARAMS.CHATBOT,
});

export const ChatbotWrapper = ({ ...properties }: any) => {
    const { isChatbotEnabled } = useSelector(stateSelector);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const chatbotVersion122IsMounted = document.getElementsByClassName('gxKraP').length > 0;

        if (!chatbotVersion122IsMounted && isChatbotEnabled) {
            setIsMounted(true);
        }
    }, []);

    const boostApiUrlBase =
        verifyWindowObj() && stagingUrlHosts.includes(window.location.host)
            ? 'https://staging-navtest.boost.ai/api/chat/v2'
            : 'https://nav.boost.ai/api/chat/v2';

    return isMounted ? (
        <Chatbot
            {...properties}
            {...{ boostApiUrlBase }}
            analyticsCallback={properties.analyticsCallback ?? logAmplitudeEvent}
        />
    ) : null;
};
