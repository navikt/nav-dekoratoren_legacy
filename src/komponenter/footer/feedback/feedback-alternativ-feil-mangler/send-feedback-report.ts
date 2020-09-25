import amplitudeTriggers from 'utils/amplitude-triggers';
import { logAmplitudeEvent } from 'utils/amplitude';
import { lagreTilbakemelding } from '../../../../store/reducers/tilbakemelding-duck';

const sendFeedbackReport = (category: string, message: string, url: string, language: string) => {
    const feedbackReport = {
        category: category.toUpperCase(),
        message: message,
        urlPath: window.location.pathname,
        urlHost: window.location.hostname,
        browser: window.navigator.userAgent,
        browserLanguage: window.navigator.language,
        languageCode: language,
    };

    lagreTilbakemelding(feedbackReport, url);
    logAmplitudeEvent(amplitudeTriggers.rapporterKnapp, { svar: category })
};

export default sendFeedbackReport;
