import React, { useEffect, useState } from 'react';
import { verifyWindowObj } from 'utils/Environment';
import { logAmplitudeEvent } from 'utils/amplitude';

// Prevents SSR crash
const Chatbot = verifyWindowObj() ? require('@navikt/nav-chatbot') : () => null;

export const ChatbotWrapper = ({...properties}: any) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const chatbotVersion122IsMounted = document.getElementsByClassName('gxKraP').length > 0;

        if (!chatbotVersion122IsMounted) {
            setIsMounted(true);
        }
    }, []);

    return isMounted ? (
        <Chatbot {...properties} boostApiUrlBase='https://nav.boost.ai/api/chat/v2' analyticsCallback={properties.analyticsCallback ?? logAmplitudeEvent}/>
    ) : null;
};
