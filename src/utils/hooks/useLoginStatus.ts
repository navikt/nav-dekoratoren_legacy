import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducers';
import { hentInnloggingsstatus, fornyInnlogging } from 'store/reducers/innloggingsstatus-duck';
import { getLogOutUrl } from 'utils/login';
import { useLoginDebug } from './useLoginDebug';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    environment: state.environment,
});

let timeoutId: NodeJS.Timeout | null = null;

export const useLoginStatus = () => {
    const dispatch = useDispatch();
    const [hasFocus, setHasFocus] = useState(false);
    const { innloggetStatus, environment } = useSelector(stateSelector);
    const [isTokenExpiring, setIsTokenExpiring] = useState<boolean | null>(null);
    const [isSessionExpiring, setIsSessionExpiring] = useState<boolean | null>(null);
    useLoginDebug();

    // Need to create a ref in order for the setTimeout function to
    // get access to the updated value of innloggetStatus.
    const innloggetStatusRef = useRef(innloggetStatus);
    innloggetStatusRef.current = innloggetStatus;

    const getExpirationInSeconds = ({ session, token }: { session: string | null; token: string | null }) => {
        if (!session || !token) return { secondsToTokenExpires: null, secondsToSessionExpires: null };

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

        setIsTokenExpiring(secondsToTokenExpires < 60 * 5);
        setIsSessionExpiring(secondsToSessionExpires < 60 * 5);

        if (secondsToTokenExpires < 0 || secondsToSessionExpires < 0) {
            window.location.href = getLogOutUrl(environment);
        }
    };

    const refreshTokenHandler = () => {
        fornyInnlogging(environment)(dispatch);
    };

    const logoutHandler = () => {
        window.location.href = getLogOutUrl(environment);
    };

    const onVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            checkLoginAndRepeat();
            hentInnloggingsstatus(environment)(dispatch);
        }
        setHasFocus(document.visibilityState === 'visible');
    };

    useEffect(() => {
        checkLoginAndRepeat();
        window.addEventListener('visibilitychange', onVisibilityChange);
    }, []);

    return { hasFocus, isTokenExpiring, isSessionExpiring, refreshTokenHandler, logoutHandler };
};
