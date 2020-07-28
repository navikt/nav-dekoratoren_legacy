import { verifyWindowObj } from 'utils/Environment';
import amplitudeTriggers from 'utils/amplitude-triggers';
import fetchFeedback from '../common/api/fetch-feedback';
import { chooseFeedbackNoRemote } from '../common/api/remotes-handler';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

function sendFeedbackNo(categories: string[], message: string, language: string): void {
    const feedbackReport = {
        forstaaelig: categories.includes("Lite forståelig"),
        villedende: categories.includes("Villedende"),
        relevant: categories.includes("Lite relevant informasjon"),
        oversiktlig: categories.includes("Lite oversiktlig"),
        message: message,
        urlPath: window.location.pathname,
        urlHost: window.location.hostname,
        browser: window.navigator.userAgent,
        browser_language: window.navigator.language,
        languageCode: language
    };

    if (verifyWindowObj()) {
        const remote = chooseFeedbackNoRemote(window.location.href)

        console.log(remote)

        fetchFeedback(feedbackReport, remote)

        for (let category of categories) {
            logAmplitudeEvent(amplitudeTriggers.neiKnapp, { svar: category })
        }
    }
};

export default sendFeedbackNo;
