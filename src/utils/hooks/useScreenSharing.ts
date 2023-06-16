import { useEffect, useState } from 'react';

import { VNGAGE_ID, VngageUserState, vendorScripts } from 'komponenter/header/vendorScripts';
import { loadExternalScript } from 'utils/external-scripts';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { checkVergic } from 'komponenter/footer/common/vergic';

type UseScreenSharingOptions = {
    enabled: boolean;
};

type UseScreenSharingState = {
    isSuccess: boolean;
    isLoading: boolean;
};

export function useScreenSharing({ enabled }: UseScreenSharingOptions): UseScreenSharingState {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { NAV_GROUP_ID } = useSelector((state: AppState) => state.environment);

    useEffect(() => {
        setIsLoading(true);

        let interval: ReturnType<typeof setInterval>;

        loadExternalScript(vendorScripts.skjermdeling).then(() => {
            const interval = setInterval(() => {
                const userState = localStorage.getItem(`vngage_${VNGAGE_ID.toLowerCase()}`);
                const parsedUserState = userState ? (JSON.parse(userState) as VngageUserState) : null;

                let isVergicReady = false;

                if (checkVergic(window.vngage)) {
                    isVergicReady = window.vngage.get('queuestatus', NAV_GROUP_ID);
                }

                if (isVergicReady && parsedUserState && parsedUserState.user.state === 'Ready') {
                    clearInterval(interval);
                    setIsLoading(false);
                    setIsSuccess(true);
                }
            }, 32);
        });

        return () => clearInterval(interval);
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
