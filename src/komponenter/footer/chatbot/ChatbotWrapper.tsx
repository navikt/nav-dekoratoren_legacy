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

type ActionFilter = 'privatperson' | 'arbeidsgiver' | 'NAV_TEST';

const actionFilterMap: { [key in MenuValue]?: ActionFilter[] } = {
    [MenuValue.PRIVATPERSON]: ['privatperson'],
    [MenuValue.ARBEIDSGIVER]: ['arbeidsgiver'],
};

const boostApiUrlBaseStaging = 'https://staging-nav.boost.ai/api/chat/v2';
const boostApiUrlBaseProd = 'https://nav.boost.ai/api/chat/v2';

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

    const actionsFilters: ActionFilter[] = isProd ? actionFilterMap[context] || [] : ['NAV_TEST'];
    const boostApiUrlBase = isProd ? boostApiUrlBaseProd : boostApiUrlBaseStaging;

    return isMounted ? (
        <Chatbot
            boostApiUrlBase={boostApiUrlBase}
            actionFilters={actionsFilters}
            analyticsCallback={logAmplitudeEvent}
        />
    ) : null;
};
