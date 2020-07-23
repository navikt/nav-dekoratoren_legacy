export interface Message {
    id: number;
    sent: string;
    role: number;
    userId: number;
    nickName: string;
    type: string;
    content: any | any[];
    arguments?: {
        additionalProp1: {};
        additionalProp2: {};
        additionalProp3: {};
    };
}

export interface MessageSend {
    nickName: string;
    content: string;
    type: string;
}

export interface SessionCreate {
    customerKey: string;
    queueKey: string;
    nickName: string;
    chatId: string;
    languageCode: string;
    denyArchiving: boolean;
    intro: SessionCreateIntro;
}

export interface SessionCreateResponse {
    iqSessionId: string;
    requestId: number;
}

export interface EmailSendLogo {
    url: string;
    link: string;
    alt: string;
}

export interface EmailSendLayout {
    topBackgroundColor: string;
    topLineColor: string;
    bottomLineColor: string;
    textStyle: string;
}

export interface EmailSend {
    toEmailAddress: string;
    emailSubject: string;
    fromEmailDisplayName: string;
    preText: string;
    postText: string;
    timeZoneId: string;
    logo: EmailSendLogo;
    layout: EmailSendLayout;
}

export interface SurveySend {
    nickName: string;
    surveyQuestion: string;
    surveyMaxScore: number;
    surveyMinScore: number;
    offerSurvey: boolean;
    queueKey: string;
}

export interface ConfigurationResponse {
    [key: string]: string;
}

export interface SessionCreateIntro {
    /**
     * Is enduser on a mobile?
     */
    isMobile?: boolean;
    /**
     * Variables to add
     */
    variables?: { [key: string]: string };
    /**
     * Welcome message header
     */
    msgWelcomeHeader?: string;
    /**
     * Welcome message
     */
    msgWelcome?: string;
    /**
     * Welcome message when theree are no agents logged on
     */
    msgWelcomeEmpty?: string;
    /**
     * Welcome message when all agents are in pause
     */
    msgWelcomePause?: string;
    /**
     * Welcome message when the queue is full
     */
    msgWelcomeFull?: string;
    /**
     * Welcome message when enduser is rejected to enter queue
     */
    msgReject?: string;
    /**
     * Show IP Address in intro?
     */
    showIpAddress?: boolean;
    /**
     * Show Number of endusersr in queue in intro?
     */
    showNumberInQueue?: boolean;
    /**
     * Show Agents logged on in intro?
     */
    showAgentLoggedOn?: boolean;
    /**
     * Show active agents in intro?
     */
    showAgentActive?: boolean;
    /**
     * Show variables in intro?
     */
    showVariables?: boolean;
    /**
     * Show whether user is on mobile in intro?
     */
    showIsMobile?: boolean;
}
