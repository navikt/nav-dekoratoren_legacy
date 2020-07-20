import React, { useContext } from 'react';
import { CloseFeedbackContext } from './CloseFeedbackContext';
import { verifyWindowObj } from 'utils/Environment';
import Lukknapp from 'nav-frontend-lukknapp';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

interface Props {
    context: string;
}

const CloseFeedbackHandler: React.FC<Props> = ({ context }) => {
    const closeFeedbackContext = () => useContext(CloseFeedbackContext)!;

    const { setCloseFeedback } = closeFeedbackContext();

    const userClosedFeedback = () => {
        if (context === 'elaborated') {
            logAmplitudeEvent('tilbakemelding-rapport', { svar: 'Avbrutt' });
        } else if (context === 'partialno') {
            logAmplitudeEvent('tilbakemelding-nei', { svar: 'Avbrutt' });
        }

        setCloseFeedback(true);
    };

    return (
        <div>
            <Lukknapp bla={true} onClick={userClosedFeedback}>
                Lukk
            </Lukknapp>
        </div>
    );
};

export default CloseFeedbackHandler;
