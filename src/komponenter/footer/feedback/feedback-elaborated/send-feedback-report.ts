import { verifyWindowObj } from 'utils/Environment';
import { AmplitudeEvents } from 'utils/amplitude';

function sendFeedbackReport(category: string, message: string, language: string): void {
    // Log to Amplitude
    const { logAmplitudeEvent } = verifyWindowObj()
        ? require('utils/amplitude')
        : () => null;

    const feedbackReport = {
        category: category.toUpperCase(),
        message: message,
        urlPath: window.location.pathname,
        urlHost: window.location.hostname,
        browser: window.navigator.userAgent,
        languageCode: language,
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackReport)
    };

    fetch('https://dekoratoren-feedback-api-q6.dev-sbs.nais.io/feedback/report', requestOptions)
        .then(response => response)
        .then(data => data)

    logAmplitudeEvent('tilbakemelding-rapport', { svar: category })

};

export default sendFeedbackReport;
