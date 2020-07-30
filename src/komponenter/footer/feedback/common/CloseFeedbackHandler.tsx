import React, { useContext } from 'react';
import { CloseFeedbackContext } from './CloseFeedbackContext';
import { verifyWindowObj } from 'utils/Environment';
import amplitudeTriggers from 'utils/amplitude-triggers';
import { Knapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
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
            logAmplitudeEvent(amplitudeTriggers.rapporterKnapp, {
                svar: 'Avbrutt',
            });
        } else if (context === 'partialno') {
            logAmplitudeEvent(amplitudeTriggers.neiKnapp, { svar: 'Avbrutt' });
        }

        setCloseFeedback(true);
    };

    return (
        <div>
            <Knapp onClick={userClosedFeedback} htmlType="button">
                <Tekst id="avbryt" />
            </Knapp>
        </div>
    );
};

export default CloseFeedbackHandler;
