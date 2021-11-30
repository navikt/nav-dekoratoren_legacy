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

const stateSelector = (state: AppState) => ({
    isChatbotEnabled: state.environment.PARAMS.CHATBOT,
    context: state.arbeidsflate.status,
    env: state.environment.ENV,
});

const boostApiUrlBaseTest = 'https://navtest.boost.ai/api/chat/v2';
const boostApiUrlBaseStaging = 'https://staging-nav.boost.ai/api/chat/v2';
const boostApiUrlBaseProduction = 'https://nav.boost.ai/api/chat/v2';

type ActionFilter = 'privatperson' | 'arbeidsgiver' | 'NAV_TEST';

const contextFilterMap: { [key in MenuValue]?: ActionFilter[] } = {
    [MenuValue.PRIVATPERSON]: ['privatperson'],
    [MenuValue.ARBEIDSGIVER]: ['arbeidsgiver'],
};

const getActionFilters = (context: MenuValue, isProduction: boolean): ActionFilter[] => {
    const contextFilter = contextFilterMap[context] || [];
    return isProduction ? contextFilter : [...contextFilter, 'NAV_TEST'];
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
    const isTest = hostname && testUrlHosts.includes(hostname);
    const isProduction = env === 'prod';

    const boostApiUrlBase = isTest
        ? boostApiUrlBaseTest
        : isProduction
            ? boostApiUrlBaseProduction
            : boostApiUrlBaseStaging;

    return isMounted ? (
        <Chatbot
            boostApiUrlBase={boostApiUrlBase}
            actionFilters={getActionFilters(context, isProduction)}
            analyticsCallback={logAmplitudeEvent}
        />
    ) : null;
};
