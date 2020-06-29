import React, { useState } from 'react';

import Tekstomrade from 'nav-frontend-tekstomrade';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import './SendSurvey.less';
import gatherInformation from 'utils/user-information';

const SendSurvey = () => {
    const [email, setEmail] = useState({});

    const handleSubmit = () => {
        console.log(`${email}`);
        
        console.log(gatherInformation(navigator))
    };

    return (
        <div className="send-survey-wrapper">
            <Tekstomrade>
                {`
                Takk for din tilbakemelding\n\nDersom du har tid ønsker vi at du svarer på en undersøkelse om hva vi kan forbedre på våre sider. Undersøkelsen er anonym og tar kun noen minutter
                `}
            </Tekstomrade>

            <Input
                label="Din e-postaddresse"
                onChange={(e) => setEmail(e.target.value)}
            />

            <Hovedknapp inputMode="text" onClick={handleSubmit}>
                Videre
            </Hovedknapp>
        </div>
    );
};

export default SendSurvey;
