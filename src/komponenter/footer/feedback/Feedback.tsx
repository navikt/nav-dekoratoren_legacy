import React, { useState } from 'react';
import { Button, Ingress } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import ThankYou from './feedback-thank-you/ThankYou';
import style from './Feedback.module.scss';

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
            <div className={style.footerLinje} />
            <div className={style.feedbackContainer}>
                {state === 'lukket' ? (
                    <div className={style.feedbackContent} role="group" aria-labelledby="feedback-text">
                        <Ingress>
                            <label id="feedback-text">
                                <Tekst id="fant-du-det-du-lette-etter" />
                            </label>
                        </Ingress>
                        <div className={style.buttonsContainer}>
                            <Button variant="secondary" className={style.knapp} onClick={handleJa}>
                                <Tekst id="svarknapp-ja" />
                            </Button>
                            <Button variant="secondary" className={style.knapp} onClick={handleNei}>
                                <Tekst id="svarknapp-nei" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <ThankYou />
                )}
            </div>
        </>
    );
};

export default Feedback;
