import React from 'react';
import amplitudeTriggers from '../amplitude-triggers';
import { Flatknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { logAmplitudeEvent } from 'utils/amplitude';
import { FeedbackState } from '../Feedback';

interface Props {
    state: FeedbackState;
    avbryt: () => void;
}

const AvbrytKnapp = ({ state, avbryt }: Props) => {

    const userClosedFeedback = () => {
        if (state === 'ja') {
            logAmplitudeEvent(amplitudeTriggers.jaKnapp, {
                svar: 'Avbrutt',
            });
        } else if (state === 'nei') {
            logAmplitudeEvent(amplitudeTriggers.neiKnapp, { svar: 'Avbrutt' });
        }

        avbryt();
    };

    return (
        <Flatknapp mini onClick={userClosedFeedback} htmlType="button">
            <Tekst id="avbryt" />
        </Flatknapp>
    );
};

export default AvbrytKnapp;
