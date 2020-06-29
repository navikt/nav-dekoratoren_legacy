import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Tekst from 'tekster/finn-tekst';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { LukkKnapp } from 'komponenter/common/lukk-knapp/LukkKnapp';
import BEMHelper from 'utils/bem';
import './SessionTimeoutMsg.less';

const warningThresholdSeconds = 3600;

const secondsToMinSecString = (seconds: number) => {
    const secMod = seconds % 60;
    const mins = (seconds - secMod) / 60;
    return `${mins ? `${mins}m` : ''} ${secMod}s`;
};

export const SessionTimeoutMsg = () => {
    const { authenticated, expireTime } = useSelector(
        (state: AppState) => state.innloggingsstatus.data
    );
    const [secRemaining, setSecRemaining] = useState(-1);
    const [isClosed, setIsClosed] = useState(false);

    const cls = BEMHelper('session-timeout-msg');
    const showWarning =
        authenticated &&
        !isClosed &&
        secRemaining >= 0 &&
        secRemaining < warningThresholdSeconds;

    useEffect(() => {
        if (!authenticated) {
            return;
        }

        const expireTestVar = expireTime || Math.floor(Date.now() / 1000 + 120);

        const countdown = () => {
            const remaining = Math.floor(
                Math.max(expireTestVar - Date.now() / 1000, 0)
            );
            setSecRemaining(remaining);
        };

        const timer = setInterval(countdown, 1000);
        return () => clearInterval(timer);
    }, [authenticated, expireTime]);

    return (
        <div
            className={`${cls.className}${
                showWarning ? ` ${cls.modifier('visible')}` : ''
            }`}
        >
            <AlertStripeInfo>
                <div className={cls.element('content')}>
                    <span>
                        {secRemaining > 0 ? (
                            <>
                                <Tekst id={'session-countdown'} />
                                {secondsToMinSecString(secRemaining)}
                            </>
                        ) : (
                            <Tekst id={'session-timeout'} />
                        )}
                    </span>
                    <LukkKnapp onClick={() => setIsClosed(true)} />
                </div>
            </AlertStripeInfo>
        </div>
    );
};
