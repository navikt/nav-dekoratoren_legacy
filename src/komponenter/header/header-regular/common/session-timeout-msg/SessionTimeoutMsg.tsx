import React from 'react';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Tekst from 'tekster/finn-tekst';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import './SessionTimeoutMsg.less';
import { LukkKnapp } from 'komponenter/common/lukk-knapp/LukkKnapp';

const cookieName = 'selvbetjening-idtoken';

const secondsToMinSecString = (seconds: number) => {
    const secMod = Math.floor(seconds % 60);
    const mins = (seconds - secMod) / 60;

    return `${mins}m ${secMod}s`;
};

type IdToken = {
    auth_time: string;
    exp: string;
};

export const SessionTimeoutMsg = () => {
    const { innlogget } = useSelector((state: AppState) => ({
        innlogget: state.innloggingsstatus.data.authenticated,
    }));
    const [secRemaining, setSecRemaining] = useState(0);
    const [isClosed, setIsClosed] = useState(false);
    const [cookies] = useCookies([cookieName]);
    const idToken = cookies[cookieName];

    useEffect(() => {
        if (!innlogget || !idToken) {
            return;
        }

        const decodedToken = jwtDecode(idToken) as IdToken;
        const expires = Number(decodedToken?.exp);
        if (!expires) {
            return;
        }

        const countdown = () => {
            const remaining = Math.floor(
                Math.max(expires - Date.now() / 1000, 0)
            );
            setSecRemaining(remaining);
        };

        const timer = setInterval(countdown, 1000);
        return () => clearInterval(timer);
    }, [innlogget, idToken]);

    return secRemaining > 0 && innlogget && !isClosed ? (
        <div className={'session-timeout-msg-wrapper'}>
            <AlertStripeInfo className={'session-timeout-msg'}>
                <Tekst id={'session-timeout'} />
                {secondsToMinSecString(secRemaining)}
                <LukkKnapp onClick={() => setIsClosed(true)} />
            </AlertStripeInfo>
        </div>
    ) : null;
};
