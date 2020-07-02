import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import './Feedback.less';
import './hotjar-surveys'
import loadSurvey from './hotjar-surveys';
import { verifyWindowObj } from 'utils/Environment';
const { logAmplitudeEvent } = verifyWindowObj() ? require("utils/amplitude") : () => null;


export const Feedback = () => {
    const [trykketJaKnapp, setTrykketJaKnapp] = useState(false);
    const userPressedYes = () => setTrykketJaKnapp(true);

    const [trykketNeiKnapp, setTrykketNeiKnapp] = useState(false);
    const userPressedNo = () => {
        setTrykketNeiKnapp(true);
        loadSurvey();
        logAmplitudeEvent('tilbakemelding', {'svar': 'JA'})
        
    }
    
    const [trykketDelvisKnapp, setTrykketDelvisKnapp] = useState(false);
    const userPressedPartial = () => setTrykketDelvisKnapp(true);

    const [trykketRapporterKnapp, setTrykketRapporterKnapp] = useState(false);
    const userPressedReport = () => setTrykketRapporterKnapp(true);
    
    const TrykketIngenKnapper = () => (
        <div className="feedback-container">
            <Undertittel className="feedback_tekst">
                {' '}
                Fant du det du lette etter?{' '}
            </Undertittel>
            <div className="knapp-container">
                <JaKnapp />
                <DelvisKnapp />
                <NeiKnapp />
            </div>
            
        </div>
    );

    const JaKnapp = () => (
        <div className="knappen">
            <Knapp onClick={userPressedYes}>Ja</Knapp>
        </div>
    );

    const TrykketJaKnapp = () => (
        <div id="trykketJaKnapp" className="svar-container"></div>
    );

    const DelvisKnapp = () => (
        <div className="knappen">
            <Knapp onClick={userPressedPartial}>Delvis</Knapp>
        </div>
    );

    const TrykketDelvisKnapp = () => (
        <div id="trykketDelvisKnapp" className="svar-container"></div>
    );

    const NeiKnapp = () => (
        <div className="knappen">
            <Knapp onClick={userPressedNo}>Nei</Knapp>
        </div>
    );

    const TrykketNeiKnapp = () => (
        <div id="trykketNeiKnapp" className="svar-container"></div>
    );

    const TrykketRapporterKnapp = () => (
        <div id="trykketRapporterKnapp" className="svar-container"></div>
    );

    return (
        <div>
            {!trykketJaKnapp &&
            !trykketNeiKnapp &&
            !trykketDelvisKnapp &&
            !trykketRapporterKnapp ? (
                <TrykketIngenKnapper />
            ) : null}
            {trykketJaKnapp ? <TrykketJaKnapp /> : null}
            {trykketNeiKnapp ? <TrykketNeiKnapp /> : null}
            {trykketDelvisKnapp ? <TrykketDelvisKnapp /> : null}
            {trykketRapporterKnapp ? <TrykketRapporterKnapp /> : null}
        </div>
    );
};

export default Feedback;
