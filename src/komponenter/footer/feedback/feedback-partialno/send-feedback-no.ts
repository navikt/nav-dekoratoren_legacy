import { verifyWindowObj } from 'utils/Environment';

function sendFeedbackNo(categories: string[], message: string, language: string): void {
    // Log to Amplitude
    const { logAmplitudeEvent } = verifyWindowObj()
        ? require('utils/amplitude')
        : () => null;

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


    /* for (let title of titles) {
        logAmplitudeEvent('tilbakemelding', { svar: title })
        console.log(title)
    } */

};

export default sendFeedbackNo;
