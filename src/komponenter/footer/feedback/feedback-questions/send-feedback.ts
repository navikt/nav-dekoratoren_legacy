import amplitudeTriggers from '../amplitude-triggers';
import { logAmplitudeEvent } from 'utils/amplitude';
import { lagreTilbakemelding } from '../../../../store/reducers/tilbakemelding-duck';
import { Dispatch } from '../../../../store/dispatch-type';



export const sendFeedbackYes = (message: string, url: string, language: string, dispatch: Dispatch) => {
    const feedback = {
        answer: 'Yes',
        message: message,
        urlPath: window.location.pathname,
        urlHost: window.location.hostname,
        browser: window.navigator.userAgent,
        browserLanguage: window.navigator.language,
        languageCode: language,
    };

    lagreTilbakemelding(feedback, url)(dispatch);
};

export const sendFeedbackNo = ( category: string, message: string, url: string, language: string, dispatch: Dispatch) => {
    const feedback = {
        answer: 'No',
        category: category.toUpperCase(),
        message: message,
        urlPath: window.location.pathname,
        urlHost: window.location.hostname,
        browser: window.navigator.userAgent,
        browserLanguage: window.navigator.language,
        languageCode: language,
    };

    logAmplitudeEvent(amplitudeTriggers.neiKnapp, { svar: category })
    lagreTilbakemelding(feedback, url)(dispatch);
};

