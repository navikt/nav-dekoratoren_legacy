import React from 'react';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Tekst from 'tekster/finn-tekst';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { LukkKnapp } from 'komponenter/common/lukk-knapp/LukkKnapp';
import BEMHelper from 'utils/bem';
import './SessionTimeoutMsg.less';

const cookieName = 'selvbetjening-idtoken';
const warningThresholdSeconds = 3600;

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
    const { authenticated } = useSelector(
        (state: AppState) => state.innloggingsstatus.data
    );
    const [secRemaining, setSecRemaining] = useState(0);
    const [isClosed, setIsClosed] = useState(false);
    const [cookies] = useCookies([cookieName]);
    const cls = BEMHelper('session-timeout-msg');

    const idToken = cookies[cookieName];
    const showWarning =
        authenticated &&
        !isClosed &&
        secRemaining > 0 &&
        secRemaining < warningThresholdSeconds;

    useEffect(() => {
        if (!authenticated || !idToken) {
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
    }, [authenticated, idToken]);

    return (
        <div
            className={`${cls.className}${
                showWarning ? ` ${cls.modifier('visible')}` : ''
            }`}
        >
            <AlertStripeInfo>
                <div className={cls.element('content')}>
                    <span>
                        <Tekst id={'session-timeout'} />
                        {secondsToMinSecString(secRemaining)}
                    </span>
                    <LukkKnapp onClick={() => setIsClosed(true)} />
                </div>
            </AlertStripeInfo>
        </div>
    );
};
