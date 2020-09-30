import React, { useState, useEffect } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { Knapp } from 'nav-frontend-knapper';
import AlternativJa from './feedback-questions/AlternativJa';
import AlternativNei from './feedback-questions/AlternativNei';
import amplitudeTriggers from './amplitude-triggers';
import { logAmplitudeEvent } from 'utils/amplitude';
import './Feedback.less';
import Thankyou from './feedback-thank-you/ThankYou';

export type FeedbackState = 'lukket' | 'ja' | 'nei' | 'besvart';

const Feedback = () => {
    const [state, setState] = useState<FeedbackState>('lukket');

    const handleNei = () => {
        setState('nei');
        logAmplitudeEvent(amplitudeTriggers.felles, { svar: 'nei' });
    };

    const handleJa = () => {
        setState('ja');
        logAmplitudeEvent(amplitudeTriggers.felles, { svar: 'ja' });
    };

    return (
        <>
            <div className="footer-linje" />
            <div className="feedback-container">
                {state === 'lukket' && (
                    <div
                        className="feedback-content"
                        role="group"
                        aria-labelledby="feedback-text"
                    >
                        <Ingress>
                            <label id="feedback-text">
                                <Tekst id="fant-du-det-du-lette-etter" />
                            </label>
                        </Ingress>
                        <div className="buttons-container">
                            <Knapp
                                className="knapp"
                                onClick={handleJa}
                            >
                                <Tekst id="fant-det-du-lette-etter-svarknapp-ja" />
                            </Knapp>
                            <Knapp
                                className="knapp"
                                onClick={handleNei}
                            >
                                <Tekst id="fant-det-du-lette-etter-svarknapp-nei" />
                            </Knapp>
                        </div>
                    </div>
                )}
                {state === 'ja' &&
                    <AlternativJa
                        state={state}
                        avbryt={() => setState('lukket')}
                        settBesvart={() => setState('besvart')} />
                }
                {state === 'nei' &&
                    <AlternativNei
                        state={state}
                        avbryt={() => setState('lukket')}
                        settBesvart={() => setState('besvart')} />
                }
                {state === 'besvart' && <Thankyou />}
            </div>
        </>
    );
};

export default Feedback;
