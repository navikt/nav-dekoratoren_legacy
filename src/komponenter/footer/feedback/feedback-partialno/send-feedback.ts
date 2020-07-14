import { verifyWindowObj } from 'utils/Environment';

function sendFeedback(titles: string[], message: string):void {
    const report = {
        feedbackTitle: titles,
        feedbackMessage: message,
    }

    // Log to Amplitude
    const { logAmplitudeEvent } = verifyWindowObj() 
        ? require('utils/amplitude')
        : () => null;
        
    console.log(titles)

    for (let title of titles) {
        logAmplitudeEvent('tilbakemelding', {svar: title})
        console.log(title)
    }


    // Save to DB
    console.log(report);
};

export default sendFeedback;
