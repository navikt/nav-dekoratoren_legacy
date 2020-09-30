import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import moment from 'moment-timezone';
import { finnTekst } from 'tekster/finn-tekst';
import { getResizeObserver } from 'utils/resize-observer';
import debounce from 'lodash.debounce';
import { logAmplitudeEvent } from 'utils/amplitude';
import { defaultSurvey } from 'komponenter/footer/chatbot/chatbotAnalytics';
import { enonicFeatureToggle } from 'komponenter/footer/chatbot/chatbotEnonicConfig';
import { defaultEnonicConfig } from 'komponenter/footer/chatbot/chatbotEnonicConfig';
import './ChatbotWrapper.less';

// Prevents SSR crash
const Chat = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;

const humanChatIsOpen = (serverTime: number) => {
    const now = moment(serverTime).tz('Europe/Oslo');
    if (now.isoWeekday() > 5) {
        return false;
    }
    const opening = moment(now).hours(9).minutes(0);
    const closing = moment(now).hours(14).minutes(30);
    return now.isBetween(opening, closing, 'minutes', '[)');
};

const stateSelector = (state: AppState) => ({
    paramChatbot: state.environment.PARAMS.CHATBOT,
    language: state.language.language,
    serverTime: state.environment.SERVER_TIME,
    menuIsActive:
        state.dropdownToggles.hovedmeny ||
        state.dropdownToggles.minside ||
        state.dropdownToggles.sok ||
        state.dropdownToggles.varsler,
});

type Props = {
    customerKey?: string;
    queueKey?: string;
    configId?: string;
};

export const ChatbotWrapper = ({
    customerKey = '41155',
    queueKey = 'Q_CHAT_BOT',
    configId = '599f9e7c-7f6b-4569-81a1-27202c419953',
}: Props) => {
    const { paramChatbot, language, serverTime, menuIsActive } = useSelector(
        stateSelector
    );
    const [cookies] = useCookies();
    const [mountChatbot, setMountChatbot] = useState(false);
    const chatConfig = defaultEnonicConfig;

    const [isDocked, setIsDocked] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dockRef = useRef<HTMLDivElement>(null);

    const labelText = finnTekst(
        humanChatIsOpen(serverTime) ? 'chat-veileder' : 'chat-chatbot',
        language
    );

    useEffect(() => {
        const chatbotSessionActive = !!cookies['chatbot-frida_config'];
        const chatbotVersion122IsMounted =
            document.getElementsByClassName('gxKraP').length > 0;

        setMountChatbot(
            !chatbotVersion122IsMounted &&
                (chatbotSessionActive ||
                    paramChatbot ||
                    enonicFeatureToggle(chatConfig))
        );
    }, [paramChatbot]);

    useEffect(() => {
        if (!mountChatbot) {
            return;
        }
        const chatbotElement = containerRef.current;
        const dockElement = dockRef.current;
        if (!chatbotElement || !dockElement) {
            return;
        }

        const chatbotBottomOffset =
            window.innerHeight - chatbotElement.getBoundingClientRect().bottom;

        const dockIfNearBottom = () => {
            const chatbotFixedPosition =
                window.innerHeight - chatbotElement.scrollHeight;
            const chatbotDockedPosition =
                dockElement.getBoundingClientRect().top + chatbotBottomOffset;
            setIsDocked(chatbotFixedPosition > chatbotDockedPosition);
        };

        const bodyResizeObserver = getResizeObserver(
            debounce(dockIfNearBottom, 100)
        );

        dockIfNearBottom();

        window.addEventListener('scroll', dockIfNearBottom);
        bodyResizeObserver.observe(document.body);
        return () => {
            window.removeEventListener('scroll', dockIfNearBottom);
            bodyResizeObserver.unobserve(document.body);
        };
    }, [mountChatbot]);

    return mountChatbot ? (
        <div className={'chatbot-dock'} ref={dockRef}>
            <div
                className={`chatbot-container${
                    isDocked ? ' chatbot-container__docked' : ''
                }${menuIsActive ? ' chatbot-container__menu-active' : ''}`}
                ref={containerRef}
            >
                <Chat
                    customerKey={customerKey}
                    queueKey={queueKey}
                    configId={configId}
                    label={labelText}
                    analyticsCallback={logAmplitudeEvent}
                    analyticsSurvey={chatConfig?.analytics || defaultSurvey}
                />
            </div>
        </div>
    ) : null;
};
