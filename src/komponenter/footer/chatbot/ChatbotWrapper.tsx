import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { loadExternalScript } from 'utils/external-scripts';
import { useCookies } from 'react-cookie';
import classNames from 'classnames';
import { FridaIcon } from './FridaIcon';
import { BoostConfig, BoostObject } from './boost-config';

import style from './ChatbotWrapper.module.scss';

const stateSelector = (state: AppState) => ({
    chatbotParamEnabled: state.environment.PARAMS.CHATBOT,
    chatbotParamVisible: state.environment.PARAMS.CHATBOT_VISIBLE,
    featureToggles: state.featureToggles,
    context: state.arbeidsflate.status,
    env: state.environment.ENV,
});

const conversationCookieName = 'nav-chatbot%3Aconversation';

const boostApiUrlBaseTest = 'navtest';
const boostApiUrlBaseProduction = 'nav';

export const ChatbotWrapper = () => {
    const { chatbotParamEnabled, chatbotParamVisible, env } = useSelector(stateSelector);
    const [cookies, setCookie, removeCookie] = useCookies([conversationCookieName]);

    // Do not mount chatbot on initial render. Prevents hydration errors
    // due to inconsistensies between client and server html, as chatbot
    // is not rendered server-side
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [boost, setBoost] = useState<BoostObject | undefined>();
    const [bufferLoad, setBufferLoad] = useState<boolean>(false);
    const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
    const currentFeatureToggles = useSelector(stateSelector).featureToggles;

    const isProduction = env === 'prod';
    const boostApiUrlBase = isProduction ? boostApiUrlBaseProduction : boostApiUrlBaseTest;

    const openBoostWindow = () => {
        if (typeof boost !== 'undefined') {
            boost.chatPanel.show();
        } else {
            setBufferLoad(true);
        }
    };

    const initBoost = () => {
        if (typeof window === 'undefined' || typeof window.boostInit === 'undefined' || boost) {
            return;
        }

        const options: BoostConfig = {
            chatPanel: {
                settings: {
                    removeRememberedConversationOnChatPanelClose: true,
                    conversationId: cookies[conversationCookieName],
                },
            },
        };

        setBoost(window.boostInit(boostApiUrlBase, options));
    };

    useEffect(() => {
        setIsMounted(chatbotParamEnabled);
    }, [chatbotParamEnabled]);

    useEffect(() => {
        const hasConversation = cookies[conversationCookieName];
        const isVisible = hasConversation || chatbotParamVisible;
        const isScriptEnabled = currentFeatureToggles['dekoratoren.chatbotscript'];

        if (!isVisible || !isScriptEnabled) {
            return;
        }

        if (scriptLoaded) {
            setIsVisible(isVisible);
            return;
        }

        loadExternalScript(
            isProduction
                ? 'https://nav.boost.ai/chatPanel/chatPanel.js'
                : 'https://navtest.boost.ai/chatPanel/chatPanel.js'
        ).then(() => {
            setIsVisible(true);
            setScriptLoaded(true);
            initBoost();
        });
    }, [chatbotParamVisible, currentFeatureToggles]);

    useEffect(() => {
        if (!boost) {
            return;
        }

        boost.chatPanel.addEventListener('conversationIdChanged', (event: any) => {
            if (!event?.detail?.conversationId) {
                removeCookie(conversationCookieName);
                return;
            }
            let expirationDay = new Date();
            expirationDay.setHours(expirationDay.getHours() + 1);
            setCookie(conversationCookieName, event.detail.conversationId, {
                expires: expirationDay,
                domain: isProduction ? '.nav.no' : '.dev.nav.no',
            });
        });

        if (bufferLoad) {
            setBufferLoad(false);
            boost.chatPanel.show();
        }
    }, [boost]);

    return isMounted ? (
        <div>
            <button
                id="chatbot-frida-knapp"
                aria-label="Åpne chat"
                onClick={openBoostWindow}
                className={classNames(style.chatbot, isVisible && style.extraVisible)}
            >
                <div className={classNames(style.chatbotWrapper)}>
                    <FridaIcon />
                </div>
            </button>
        </div>
    ) : null;
};
