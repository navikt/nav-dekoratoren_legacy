import React, { useContext } from 'react';
import { CloseFeedbackContext } from './CloseFeedbackContext';
import { Hovedknapp } from 'nav-frontend-knapper';

const CloseFeedbackHandler = () => {
    const closeFeedbackContext = () => useContext(CloseFeedbackContext)!;

    const { setCloseFeedback } = closeFeedbackContext();

    const userClosedFeedback = () => {
        //logToAmplitude
        setCloseFeedback(true);
    };

    return (
        <div>
            <Hovedknapp onClick={userClosedFeedback}>Lukk</Hovedknapp>
        </div>
    );
};

export default CloseFeedbackHandler;
