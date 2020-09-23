import amplitudeTriggers from 'utils/amplitude-triggers';
import fetchFeedback from '../common/api/fetch-feedback';
import { chooseFeedbackReportRemote } from '../common/api/remotes-handler';
import { logAmplitudeEvent } from 'utils/amplitude';

function sendFeedbackReport(category: string, message: string, language: string): void {
    const feedbackReport = {
        category: category.toUpperCase(),
        message: message,
        urlPath: window.location.pathname,
        urlHost: window.location.hostname,
        browser: window.navigator.userAgent,
        browserLanguage: window.navigator.language,
        languageCode: language,
    };

    const remote = chooseFeedbackReportRemote()

    fetchFeedback(feedbackReport, remote)

    logAmplitudeEvent(amplitudeTriggers.rapporterKnapp, { svar: category })
};

export default sendFeedbackReport;
