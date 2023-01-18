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
    const [currentPathname, setCurrentPathname] = useState('');
    const { innloggingsstatus, environment, language, arbeidsflate } = useSelector(stateSelector);
    const { PARAMS } = environment;

    // Run functions on initial load
    useEffect(() => {
        const { status } = innloggingsstatus;
        if ((status === 'OK' || status === 'FEILET') && !currentPathname) {
            setCurrentPathname(window.location.pathname);
        }
    }, [innloggingsstatus, arbeidsflate, language, PARAMS]);

    // Run on SPA navigation
    useEffect(() => {
        if (!currentPathname) {
            return;
        }

        const pushStateActual = window.history.pushState;

        window.history.pushState = (...args: PushStateArgs) => {
            pushStateActual.call(window.history, ...args);

            // Delay slightly to allow SPAs to update their state
            setTimeout(() => {
                const newPathname = window.location.pathname;
                if (newPathname !== currentPathname) {
                    setCurrentPathname(newPathname);
                }
            }, 250);
        };

        return () => {
            window.history.pushState = pushStateActual;
        };
    }, [currentPathname]);

    useEffect(() => {
        if (!currentPathname) {
            return;
        }

        logPageView(PARAMS, innloggingsstatus);
        startTaskAnalyticsSurveys({ currentAudience: arbeidsflate, currentLanguage: language });
    }, [currentPathname]);
};
