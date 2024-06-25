import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducers';
import { hentInnloggingsstatus, fornyInnlogging } from 'store/reducers/innloggingsstatus-duck';
import { getLogOutUrl, getLoginUrl } from 'utils/login';
import { useLoginDebug } from './useLoginDebug';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    environment: state.environment,
    arbeidsflate: state.arbeidsflate.status,
});

let timeoutId: NodeJS.Timeout | null = null;

let didLogExpiry = false;

export const useLoginStatus = () => {
    const dispatch = useDispatch();
    const { innloggetStatus, environment, arbeidsflate } = useSelector(stateSelector);
    const [isTokenExpiring, setIsTokenExpiring] = useState<boolean | null>(null);
    const [isSessionExpiring, setIsSessionExpiring] = useState<boolean | null>(null);
    const [hasAuthError, setHasAuthError] = useState<boolean>(false);
    const [secondsToSessionExpires, setSecondsToSessionExpires] = useState<number>(0);
    useLoginDebug();

    // Need to create a ref in order for the setTimeout function to
    // get access to the updated value of innloggetStatus.
    const innloggetStatusRef = useRef(innloggetStatus);
    innloggetStatusRef.current = innloggetStatus;

    useEffect(() => {
        window.addEventListener('INVALID_SESSION', () => {
            setHasAuthError(true);
        });
    }, []);

    const getExpirationInSeconds = ({ session, token }: { session: string | null; token: string | null }) => {
        if (!session || !token) {
            return { secondsToTokenExpires: null, secondsToSessionExpires: null };
        }

        const now = new Date();
        const sessionExpires = new Date(session);
        const tokenExpires = new Date(token);

        return {
            secondsToTokenExpires: Math.round((tokenExpires.getTime() - now.getTime()) / 1000),
            secondsToSessionExpires: Math.round((sessionExpires.getTime() - now.getTime()) / 1000),
        };
    };

    const checkLoginAndRepeat = () => {
        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            checkLoginAndRepeat();
        }, 1000);

        const _innloggetStatus = innloggetStatusRef.current;
        const { secondsToTokenExpires, secondsToSessionExpires } = getExpirationInSeconds({
            session: _innloggetStatus.session.endsAt,
            token: _innloggetStatus.token.endsAt,
        });

        if (secondsToSessionExpires === null || secondsToTokenExpires === null) {
            return;
        }

        if (secondsToTokenExpires <= 0 || secondsToSessionExpires <= 0) {
            window.location.href = getLogOutUrl(environment);
        }

        const _isTokenExpiring = _innloggetStatus.authenticated && secondsToTokenExpires < 60 * 5;
        const _isSessionExpiring = secondsToSessionExpires < 60 * 10;

        if ((_isTokenExpiring || _isSessionExpiring) && !didLogExpiry) {
            console.error(
                `Session is timing out - Now: ${new Date().toISOString()} - Session: ${secondsToSessionExpires} / ${
                    _innloggetStatus.session.endsAt
                } - Token: ${secondsToTokenExpires} / ${_innloggetStatus.token.endsAt}`
            );
            didLogExpiry = true;
        }

        setIsTokenExpiring(_isTokenExpiring);
        setIsSessionExpiring(_isSessionExpiring);
        setSecondsToSessionExpires(secondsToSessionExpires);
    };

    const refreshTokenHandler = () => {
        fornyInnlogging(environment)(dispatch);
    };

    const logoutHandler = () => {
        window.location.href = getLogOutUrl(environment);
    };

    const loginHandler = () => {
        window.location.href = getLoginUrl(environment, arbeidsflate);
    };

    const onWindowVisibility = () => {
        if (document.visibilityState === 'visible') {
            checkLoginAndRepeat();
            hentInnloggingsstatus(environment)(dispatch);
        }
    };

    useEffect(() => {
        checkLoginAndRepeat();
        window.addEventListener('visibilitychange', onWindowVisibility);
        window.addEventListener('focus', onWindowVisibility);

        return () => {
            window.removeEventListener('visibilitychange', onWindowVisibility);
            window.removeEventListener('focus', onWindowVisibility);
        };
    }, []);

    return {
        isTokenExpiring,
        isSessionExpiring,
        refreshTokenHandler,
        logoutHandler,
        loginHandler,
        secondsToSessionExpires,
        hasAuthError,
    };
};
