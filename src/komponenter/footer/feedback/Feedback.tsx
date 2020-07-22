import React, { Fragment, useState, useEffect } from 'react';
import { Ingress, Element } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { Knapp } from 'nav-frontend-knapper';
import './Feedback.less';
import { verifyWindowObj } from 'utils/Environment';
import PartialNo from './feedback-partialno/PartialNo';
import ThankYou from './feedback-thank-you/ThankYou';
import Elaborated from './feedback-elaborated/Elaborated';
import { CloseFeedbackContext } from './common/CloseFeedbackContext';
import amplitudeTriggers from 'utils/amplitude-triggers';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const Feedback = () => {
    const [closeFeedback, setCloseFeedback] = useState(false);

    const [buttonsPressed, setButtonsPressed] = useState({
        yesButton: false,
        noButton: false,
        reportButton: false,
    });

    const userPressedNo = () => {
        setButtonsPressed({
            yesButton: false,
            noButton: true,
            reportButton: false,
        });
        logAmplitudeEvent(amplitudeTriggers.felles, { svar: 'nei' });
    };

    const userPressedYes = () => {
        setButtonsPressed({
            yesButton: true,
            noButton: false,
            reportButton: false,
        });
        logAmplitudeEvent(amplitudeTriggers.felles, { svar: 'ja' });
    };

    const userPressedReport = () => {
        setButtonsPressed({
            yesButton: false,
            noButton: false,
            reportButton: true,
        });
        logAmplitudeEvent(amplitudeTriggers.felles, {
            svar: 'feil eller mangel',
        });
    };

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
                        <Fragment>
                            <div className="qa-container">
                                <Ingress>
                                    <Tekst id="fant-du-det-du-lette-etter" />
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
                            </div>
                            <Element
                                className="underline"
                                onClick={userPressedReport}
                            >
                                Rapporter feil eller mangler
                            </Element>
                        </Fragment>
                    ) : null}
                    {buttonsPressed.yesButton ? <ThankYou /> : null}
                    {buttonsPressed.noButton ? <PartialNo /> : null}
                    {buttonsPressed.reportButton ? <Elaborated /> : null}
                </div>
            </Fragment>
        </CloseFeedbackContext.Provider>
    );
};

export default Feedback;
