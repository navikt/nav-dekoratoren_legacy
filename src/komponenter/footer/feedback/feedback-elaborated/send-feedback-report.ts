import { verifyWindowObj } from 'utils/Environment';
import amplitudeTriggers from 'utils/amplitude-triggers';
import fetchFeedback from '../common/api/fetch-feedback';
import { localhost } from '../common/api/remotes';
import { chooseFeedbackNoRemote, chooseFeedbackReportRemote } from '../common/api/remotes-handler';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

function sendFeedbackReport(category: string, message: string, language: string): void {
    const feedbackReport = {
        category: category.toUpperCase(),
        message: message,
        urlPath: window.location.pathname,
        urlHost: window.location.hostname,
        browser: window.navigator.userAgent,
        browser_language: window.navigator.language,
        languageCode: language,
    };

    if (verifyWindowObj()) {
        const remote = chooseFeedbackReportRemote(window.location.href)

        console.log(remote)
        
        fetchFeedback(feedbackReport, remote)

        logAmplitudeEvent(amplitudeTriggers.rapporterKnapp, { svar: category })

    }
};

export default sendFeedbackReport;
