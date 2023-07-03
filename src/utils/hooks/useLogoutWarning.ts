import { useEffect, useState } from 'react';

export enum LoginState {
    ACTIVE,
    REFRESH,
    EXPIRED,
    UNKNOWN,
}

export const useLogoutWarning = () => {
    const [timeTilTokenExpiry, setTimeTilTokenExpiry] = useState(3500);
    const [hasFocus, setHasFocus] = useState(false);
    const [loginState, setLoginState] = useState(LoginState.UNKNOWN);

    const updateTokenExpiry = () => {
        setTimeTilTokenExpiry(timeTilTokenExpiry - 1);
    };

    const onVisibilityChange = () => {
        setHasFocus(document.visibilityState === 'visible');
    };

    useEffect(() => {
        // Check API
        setLoginState(LoginState.REFRESH);
    }, [hasFocus]);

    useEffect(() => {
        setInterval(updateTokenExpiry, 1000);

        window.addEventListener('visibilitychange', onVisibilityChange);
    }, []);

    return { timeTilTokenExpiry, hasFocus, loginState };
};
