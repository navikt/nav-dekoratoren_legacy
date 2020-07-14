function sendFeedback(title: string[], message: string): void {
    const report = {
        feedbackTitle: title,
        feedbackMessage: message,
    };

    // Log to Amplitude
    /*  import { verifyWindowObj } from 'utils/Environment';
    import amplitude from 'amplitude-js';
    const { logAmplitudeEvent } = verifyWindowObj() 
        ? require('utils/amplitude')
        : () => null;
        
        amplitude.getInstance().logEvent('tilbakemelding', 
        {svar: 'Lite oversiktlig', svar2: 'Lite forståelig',
        svar3: 'Lite relevant info', svar4: 'Villedende'});

        console.log(...title);

    let splitteTitle(...title)) {
        console.log(svar1);      
    }

    splitteTitle(...title); , 
        { svar1:  }*/

    // Save to DB
}

export default sendFeedback;
