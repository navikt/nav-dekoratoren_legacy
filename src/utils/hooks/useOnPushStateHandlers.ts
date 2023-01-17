/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { logPageView } from '../analytics/amplitude';
import { startTaskAnalyticsSurveys } from '../analytics/task-analytics';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';

type PushStateArgs = Parameters<typeof window.history.pushState>;

const stateSelector = (state: AppState) => ({
    innloggingsstatus: state.innloggingsstatus,
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
    environment: state.environment,
});

// Run functions on navigating in SPAs
export const useOnPushStateHandlers = () => {
    const [isInitialPageview, setIsInitialPageview] = useState(true);
    const [lastPathname, setLastPathname] = useState('');
    const { innloggingsstatus, environment, language, arbeidsflate } = useSelector(stateSelector);
    const { PARAMS } = environment;

    // Run functions on initial load
    useEffect(() => {
        const { status } = innloggingsstatus;
        if ((status === 'OK' || status === 'FEILET') && isInitialPageview) {
            setIsInitialPageview(false);
            logPageView(PARAMS, innloggingsstatus);
            startTaskAnalyticsSurveys({ currentAudience: arbeidsflate, currentLanguage: language });
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

            // Delay slightly to allow SPAs to update their state
            setTimeout(() => {
                const newPathname = window.location.pathname;
                if (newPathname !== lastPathname) {
                    setLastPathname(newPathname);
                    logPageView(PARAMS, innloggingsstatus);
                    startTaskAnalyticsSurveys({ currentAudience: arbeidsflate, currentLanguage: language });
                }
            }, 250);
        };

        return () => {
            window.history.pushState = pushStateActual;
        };
    }, [lastPathname, isInitialPageview]);
};
