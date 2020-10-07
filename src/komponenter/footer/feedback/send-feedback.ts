import { logAmplitudeEvent } from 'utils/amplitude';
import { lagreTilbakemelding } from '../../../store/reducers/tilbakemelding-duck';
import { Dispatch } from '../../../store/dispatch-type';
import { v4 as uuidv4 } from 'uuid';
import Bowser from "bowser";

const getFeedback = (message: string, url: string, language: string, dispatch: Dispatch) => {
    const responseId = uuidv4();
    let sessionId = sessionStorage.getItem('sessionId');
    if(!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem('sessionId', sessionId);
    }

    const browserParser = Bowser.getParser(window.navigator.userAgent);

    return {
        responseId: responseId,
        sessionId: sessionId,
        message: message,
        urlPath: window.location.pathname,
        urlHost: window.location.hostname,
        browser: browserParser.getBrowserName(),
        os: browserParser.getOSName(),
        platform: browserParser.getPlatformType(),
        browserLanguage: window.navigator.language,
        languageCode: language,
    };

};


export const sendFeedbackYes = (message: string, url: string, language: string, dispatch: Dispatch) => {
    const feedback = {
        answer: 'Yes',
        ...getFeedback(message, url, language, dispatch)
    };

    lagreTilbakemelding(feedback, url)(dispatch);
};

export const sendFeedbackNo = ( category: string, message: string, url: string, language: string, dispatch: Dispatch) => {
    const feedback = {
        answer: 'No',
        ...getFeedback(message, url, language, dispatch)
    };

    logAmplitudeEvent('tilbakemelding-nei', { svar: category })
    lagreTilbakemelding(feedback, url)(dispatch);
};

