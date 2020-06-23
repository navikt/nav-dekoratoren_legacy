import React, { Fragment } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';

import './Feedback.less';

const Feedback = () => {
    return (
       <div className="feedback-content">
           <div className="tekst">
               <Element> Fant du det du lette etter? </Element>
           </div>
           <div className="ja-knapp">
               <Knapp> Ja </Knapp>
           </div>
           <div className="nei-knapp">
               <Knapp> Nei </Knapp>
           </div>
       </div>

    );
};

export default Feedback;