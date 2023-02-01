import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { loadExternalScript } from 'utils/external-scripts';
import { useCookies } from 'react-cookie';
import classNames from 'classnames';
import style from './ChatbotWrapper.module.scss';
import { FridaIcon } from './FridaIcon';

const stateSelector = (state: AppState) => ({
    chatbotParamEnabled: state.environment.PARAMS.CHATBOT,
    chatbotParamVisible: state.environment.PARAMS.CHATBOT_VISIBLE,
    context: state.arbeidsflate.status,
    env: state.environment.ENV,
});

const conversationCookieName = 'nav-chatbot%3Aconversation';

const boostApiUrlBaseTest = 'navtest';
const boostApiUrlBaseProduction = 'nav';

type HexColor = `#${string}`;

type ButtonType = 'button' | 'bullet';

type BoostHeaderFilterOptions = { id: Number; title: string; values: string[] };

type BoostHeaderFilter = {
    filterValues?: string | string[];
    options?: BoostHeaderFilterOptions[];
};

type BoostHeader = {
    filters?: BoostHeaderFilter;
    showMinimizeButton?: 'always' | 'never' | 'mobile';
    title?: string;
};

type BoostPositionStyling = {
    spacingBottom?: number | string;
    spacingRight: number | string;
    zIndex?: number | string;
};

type BoostChatBubbleStyles = {
    userBackgroundColor?: HexColor;
    userTextColor?: HexColor;
    typingDotColor?: HexColor;
    typing8ackgroundColor?: HexColor;
    vaBackgroundColor?: HexColor;
    vaTextColor?: HexColor;
};

type BoostMessageFeedbackStyling = {
    hide?: boolean;
    focusColor?: HexColor;
    selectedColor?: HexColor;
    outlineColor?: HexColor;
};

type BoostComposerStyling = {
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

type BoostButtonStyling = {
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

type BoostStyling = {
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
    position?: BoostPositionStyling;
    chatBubbles?: BoostChatBubbleStyles;
    messageFeedback?: BoostMessageFeedbackStyling;
    composer?: BoostComposerStyling;
    buttons?: BoostButtonStyling;
};

type BoostSettings = {
    alwaysFullscreen?: boolean;
    authStartTriggerActionId?: string | number;
    contextTopicIntentId?: string | number;
    conversationId?: string | null;
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

type BoostConfig = {
    chatPanel?: {
        header?: BoostHeader;
        styling?: BoostStyling;
        settings?: BoostSettings;
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

export const ChatbotWrapper = () => {
    const { chatbotParamEnabled, chatbotParamVisible, context, env } = useSelector(stateSelector);
    const [cookies, setCookie, removeCookie] = useCookies([conversationCookieName]);

    // Do not mount chatbot on initial render. Prevents hydration errors
    // due to inconsistensies between client and server html, as chatbot
    // is not rendered server-side
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [boost, setBoost] = useState<boostObject | undefined>();
    const [bufferLoad, setBufferLoad] = useState<Boolean>(false);
    const [scriptLoaded, setScriptLoaded] = useState<Boolean>(false);

    useEffect(() => {
        setIsMounted(chatbotParamEnabled);
    }, [chatbotParamEnabled]);

    useEffect(() => {
        const hasConversation = cookies[conversationCookieName];
        setIsVisible(hasConversation || chatbotParamVisible);
    }, [chatbotParamVisible]);

    useEffect(() => {
        if (isVisible && !scriptLoaded) {
            loadExternalScript(
                env === 'prod'
                    ? 'https://nav.boost.ai/chatPanel/chatPanel.js'
                    : 'https://navtest.boost.ai/chatPanel/chatPanel.js'
            );
            setScriptLoaded(true);
        }
    }, [isVisible]);

    const isProduction = env === 'prod';

    const boostApiUrlBase = isProduction ? boostApiUrlBaseProduction : boostApiUrlBaseTest;

    const openBoostWindow = () => {
        if (typeof boost !== 'undefined') {
            boost.chatPanel.show();
        } else {
            setBufferLoad(true);
        }
    };

    if (typeof window !== 'undefined' && boost == null) {
        const w = window as any;
        if (typeof w.boostInit !== 'undefined') {
            const options: BoostConfig = {
                chatPanel: {
                    settings: {
                        removeRememberedConversationOnChatPanelClose: true,
                        conversationId: cookies[conversationCookieName],
                    },
                },
            };
            setBoost(w.boostInit(boostApiUrlBase, options));
        }
    }

    useEffect(() => {
        if (boost) {
            boost.chatPanel.addEventListener('conversationIdChanged', (event: any) => {
                if (!event?.detail?.conversationId) {
                    removeCookie(conversationCookieName);
                    return;
                }
                let expirationDay = new Date();
                expirationDay.setHours(expirationDay.getHours() + 1);
                setCookie(conversationCookieName, event.detail.conversationId, { expires: expirationDay });
            });
            if (bufferLoad) {
                setBufferLoad(false);
                boost.chatPanel.show();
            }
        }
    }, [boost]);

    return isMounted ? (
        <div>
            <button
                id="chatbot-frida-knapp"
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
