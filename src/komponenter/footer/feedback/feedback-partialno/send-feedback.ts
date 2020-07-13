function sendFeedback(title: string[], message: string):void {
    const report = {
        feedbackTitle: title,
        feedbackMessage: message,
    } 

    // Log to Amplitude
    // Save to DB
};

export default sendFeedback;
