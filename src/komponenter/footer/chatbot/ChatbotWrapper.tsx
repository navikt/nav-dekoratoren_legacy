import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { verifyWindowObj } from 'utils/Environment';
import moment from 'moment';
import { finnTekst } from 'tekster/finn-tekst';
import './ChatbotWrapper.less';

// Prevents nodejs renderer crash
const Chat = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;

const humanChatIsOpen = () =>
    moment().isBetween(moment().hours(9), moment().hours(15), 'hours', '[]');

const stateSelector = (state: AppState) => ({
    paramChatbot: state.environment.PARAMS.CHATBOT,
    language: state.language.language,
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
    const { paramChatbot, language } = useSelector(stateSelector);
    const [cookies] = useCookies();
    const [mountChatbot, setMountChatbot] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dockRef = useRef<HTMLDivElement>(null);

    const labelText = finnTekst(
        humanChatIsOpen() ? 'chat-veileder' : 'chat-chatbot',
        language
    );

    const dockIfNearBottom = (chatbotFixedOffset: number) => () => {
        const chatbotElement = containerRef.current;
        const dockElement = dockRef.current;
        if (!chatbotElement || !dockElement) {
            return;
        }

        const chatbotFixedPosition =
            window.innerHeight - chatbotElement.scrollHeight;
        const chatbotDockedPosition =
            dockElement.getBoundingClientRect().top + chatbotFixedOffset;

        if (chatbotFixedPosition > chatbotDockedPosition) {
            chatbotElement.style.position = 'static';
        } else {
            chatbotElement.removeAttribute('style');
        }
    };

    useEffect(() => {
        const chatbotSessionActive = !!cookies['chatbot-frida_config'];
        const chatbotVersion122IsMounted =
            document.getElementsByClassName('gxKraP').length > 0;
        setMountChatbot(
            !chatbotVersion122IsMounted &&
                (chatbotSessionActive || paramChatbot)
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

        const bottomOffset =
            window.innerHeight - chatbotElement.getBoundingClientRect().bottom;
        const viewportChangeHandler = dockIfNearBottom(bottomOffset);

        viewportChangeHandler();

        window.addEventListener('scroll', viewportChangeHandler);
        window.addEventListener('resize', viewportChangeHandler);
        return () => {
            window.removeEventListener('scroll', viewportChangeHandler);
            window.removeEventListener('resize', viewportChangeHandler);
        };
    }, [mountChatbot]);

    return mountChatbot ? (
        <div className={'chatbot-dock'} ref={dockRef}>
            <div className={'chatbot-container'} ref={containerRef}>
                <Chat
                    customerKey={customerKey}
                    queueKey={queueKey}
                    configId={configId}
                    label={labelText}
                />
            </div>
        </div>
    ) : null;
};
