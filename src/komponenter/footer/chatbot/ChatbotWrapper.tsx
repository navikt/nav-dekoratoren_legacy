import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Chat from 'komponenter/chatbot';
import { chatStateKeys } from 'komponenter/chatbot/components/ChatContainer';
import './ChatbotWrapper.less';

const oldChatbotAlreadyMounted = () =>
    document.getElementsByClassName('gxKraP').length > 0;

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
    const { PARAMS } = useSelector((state: AppState) => state.environment);
    const [cookies] = useCookies();
    const [mountChatbot, setMountChatbot] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dockRef = useRef<HTMLDivElement>(null);

    const dockIfNearBottom = (chatbotFixedOffset: number) => () => {
        const chatbotElement = containerRef.current;
        const dockElement = dockRef.current;
        if (!chatbotElement || !dockElement) {
            return;
        }

        const scrollOffsetBottom = window.pageYOffset + window.innerHeight;
        const dockOffset =
            dockElement.getBoundingClientRect().top + window.pageYOffset;

        if (
            scrollOffsetBottom - chatbotElement.scrollHeight >
            dockOffset + chatbotFixedOffset
        ) {
            chatbotElement.style.position = 'static';
        } else {
            chatbotElement.removeAttribute('style');
        }
    };

    useEffect(() => {
        const chatbotSessionActive = !!cookies[chatStateKeys.CONFIG];
        setMountChatbot(
            !oldChatbotAlreadyMounted() &&
                (chatbotSessionActive || PARAMS.CHATBOT)
        );
    }, []);

    useEffect(() => {
        if (!mountChatbot) {
            return;
        }
        const chatbotElement = containerRef.current;
        if (!chatbotElement) {
            return;
        }

        const chatbotFixedOffset =
            window.innerHeight - chatbotElement.getBoundingClientRect().bottom;
        const handler = dockIfNearBottom(chatbotFixedOffset);

        handler();

        window.addEventListener('scroll', handler);
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        };
    }, [mountChatbot]);

    return mountChatbot ? (
        <div className={'chatbot-dock'} ref={dockRef}>
            <div className={'chatbot-container'} ref={containerRef}>
                <Chat
                    customerKey={customerKey}
                    queueKey={queueKey}
                    configId={configId}
                />
            </div>
        </div>
    ) : null;
};
