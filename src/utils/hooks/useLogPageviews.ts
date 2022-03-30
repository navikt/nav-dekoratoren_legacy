/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Params } from '../../store/reducers/environment-duck';
import { InnloggingsstatusState } from '../../store/reducers/innloggingsstatus-duck';
import { logPageView } from '../analytics/amplitude';

type PushStateArgs = Parameters<typeof window.history.pushState>;

// Logs pageviews on the initial page load, and attempts to also log when navigating in SPAs
export const useLogPageviews = (params: Params, innloggingsstatus: InnloggingsstatusState) => {
    const [isInitialPageview, setIsInitialPageview] = useState(true);
    const [lastPathname, setLastPathname] = useState('');

    // Handle logging on initial load
    useEffect(() => {
        if (innloggingsstatus.status === 'OK' && isInitialPageview) {
            setIsInitialPageview(false);
            logPageView(params, innloggingsstatus);
            setLastPathname(window.location.pathname);
        }
    }, [innloggingsstatus, isInitialPageview]);

    // Handle SPA logging
    useEffect(() => {
        if (isInitialPageview) {
            return;
        }

        logPageView(params, innloggingsstatus);

        const pushStateActual = window.history.pushState;

        window.history.pushState = (...args: PushStateArgs) => {
            pushStateActual.call(window.history, ...args);

            // Delay slightly before logging to allow SPAs to update their location state
            setTimeout(() => {
                const newPathname = window.location.pathname;
                if (newPathname !== lastPathname) {
                    setLastPathname(newPathname);
                }
            }, 250);
        };

        return () => {
            window.history.pushState = pushStateActual;
        };
    }, [lastPathname, isInitialPageview]);
};
