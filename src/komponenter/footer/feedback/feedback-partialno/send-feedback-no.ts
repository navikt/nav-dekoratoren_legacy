import { verifyWindowObj } from 'utils/Environment';
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
        languageCode: language
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackReport)
    };

    fetch('https://dekoratoren-feedback-api-q6.dev-sbs.nais.io/feedback/no', requestOptions)
        .then(response => response)
        .then(data => data)


    for (let category of categories) {
        logAmplitudeEvent('tilbakemelding-nei', { svar: category })
    }

};

export default sendFeedbackNo;
