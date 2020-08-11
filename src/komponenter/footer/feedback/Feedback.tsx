import React, { Fragment, useState, useEffect } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { Knapp } from 'nav-frontend-knapper';
import './Feedback.less';
import { verifyWindowObj } from 'utils/Environment';
import PartialNo from './feedback-partialno/PartialNo';
import ThankYou from './feedback-thank-you/ThankYou';
import { CloseFeedbackContext } from './common/CloseFeedbackContext';
import amplitudeTriggers from 'utils/amplitude-triggers';
import { LenkeMedGA } from '../../common/lenke-med-ga/LenkeMedGA';
import { AppState } from '../../../store/reducers';
import { useSelector } from 'react-redux';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const stateSelector = (state: AppState) => ({
    environment: state.environment,
});

const Feedback = () => {
    const { environment } = useSelector(stateSelector);
    const { XP_BASE_URL } = environment;
    const [closeFeedback, setCloseFeedback] = useState(false);

    const [buttonsPressed, setButtonsPressed] = useState({
        yesButton: false,
        noButton: false,
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

    useEffect(() => {
        if (closeFeedback) {
            setButtonsPressed({
                yesButton: false,
                noButton: false,
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
                    {!buttonsPressed.yesButton && !buttonsPressed.noButton ? (
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
                            <LenkeMedGA
                                href={`${XP_BASE_URL}/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler`}
                            >
                                <Tekst id="rapporter-om-feil-mangler" />
                            </LenkeMedGA>
                        </Fragment>
                    ) : null}
                    {buttonsPressed.yesButton && (
                        <ThankYou showFeedbackUsage={false} />
                    )}
                    {buttonsPressed.noButton && <PartialNo />}
                </div>
            </Fragment>
        </CloseFeedbackContext.Provider>
    );
};

export default Feedback;
