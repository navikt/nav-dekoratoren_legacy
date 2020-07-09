import React, { Fragment, useState } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import './Feedback.less';
import { verifyWindowObj } from 'utils/Environment';
import loadHotjarSurvey from 'utils/hotjar-surveys';
import PartialNo from './feedback-partialno/PartialNo';
import SendSurvey from './feedback-send-survey/SendSurvey';
import Elaborated from './feedback-elaborated/Elaborated';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const Feedback = () => {
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
        logAmplitudeEvent('tilbakemelding', { svar: 'nei' });
    };

    const userPressedYes = () => {
        setButtonsPressed({
            yesButton: true,
            noButton: false,
            reportButton: false,
        });
        logAmplitudeEvent('tilbakemelding', { svar: 'ja' });
    };

    const userPressedReport = () => {
        setButtonsPressed({
            yesButton: false,
            noButton: false,
            reportButton: true,
        });
        //logToAmplitude
    };

    return (
        <div className="feedback-container">
            {!buttonsPressed.yesButton && !buttonsPressed.noButton && !buttonsPressed.reportButton ? (
                <Fragment>
                    <Ingress>
                        <Tekst id="fant-du-det-du-lette-etter" />
                    </Ingress>
                    <div className="buttons-container">
                        <Knapp className="knapp" onClick={userPressedYes}>
                            <Tekst id="fant-det-du-lette-etter-svarknapp-ja" />
                        </Knapp>
                        <Knapp className="knapp" onClick={userPressedNo}>
                            <Tekst id="fant-det-du-lette-etter-svarknapp-nei" />
                        </Knapp>
                    </div>
                    <Knapp onClick={userPressedReport}>
                        Rapporter feil eller mangler
                    </Knapp>
                </Fragment>
            ) : null}

            {buttonsPressed.yesButton ? <SendSurvey /> : null}
            {buttonsPressed.noButton ? <PartialNo /> : null}
            {buttonsPressed.reportButton ? <Elaborated /> : null}
        </div>
    );
};

export default Feedback;
