import { get } from 'http';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducers';
import { hentInnloggingsstatus } from 'store/reducers/innloggingsstatus-duck';
import { getLogOutUrl } from 'utils/login';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    environment: state.environment,
});

export const useLoginStatus = () => {
    const [hasFocus, setHasFocus] = useState(false);
    const { innloggetStatus, environment } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const getExpirationInSeconds = ({ session, token }: { session: string | null; token: string | null }) => {
        if (!session || !token) return { secondsToTokenExpires: 0, secondsToSessionExpires: 0 };

        const now = new Date();
        const sessionExpires = new Date(session);
        const tokenExpires = new Date(token);

        return {
            secondsToTokenExpires: Math.round((tokenExpires.getTime() - now.getTime()) / 1000),
            secondsToSessionExpires: Math.round((sessionExpires.getTime() - now.getTime()) / 1000),
        };
    };

    const { secondsToSessionExpires, secondsToTokenExpires } = getExpirationInSeconds({
        session: innloggetStatus.session.endsAt,
        token: innloggetStatus.token.endsAt,
    });

    const isTokenExpiring = secondsToTokenExpires < 60 * 5;
    const isSessionExpiring = secondsToSessionExpires < 60 * 5;

    const refreshTokenHandler = () => {
        console.log('refreshTokenHandler');
    };

    const logoutHandler = () => {
        window.location.href = getLogOutUrl(environment);
    };

    const onVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            hentInnloggingsstatus(environment)(dispatch);
        }
        setHasFocus(document.visibilityState === 'visible');
    };

    useEffect(() => {
        window.addEventListener('visibilitychange', onVisibilityChange);
    }, []);

    return { hasFocus, isTokenExpiring, isSessionExpiring, refreshTokenHandler, logoutHandler };
};
