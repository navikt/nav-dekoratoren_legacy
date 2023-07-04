import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLoginStatus } from 'utils/hooks/useLoginStatus';
import { LogoutWarning } from './LogoutWarning';

export const LogoutController = () => {
    const { loginStatus, isTokenExpiring, isSessionExpiring } = useLoginStatus();
    const [showWarning, setShowWarning] = useState(false);

    const checkForLogoutAndWait = () => {
        console.log('checking for logout');

        setTimeout(() => {
            checkForLogoutAndWait();
        }, 1000);
    };

    useEffect(() => {
        checkForLogoutAndWait();
    }, []);

    console.log(loginStatus);

    return isTokenExpiring || isSessionExpiring ? <LogoutWarning /> : null;
};
