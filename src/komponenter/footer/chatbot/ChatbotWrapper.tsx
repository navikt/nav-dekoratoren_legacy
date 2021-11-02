import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import { logAmplitudeEvent } from 'utils/amplitude';
import { MenuValue } from '../../../utils/meny-storage-utils';

// Prevents SSR crash
const Chatbot = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;

const stateSelector = (state: AppState) => ({
    isChatbotEnabled: state.environment.PARAMS.CHATBOT,
    context: state.arbeidsflate.status,
    env: state.environment.ENV,
});

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

    const isProd = env === 'prod';
    const boostApiUrlBase = isProd ? boostApiUrlBaseProd : boostApiUrlBaseStaging;

    return isMounted ? (
        <Chatbot
            boostApiUrlBase={boostApiUrlBase}
            actionFilters={getActionFilters(context, isProd)}
            analyticsCallback={logAmplitudeEvent}
        />
    ) : null;
};
