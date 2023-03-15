type HexColor = `#${string}`;

type ButtonType = 'button' | 'bullet';

type BoostHeaderFilterOptions = { id: number; title: string; values: string[] };

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
    userToken?: string | (() => string | undefined | null);
};

export type BoostConfig = {
    chatPanel?: {
        header?: BoostHeader;
        styling?: BoostStyling;
        settings?: BoostSettings;
    };
};

export type BoostObject = {
    chatPanel: {
        sendMessage: (message: string) => void;
        addEventListener: (type: string, listener: EventListener, options?: { once: boolean }) => void;
        removeEventListener: (type: string, listener: EventListener) => void;
        setFilterValues: (filterValues: string[]) => void;
        setContextIntentId: (contextIntentId: number) => void;
        loginEvent: (info: { authType: string; authContent: string }) => void;
        logoutEvent: () => void;
        triggerAction: (actionId: number) => void;
        setSkill: (skill: string) => void;
        minimize: () => void;
        setCustomPayload: (customPayload: string | null) => void;
        setTitle: (newTitle: string | null) => void;
        setConversationId: (
            newConversationId: string | null,
            options?: {
                continueConversation: boolean;
            }
        ) => void;
        show: () => void;
        getVisibility: () => 'visible' | 'closed' | 'minimized';
    };
};
