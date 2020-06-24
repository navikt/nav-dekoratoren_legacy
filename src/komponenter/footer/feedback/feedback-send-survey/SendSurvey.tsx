import React, { Fragment } from 'react';

import Tekstomrade from 'nav-frontend-tekstomrade';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import './SendSurvey.less'

const SendSurvey = () => {

    return (

        <div className='send-survey-wrapper'>
            <Tekstomrade>
                {`
                Din tilbakemelding er verdifull for oss\n\nDersom du har tid ønsker vi at du svarer på en undersøkelse om hva vi kan forbedre på våre sider. Undersøkelsen er anonym og tar kun noen minutter
                `}
            </Tekstomrade>

            <Input
                label='Din e-postaddresse'
                name='email-input'
            >

            </Input>

            <Hovedknapp
                inputMode='text'
            >
                Videre
            </Hovedknapp>

        </div>
    );
};

export default SendSurvey;