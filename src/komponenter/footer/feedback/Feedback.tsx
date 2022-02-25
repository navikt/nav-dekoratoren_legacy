import React, { useState } from 'react';
import { BodyShort } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { Knapp } from 'nav-frontend-knapper';
import AlternativJa from './feedback-questions/AlternativJa';
import AlternativNei from './feedback-questions/AlternativNei';
import { logAmplitudeEvent } from 'utils/amplitude';
import ThankYou from './feedback-thank-you/ThankYou';
import './Feedback.less';

export type FeedbackState = 'lukket' | 'ja' | 'nei' | 'besvart';

const Feedback = () => {
    const [state, setState] = useState<FeedbackState>('lukket');

    const handleNei = () => {
        setState('nei');
        logAmplitudeEvent('tilbakemelding', { kilde: 'footer', svar: 'nei' });
    };

    const handleJa = () => {
        setState('ja');
        logAmplitudeEvent('tilbakemelding', { kilde: 'footer', svar: 'ja' });
    };

    return (
        <>
            <div className="footer-linje" />
            <div className="feedback-container">
                {state === 'lukket' && (
                    <div className="feedback-content" role="group" aria-labelledby="feedback-text">
                        <BodyShort>
                            <label id="feedback-text" className="feedback-text">
                                <Tekst id="fant-du-det-du-lette-etter" />
                            </label>
                        </BodyShort>
                        <div className="buttons-container">
                            <Knapp className="knapp" onClick={handleJa}>
                                <Tekst id="svarknapp-ja" />
                            </Knapp>
                            <Knapp className="knapp" onClick={handleNei}>
                                <Tekst id="svarknapp-nei" />
                            </Knapp>
                        </div>
                    </div>
                )}
                {state === 'ja' && <AlternativJa state={state} settBesvart={() => setState('besvart')} />}
                {}
                {state === 'nei' && <AlternativNei state={state} settBesvart={() => setState('besvart')} />}
                {state === 'besvart' && <ThankYou />}
            </div>
        </>
    );
};

export default Feedback;
