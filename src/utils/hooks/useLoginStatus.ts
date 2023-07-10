import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
});

export enum LoginState {
    ACTIVE,
    REFRESH,
    EXPIRED,
    UNKNOWN,
}

export const useLoginStatus = () => {
    const [hasFocus, setHasFocus] = useState(false);
    const [loginState, setLoginState] = useState(LoginState.UNKNOWN);
    const { innloggetStatus } = useSelector(stateSelector);

    const secondsToTokenExpires = 0;
    const secondsToSessionExpires = 0;
    const isTokenExpiring = secondsToTokenExpires > 0 && secondsToTokenExpires < 300;
    const isSessionExpiring = secondsToSessionExpires > 0 && secondsToSessionExpires < 300;

    const onVisibilityChange = () => {
        setHasFocus(document.visibilityState === 'visible');
    };

    useEffect(() => {
        // Check API
        setLoginState(LoginState.REFRESH);
    }, [hasFocus]);

    useEffect(() => {
        // Woops! This will add multiple event listeners if hook is used multiple times
        window.addEventListener('visibilitychange', onVisibilityChange);
    }, []);

    return { hasFocus, loginState, loginStatus: innloggetStatus, isTokenExpiring, isSessionExpiring };
};
