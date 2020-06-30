import React, { useState } from 'react';

import Tekstomrade from 'nav-frontend-tekstomrade';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import './SendSurvey.less';
import gatherInformation from 'utils/user-information';

const SendSurvey = () => {
    const [email, setEmail] = useState({});

    const sendSurveyToUser = (evt: any) => {
        evt.preventDefault()

        console.log(`Email: ${email}`);
    };

    return (
        <div className="send-survey-wrapper">
            <Tekstomrade>
                {`
                Takk for din tilbakemelding\n\nDersom du har tid ønsker vi at du svarer på en undersøkelse om hva vi kan forbedre på våre sider. Undersøkelsen er anonym og tar kun noen minutter
                `}
            </Tekstomrade>

            <form onSubmit={sendSurveyToUser}>
                <Input
                    label="Din e-postaddresse"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Hovedknapp inputMode="text" htmlType="submit">
                    Send
                </Hovedknapp>
            </form>
        </div>
    );
};

export default SendSurvey;
