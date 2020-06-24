import React, { Fragment } from 'react';
import { Knapp } from 'nav-frontend-knapper-style';
import './Feedback.less';
import Elaborated from './feedback-elaborated/Elaborated';
import SendSurvey from './feedback-send-survey/SendSurvey';

const Feedback = () => {
    return (
        <Fragment>
            
            <SendSurvey />
        </Fragment>
    );
};

export default Feedback;
