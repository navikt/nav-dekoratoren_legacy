import { verifyWindowObj } from 'utils/Environment';

function sendFeedbackNo(categories: string[], message: string): void {
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
        browser: window.navigator.appCodeName,
        languageCode: "nb"
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackReport)
    };

    fetch('http://localhost:8080/feedback/no', requestOptions)
        .then(response => response)
        .then(data => data)


    /* for (let title of titles) {
        logAmplitudeEvent('tilbakemelding', { svar: title })
        console.log(title)
    } */

};

export default sendFeedbackNo;
