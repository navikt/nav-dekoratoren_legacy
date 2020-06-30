import React, { useState, Fragment } from 'react';

import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import './SendSurvey.less';
import Tekst from 'tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';

const SendSurvey = () => {
    const [email, setEmail] = useState({});

    const sendSurveyToUser = (evt: any) => {
        evt.preventDefault();

        console.log(`Email: ${email}`);
    };

    return (
        <div className="send-survey-wrapper">
            <Normaltekst>
                <Tekst id="send-undersokelse-takk" />
            </Normaltekst>

            <Normaltekst>
                <Tekst id="send-undersokelse-sporsmaal" />
            </Normaltekst>

            <form onSubmit={sendSurveyToUser}>
                <Input
                    label="Din e-postaddresse"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Hovedknapp inputMode="text" htmlType="submit">
                    <Tekst id="send-undersokelse-knapp" />
                </Hovedknapp>
            </form>
        </div>
    );
};

export default SendSurvey;
