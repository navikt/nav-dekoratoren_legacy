import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { Normaltekst } from 'nav-frontend-typografi';

const SendSurvey = () => {
    const [email, setEmail] = useState(String);
    const [inputFieldErrorMessage, setInputFieldErrorMessage] = useState('');

    const submitEmail = (evt: any) => {
        evt.preventDefault();

        console.log(`Email: ${email}`, validateEmailUsingRegEx(email));

        validateEmailUsingRegEx(email)
            ? sendSurveyToUser()
            : setInputFieldErrorMessage('Epost er ikke gyldig');
    };

    const validateEmailUsingRegEx = (email: string) => {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    };

    const sendSurveyToUser = () => {
        setInputFieldErrorMessage('');

        console.log('Survey was sent to user');
    };

    return (
        <div className="send-survey-wrapper">
            <Normaltekst>
                <Tekst id="send-undersokelse-takk" />
            </Normaltekst>

            <Normaltekst>
                <Tekst id="send-undersokelse-sporsmaal" />
            </Normaltekst>

            <form onSubmit={submitEmail}>
                <Input
                    label="Din e-postaddresse"
                    onChange={(e) => setEmail(e.target.value)}
                    feil={inputFieldErrorMessage}
                />

                <Hovedknapp inputMode="text" htmlType="submit">
                    <Tekst id="send-undersokelse-knapp" />
                </Hovedknapp>
            </form>
        </div>
    );
};

export default SendSurvey;
