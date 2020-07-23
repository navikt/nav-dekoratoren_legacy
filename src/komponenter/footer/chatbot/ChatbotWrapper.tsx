import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { openChatbot, setCallbackOnChatbotOpen } from './ChatbotUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import Chatbot from '../../chatbot';
import './ChatbotWrapper.less';

const cssPrefix = 'chatbot-wrapper';

type Props = {
    customerKey?: string;
    queueKey?: string;
    configId?: string;
};

// TODO: legg all funksjonaliteten inn i chatbot-koden
export const ChatbotWrapper = ({
    customerKey = '41155',
    queueKey = 'Q_CHAT_BOT',
    configId = '599f9e7c-7f6b-4569-81a1-27202c419953',
}: Props) => {
    const isOpenFromStorage = sessionStorage.getItem('chatbot-frida_apen');
    const [chatbotOpened, setChatbotOpened] = useState(
        isOpenFromStorage === 'true'
    );
    const chatbotRef = useRef<HTMLDivElement>(null);
    const chatbotDock = document.getElementById('chatbot-dock');

    const dockIfNearBottom = (chatbotFixedOffset: number) => () => {
        const chatbotElement = chatbotRef.current;
        if (!chatbotElement || !chatbotDock) {
            return;
        }

        const scrollOffsetBottom = window.pageYOffset + window.innerHeight;
        const dockOffset =
            chatbotDock.getBoundingClientRect().top + window.pageYOffset;

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
        if (!chatbotOpened) {
            setCallbackOnChatbotOpen(() => setChatbotOpened(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatbotOpened]);

    useEffect(() => {
        const chatbotElement = chatbotRef.current;
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
    }, []);

    if (!chatbotDock) {
        return null;
    }

    return createPortal(
        <div className={cssPrefix} ref={chatbotRef}>
            <div
                className={`${cssPrefix}__visual`}
                onClick={() => openChatbot(setChatbotOpened)}
            >
                <div
                    className={`${cssPrefix}__text-panel ${
                        chatbotOpened ? `${cssPrefix}__text-panel--open` : ''
                    }`}
                >
                    <Normaltekst className={`${cssPrefix}__text`}>
                        {'Chatbot Frida'}
                    </Normaltekst>
                </div>
                <Chatbot
                    customerKey={customerKey}
                    queueKey={queueKey}
                    configId={configId}
                />
            </div>
        </div>,
        chatbotDock
    );
};
