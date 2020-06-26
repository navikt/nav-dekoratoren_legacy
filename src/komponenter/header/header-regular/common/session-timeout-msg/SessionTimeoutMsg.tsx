import React from 'react';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import './SessionTimeoutMsg.less';
import Tekst from 'tekster/finn-tekst';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';

const cookieName = 'selvbetjening-idtoken';

type IdToken = {
    auth_time: string;
    exp: string;
};

export const SessionTimeoutMsg = () => {
    const { innlogget } = useSelector((state: AppState) => ({
        innlogget: state.innloggingsstatus.data.authenticated,
    }));
    const [cookies] = useCookies([cookieName]);
    const [timeRemaining, setTimeRemaining] = useState(-1);

    useEffect(() => {
        if (!innlogget) {
            return;
        }

        const idToken = cookies[cookieName];
        if (!idToken) {
            return;
        }

        const decodedToken = jwtDecode(idToken) as IdToken;
        const expires = Number(decodedToken?.exp);
        console.log(expires);
        if (!expires) {
            return;
        }

        const countdown = () => {
            const remainingSec = Math.max(expires - Date.now() / 1000, 0);
            setTimeRemaining(Math.floor(remainingSec));
        };

        const timer = setInterval(countdown, 1000);
        return () => clearInterval(timer);
    }, [innlogget]);

    return timeRemaining >= 0 && innlogget ? (
        <div className={'session-timeout-msg-wrapper'}>
            <AlertStripeInfo className={'session-timeout-msg'}>
                <Tekst id={'session-timeout'} />
                {timeRemaining}
            </AlertStripeInfo>
        </div>
    ) : null;
};
