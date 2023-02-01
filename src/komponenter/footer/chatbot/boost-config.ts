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

export type BoostConfig = {
    chatPanel?: {
        header?: BoostHeader;
        styling?: BoostStyling;
        settings?: BoostSettings;
    };
};

export type BoostObject = {
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
