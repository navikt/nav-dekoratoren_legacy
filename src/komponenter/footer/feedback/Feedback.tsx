import React, { Fragment, useState, useEffect } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { Knapp } from 'nav-frontend-knapper';
import AlternativNei from './feedback-alternativ-nei/AlternativNei';
import ThankYou from './feedback-thank-you/ThankYou';
import AlternativFeilMangler from './feedback-alternativ-feil-mangler/AlternativFeilMangler';
import { CloseFeedbackContext } from './common/CloseFeedbackContext';
import amplitudeTriggers from 'utils/amplitude-triggers';
import { logAmplitudeEvent } from 'utils/amplitude';
import './Feedback.less';

const Feedback = () => {
    const [closeFeedback, setCloseFeedback] = useState(false);
    const [buttonsPressed, setButtonsPressed] = useState({
        yesButton: false,
        noButton: false,
        reportButton: false,
    });

    const userPressedNo = () => {
        setButtonsPressed({
            ...buttonsPressed,
            noButton: true,
        });
        logAmplitudeEvent(amplitudeTriggers.felles, { svar: 'nei' });
    };

    const userPressedYes = () => {
        setButtonsPressed({
            ...buttonsPressed,
            yesButton: true,
        });
        logAmplitudeEvent(amplitudeTriggers.felles, { svar: 'ja' });
    };

    const userPressedReport = () => {
        setButtonsPressed({
            ...buttonsPressed,
            reportButton: true,
        });
        logAmplitudeEvent(amplitudeTriggers.felles, {
            svar: 'feil eller mangel',
        });
    };

    /*
    Resetter komponentet til utgangspunktet dersom avbryt i et komponent lenger ned i treet klikkes
    */
    useEffect(() => {
        if (closeFeedback) {
            setButtonsPressed({
                yesButton: false,
                noButton: false,
                reportButton: false,
            });

            setCloseFeedback(false);
        }
    }, [closeFeedback]);

    return (
        <CloseFeedbackContext.Provider
            value={{ closeFeedback, setCloseFeedback }}
        >
            <Fragment>
                <div className="footer-linje" />
                <div className="feedback-container">
                    {!buttonsPressed.yesButton &&
                    !buttonsPressed.noButton &&
                    !buttonsPressed.reportButton ? (
                        <div
                            className="qa-container"
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
                                    onClick={userPressedYes}
                                >
                                    <Tekst id="fant-det-du-lette-etter-svarknapp-ja" />
                                </Knapp>
                                <Knapp
                                    className="knapp"
                                    onClick={userPressedNo}
                                >
                                    <Tekst id="fant-det-du-lette-etter-svarknapp-nei" />
                                </Knapp>
                            </div>
                            <button
                                className="lenke"
                                onClick={userPressedReport}
                            >
                                <Tekst id="rapporter-om-feil-mangler" />
                            </button>
                        </div>
                    ) : null}
                    {buttonsPressed.yesButton && (
                        <ThankYou showFeedbackUsage={false} />
                    )}
                    {buttonsPressed.noButton && <AlternativNei />}
                    {buttonsPressed.reportButton && <AlternativFeilMangler />}
                </div>
            </Fragment>
        </CloseFeedbackContext.Provider>
    );
};

export default Feedback;
