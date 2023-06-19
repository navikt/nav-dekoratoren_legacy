import { useEffect, useState } from 'react';

import { VNGAGE_ID, vendorScripts } from 'komponenter/header/vendorScripts';
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
    const [isSuccess, setIsSuccess] = useState(window.vngage !== undefined);
    const [isLoading, setIsLoading] = useState(window.vngage === undefined);

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

export function useLoadIfActiveSession() {
    useEffect(() => {
        const userState = localStorage.getItem(`vngage_${VNGAGE_ID.toLowerCase()}`);

        if (userState) {
            loadExternalScript(vendorScripts.skjermdeling);
        }
    }, []);
}
