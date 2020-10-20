import React, { useContext } from 'react';
import { CloseFeedbackContext } from './CloseFeedbackContext';
import amplitudeTriggers from 'utils/amplitude-triggers';
import { Knapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { logAmplitudeEvent } from 'utils/amplitude';

// Disable eslint siden denne fila snart blir fjernet
/*eslint-disable*/

interface Props {
    context: string;
}

const CloseFeedbackHandler: React.FC<Props> = ({ context }) => {
    const closeFeedbackContext = () => useContext(CloseFeedbackContext)!;

    const { setCloseFeedback } = closeFeedbackContext();
    const userClosedFeedback = () => {
        if (context === 'alternativ-feil-mangler') {
            logAmplitudeEvent(amplitudeTriggers.rapporterKnapp, {
                svar: 'Avbrutt',
            });
        } else if (context === 'alternativ-nei') {
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
