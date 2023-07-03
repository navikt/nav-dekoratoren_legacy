import React, { useEffect } from 'react';
import { useState } from 'react';
import { LoginState, useLogoutWarning } from 'utils/hooks/useLogoutWarning';
import { LogoutWarning } from './LogoutWarning';

export const LogoutController = () => {
    const { timeTilTokenExpiry, loginState } = useLogoutWarning();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowWarning(false);
        }, 2000);
    });

    console.log(loginState);

    return loginState === LoginState.EXPIRED || loginState === LoginState.REFRESH ? <LogoutWarning /> : null;
};
