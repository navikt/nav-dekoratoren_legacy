import React, { useContext } from 'react';
import { CloseFeedbackContext } from './CloseFeedbackContext';
import Lukknapp from 'nav-frontend-lukknapp';

const CloseFeedbackHandler = () => {
    const closeFeedbackContext = () => useContext(CloseFeedbackContext)!;

    const { setCloseFeedback } = closeFeedbackContext();

    const userClosedFeedback = () => {
        //logToAmplitude
        setCloseFeedback(true);
    };

    return (
        <div>
            <Lukknapp onClick={userClosedFeedback}>Lukk</Lukknapp>
        </div>
    );
};

export default CloseFeedbackHandler;