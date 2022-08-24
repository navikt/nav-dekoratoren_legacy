import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import { MenuValue } from '../../../utils/meny-storage-utils';
import { useCookies } from 'react-cookie';
import classNames from 'classnames';
import style from './ChatbotWrapper.module.scss';

// Prevents SSR crash
const Chatbot = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;

const testUrlHosts = ['dekoratoren.ekstern.dev.nav.no'];

const stateSelector = (state: AppState) => ({
    chatbotParamEnabled: state.environment.PARAMS.CHATBOT,
    chatbotParamVisible: state.environment.PARAMS.CHATBOT_VISIBLE,
    context: state.arbeidsflate.status,
    env: state.environment.ENV,
});

const conversationCookieName = 'nav-chatbot%3Aconversation';

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
    const { chatbotParamEnabled, chatbotParamVisible, context, env } = useSelector(stateSelector);
    const [cookies] = useCookies();

    // Do not mount chatbot on initial render. Prevents hydration errors
    // due to inconsistensies between client and server html, as chatbot
    // is not rendered server-side
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsMounted(chatbotParamEnabled);
    }, [chatbotParamEnabled]);

    useEffect(() => {
        const hasConversation = cookies[conversationCookieName];
        setIsVisible(hasConversation || chatbotParamVisible);
    }, [chatbotParamVisible]);

    const hostname = verifyWindowObj() && window.location.hostname;
    const isTest = hostname && testUrlHosts.includes(hostname);
    const isProduction = env === 'prod';

    let boostApiUrlBase = boostApiUrlBaseStaging;

    if (isTest) {
        boostApiUrlBase = boostApiUrlBaseTest;
    } else if (isProduction) {
        boostApiUrlBase = boostApiUrlBaseProduction;
    }

    return isMounted ? (
        <div className={classNames(style.chatbotFrida, isVisible && style.visible)}>
            <Chatbot
                boostApiUrlBase={boostApiUrlBase}
                actionFilters={getActionFilters(context, isProduction)}
                analyticsCallback={logAmplitudeEvent}
            />
        </div>
    ) : null;
};
