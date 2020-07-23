import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import SimpleFooter from './footer-simple/FooterSimple';
import FooterRegular from './footer-regular/FooterRegular';
import { verifyWindowObj } from 'utils/Environment';
import { chatbotClassname } from 'komponenter/footer/chatbot/ChatbotUtils';
import './Footer.less';
import { useCookies } from 'react-cookie';

// Skal ikke lastes server-side
const { ChatbotWrapper } = verifyWindowObj()
    ? require('komponenter/footer/chatbot/ChatbotWrapper')
    : () => null;

const Footer = () => {
    const { PARAMS } = useSelector((state: AppState) => state.environment);
    const [mountChatbot, setMountChatbot] = useState(false);
    const [cookies] = useCookies();

    useEffect(() => {
        const chatbotSessionActive = !!cookies['chatbot-frida_config'];
        const chatbotComponentAlreadyMounted =
            document.getElementsByClassName(chatbotClassname).length > 0;
        setMountChatbot(
            !chatbotComponentAlreadyMounted &&
                (chatbotSessionActive || PARAMS.CHATBOT)
        );
    }, []);

    return (
        <footer className="sitefooter" role="contentinfo">
            {PARAMS.SIMPLE || PARAMS.SIMPLE_FOOTER ? (
                <SimpleFooter />
            ) : (
                <FooterRegular />
            )}
            {mountChatbot && <ChatbotWrapper />}
        </footer>
    );
};

export default Footer;
