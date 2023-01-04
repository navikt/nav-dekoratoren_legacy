/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Params } from '../../store/reducers/environment-duck';
import { InnloggingsstatusState } from '../../store/reducers/innloggingsstatus-duck';
import { logPageView } from '../analytics/amplitude';
import { startTaskAnalyticsSurveys } from '../analytics/task-analytics';

type PushStateArgs = Parameters<typeof window.history.pushState>;

// Run functions on navigating in SPAs
export const useOnPushStateHandlers = (params: Params, innloggingsstatus: InnloggingsstatusState) => {
    const [isInitialPageview, setIsInitialPageview] = useState(true);
    const [lastPathname, setLastPathname] = useState('');

    // Run functions on initial load
    useEffect(() => {
        const { status } = innloggingsstatus;
        if ((status === 'OK' || status === 'FEILET') && isInitialPageview) {
            setIsInitialPageview(false);
            logPageView(params, innloggingsstatus);
            startTaskAnalyticsSurveys();
            setLastPathname(window.location.pathname);
        }
    }, [innloggingsstatus, isInitialPageview]);

    // Run on SPA navigation
    useEffect(() => {
        if (isInitialPageview) {
            return;
        }

        const pushStateActual = window.history.pushState;

        window.history.pushState = (...args: PushStateArgs) => {
            pushStateActual.call(window.history, ...args);

            // Delay slightly to allow SPAs to update their location state
            setTimeout(() => {
                const newPathname = window.location.pathname;
                if (newPathname !== lastPathname) {
                    setLastPathname(newPathname);
                    logPageView(params, innloggingsstatus);
                    startTaskAnalyticsSurveys();
                }
            }, 250);
        };

        return () => {
            window.history.pushState = pushStateActual;
        };
    }, [lastPathname, isInitialPageview]);
};
