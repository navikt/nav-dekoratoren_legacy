import { useEffect, useState } from 'react';

import { VNGAGE_ID, VngageUserState, vendorScripts } from 'komponenter/header/vendorScripts';
import { loadExternalScript } from 'utils/external-scripts';

type UseScreenSharingOptions = {
    enabled: boolean;
};

type UseScreenSharingState = {
    isSuccess: boolean;
    isLoading: boolean;
};

export function useScreenSharing({ enabled }: UseScreenSharingOptions): UseScreenSharingState {
    // Check if it is already loaded to avoid layout shift
    const [isSuccess, setIsSuccess] = useState(enabled && !!window.vngage);
    const [isLoading, setIsLoading] = useState(enabled && !window.vngage);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        // already loaded
        if (isSuccess) {
            return;
        }

        window.vngageReady = () => {
            setIsLoading(false);
            setIsSuccess(true);
        };

        loadExternalScript(vendorScripts.skjermdeling);

        return () => {
            window.vngageReady = undefined;
        };
    }, [enabled]);

    return {
        isSuccess,
        isLoading,
    };
}

export function useLoadIfActiveSession({ userState }: { userState: string | undefined }) {
    useEffect(() => {
        if (userState) {
            if (userState && userState !== 'Ready') {
                loadExternalScript(vendorScripts.skjermdeling);
            }
        }
    }, [userState]);
}
