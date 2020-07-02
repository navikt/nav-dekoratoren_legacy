import React, { Fragment, useState } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { Knapp } from 'nav-frontend-knapper';
import './Feedback.less';
import { verifyWindowObj } from 'utils/Environment';
import loadHotjarSurvey from 'utils/hotjar-surveys';
const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const Feedback = () => {
    const [buttonsPressed, setButtonsPressed] = useState({
        yesButton: false,
        noButton: false,
    });

    const userPressedNo = () => {
        setButtonsPressed({ yesButton: false, noButton: true });
        loadHotjarSurvey('tps-test');
        logAmplitudeEvent('tilbakemelding', { svar: 'nei' });
    };

    const userPressedYes = () => {
        setButtonsPressed({ yesButton: true, noButton: false });
        logAmplitudeEvent('tilbakemelding', { svar: 'ja' });
    };

    return (
        <div className="feedback-container">
            {!buttonsPressed.yesButton && !buttonsPressed.noButton ? (
                <Fragment>
                    <Ingress>
                        <Tekst id="fant-du-det-du-lette-etter" />
                    </Ingress>
                    <div className="buttons-container">
                        <Knapp className="knapp" onClick={userPressedYes}>
                            Ja
                        </Knapp>
                        <Knapp className="knapp" onClick={userPressedNo}>
                            Nei
                        </Knapp>
                    </div>
                </Fragment>
            ) : null}

            {buttonsPressed.yesButton || buttonsPressed.noButton ? (
                <Ingress>
                    <Tekst id="send-undersokelse-takk" />
                </Ingress>
            ) : null}
        </div>
    );
};

export default Feedback;
