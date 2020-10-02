import React from 'react';
import amplitudeTriggers from '../amplitude-triggers';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { logAmplitudeEvent } from 'utils/amplitude';
import { FeedbackState } from '../Feedback';
import './Alternativ.less';

interface Props {
    state: FeedbackState;
    avbryt: () => void;
}

const KnappeRekke = ({ state, avbryt }: Props) => {

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
        <div className="knapper">
            <Hovedknapp
                htmlType="submit"
                className="send-inn"
            >
                <Tekst id="send-inn-tilbakemelding" />
            </Hovedknapp>
            <Flatknapp mini onClick={userClosedFeedback} htmlType="button">
                <Tekst id="avbryt" />
            </Flatknapp>
        </div>
    );
};

export default KnappeRekke;
