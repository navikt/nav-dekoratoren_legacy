import { verifyWindowObj } from 'utils/Environment';
import amplitudeTriggers from 'utils/amplitude-triggers';
import fetchFeedback from '../common/api/fetch-feedback';
import { remotes_report } from '../common/api/remotes';
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
        languageCode: language,
    };

    fetchFeedback(feedbackReport, remotes_report.dev)

    logAmplitudeEvent(amplitudeTriggers.rapporterKnapp, { svar: category })

};

export default sendFeedbackReport;
