import React, { useContext } from 'react';
import { CloseFeedbackContext } from './CloseFeedbackContext';
import { Hovedknapp } from 'nav-frontend-knapper';
import { verifyWindowObj } from 'utils/Environment';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;
import Lukknapp from 'nav-frontend-lukknapp';

interface Props {
    context: string;
}

const CloseFeedbackHandler: React.FC<Props> = ({ context }) => {
    const closeFeedbackContext = () => useContext(CloseFeedbackContext)!;

    const { setCloseFeedback } = closeFeedbackContext();

    const userClosedFeedback = () => {

        if (context === 'elaborated') {
            logAmplitudeEvent('tilbakemelding-rapport', { svar: 'Avbrutt' })
        } else if (context === 'no') {
            logAmplitudeEvent('tilbakemelding-rapport', { svar: 'Avbrutt' })

        }

        setCloseFeedback(true);
    };

    return (
        <div>
            <Lukknapp onClick={userClosedFeedback}>Lukk</Lukknapp>
        </div>
    );
};

export default CloseFeedbackHandler;