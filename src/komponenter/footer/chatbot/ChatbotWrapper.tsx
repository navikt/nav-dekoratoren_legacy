import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import { MenuValue } from '../../../utils/meny-storage-utils';
import { useCookies } from 'react-cookie';
import classNames from 'classnames';
import style from './ChatbotWrapper.module.scss';
import { Button } from '@navikt/ds-react';

import frida from 'ikoner/frida.svg';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';

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

type HexColor = `#${string}`;

type ButtonType = 'button' | 'bullet';

type boostConfig = {
    chatPanel?: {
        header?: {
            filters?: { filterValues?: string | string[]; options?: { id: Number; title: string; values: string[] }[] };
            showMinimizeButton?: 'always' | 'never' | 'mobile';
            title?: string;
        };
        styling?: {
            avatarShape?: 'rounded' | 'squared';
            avatarUrl?: string;
            fontFamily?: string;
            panelShape?: 'squared' | 'rounded';
            panelBackgroundColor?: HexColor;
            panelScrollbarColor?: HexColor;
            contrastColor?: HexColor;
            primaryColor?: HexColor;
            disableVanStylingChange?: boolean;
            size?: 'small' | 'medium' | 'large';
            pace?: 'glacial' | 'slower' | 'slow' | 'normal' | 'fast' | 'faster' | 'supersonic' | number;
            position?: { spacingBottom?: number | string; spacingRight: number | string; zIndex?: number | string };
            chatBubbles?: {
                userBackgroundColor?: HexColor;
                userTextColor?: HexColor;
                typingDotColor?: HexColor;
                typing8ackgroundColor?: HexColor;
                vaBackgroundColor?: HexColor;
                vaTextColor?: HexColor;
            };
            messageFeedback?: {
                hide?: boolean;
                focusColor?: HexColor;
                selectedColor?: HexColor;
                outlineColor?: HexColor;
            };
            composer?: {
                hide?: boolean;
                composeLengthColor?: HexColor;
                composeLengthDisabledColor?: HexColor;
                frameBackgroundColor?: HexColor;
                sendButtonColor?: HexColor;
                sendButtonDisabledColor?: HexColor;
                sendButtonFocusOutlineColor?: HexColor;
                textareaFocusBorderColor?: HexColor;
                textareaFocusOutlineColor?: HexColor;
                textareaBorderColor?: HexColor;
                textareaBackgroundColor?: HexColor;
                textareaTextColor: HexColor;
                textareaPlaceholderTextColor: HexColor;
                topBorderColor?: HexColor;
                topBorderFocusColor?: HexColor;
            };
            buttons?: {
                backgroundColor?: HexColor;
                textColor?: HexColor;
                variant?: ButtonType;
                focusBackgroundColor: HexColor;
                focusOutlineColor?: HexColor;
                focusTextColor?: HexColor;
                hoverBackgroundColor?: HexColor;
                hoverTextColor?: HexColor;
                multiline?: boolean;
            };
        };
        settings?: {
            alwaysFullscreen?: boolean;
            authStartTriggerActionId?: string | number;
            contextTopicIntentId?: string | number;
            conversationId?: string;
            fileUploadServiceEndpointUrl?: string;
            enableProactivityForSmallDevices?: boolean;
            messageFeedbackOnFirstAction?: boolean;
            openTextLinksInNewTab?: boolean;
            pageUrl?: string;
            requestFeedback?: boolean;
            removeRememberedConversationOnChatPanelClose?: boolean;
            showLinkClickAsChatBubble?: boolean;
            skill?: string;
            startLanguage?: string;
            startNewConversationOnResumeFailure?: boolean;
            startTriggerActionId?: string | number;
            triggerActionOnResume?: boolean;
            userToken?: string | undefined | (() => string | undefined | null);
        };
    };
};

type boostObject = {
    chatPanel: {
        sendMessage: (message: String) => void;
        addEventListener: (type: String, listener: Function, options?: { once: Boolean }) => void;
        removeEventListener: (type: String, listener: Function) => void;
        setFilterValues: (filterValues: String[]) => void;
        setContextIntentId: (contextIntentId: Number) => void;
        loginEvent: (info: { authType: String; authContent: String }) => void;
        logoutEvent: () => void;
        triggerAction: (actionId: Number) => void;
        setSkill: (skill: String) => void;
        minimize: () => void;
        setCustomPayload: (customPayload: String | null) => void;
        setTitle: (newTitle: String | null) => void;
        setConversationId: (
            newConversationId: String | null,
            options?: {
                continueConversation: Boolean;
            }
        ) => void;
        show: () => void;
        getVisibility: () => 'visible' | 'closed' | 'minimized';
    };
};

const contextFilterMap: { [key in MenuValue]?: ActionFilter[] } = {
    [MenuValue.PRIVATPERSON]: ['privatperson'],
    [MenuValue.ARBEIDSGIVER]: ['arbeidsgiver'],
};

const getActionFilters = (context: MenuValue, isProduction: boolean): ActionFilter[] => {
    const contextFilter = contextFilterMap[context] || [];
    return isProduction ? contextFilter : [...contextFilter, 'NAV_TEST'];
};

const options: boostConfig = {};

export const ChatbotWrapper = () => {
    const { chatbotParamEnabled, chatbotParamVisible, context, env } = useSelector(stateSelector);
    const [cookies] = useCookies();

    // Do not mount chatbot on initial render. Prevents hydration errors
    // due to inconsistensies between client and server html, as chatbot
    // is not rendered server-side
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [boost, setBoost] = useState<boostObject | undefined>();

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

    const openBoostWindow = () => {
        // Check if a boost session has been established
        if (typeof window !== 'undefined' && boost == null) {
            const w = window as any;
            if (typeof w.boostInit !== 'undefined') {
                setBoost(w.boostInit('navtest', options));
            }
        }
        if (typeof boost !== 'undefined') boost.chatPanel.show();
    };

    useEffect(() => {
        openBoostWindow();
    }, [boost]);

    return isMounted ? (
        <div>
            <button
                id="chatbot-frida-knapp"
                onClick={openBoostWindow}
                className={classNames(style.testButton, isVisible && style.extraVisible)}
            >
                <div className={classNames(style.testDiv)}>
                    <Bilde altText="Chatbotten Frida" asset={frida} />
                </div>
            </button>
        </div>
    ) : null;
};
