import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import './Feedback.less';
import Elaborated from './feedback-elaborated/Elaborated';
import PartialNo from './feedback-partialno/PartialNo';
import SendSurvey from './feedback-send-survey/SendSurvey';

export const Feedback = () => {

    const [trykketJaKnapp, setTrykketJaKnapp] = useState(false);
    const userPressedYes = () => setTrykketJaKnapp(true);

    const [trykketNeiKnapp, setTrykketNeiKnapp] = useState(false);
    const userPressedNo = () => setTrykketNeiKnapp(true);

    const [trykketDelvisKnapp, setTrykketDelvisKnapp] = useState(false);
    const userPressedPartial = () => setTrykketDelvisKnapp(true);

    const [trykketRapporterKnapp, setTrykketRapporterKnapp] = useState(false);
    const userPressedReport = () => setTrykketRapporterKnapp(true);

    const TrykketIngenKnapper = () => (
        <div className="feedback-container">
            <Undertittel className="feedback_tekst" > Fant du det du lette etter? </Undertittel>
            <div className="knapp-container">
                <JaKnapp/>
                <DelvisKnapp/>
                <NeiKnapp/>   
            </div>
            <RapporterKnapp/>
        </div>
    )

    const JaKnapp = () => (
        <div className="knappen">
        <Knapp onClick={userPressedYes}>
            Ja
        </Knapp>    
        </div>
    );

    const TrykketJaKnapp = () => (
        <div id="trykketJaKnapp" className="svar-container" >
            <SendSurvey/>
        </div>
    );

    const DelvisKnapp = () => (
        <div className="knappen">
        <Knapp onClick={userPressedPartial}>
            Delvis
        </Knapp>
        </div>
    );

    const TrykketDelvisKnapp = () => (
        <div id="trykketDelvisKnapp" className="svar-container">
            <PartialNo/>
        </div>
    );

    const NeiKnapp = () => (
        <div className="knappen">
        <Knapp onClick={userPressedNo}>
            Nei
        </Knapp>    
        </div> 
    );

    const TrykketNeiKnapp = () => (
        <div id="trykketNeiKnapp" className="svar-container" >
            <PartialNo/>
        </div>
    );

    const RapporterKnapp = () => (
        <div className="rapporter-knappen">
            <Knapp onClick={userPressedReport}>
                Rapporter feil eller mangler
            </Knapp>
        </div>
    );

    const TrykketRapporterKnapp = () => (
        <div id="trykketRapporterKnapp" className="svar-container">
            <Elaborated />
        </div>
    )

    return (
        <div>
            { !trykketJaKnapp && !trykketNeiKnapp && !trykketDelvisKnapp && !trykketRapporterKnapp ? <TrykketIngenKnapper/> : null}
            { trykketJaKnapp ? <TrykketJaKnapp /> : null } 
            { trykketNeiKnapp ? <TrykketNeiKnapp /> : null }
            { trykketDelvisKnapp ? <TrykketDelvisKnapp /> : null }
            { trykketRapporterKnapp ? <TrykketRapporterKnapp /> : null }
        </div>
    )
}

export default Feedback;