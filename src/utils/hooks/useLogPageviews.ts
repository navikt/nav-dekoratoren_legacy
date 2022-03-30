import { useEffect, useState } from 'react';
import { Params } from '../../store/reducers/environment-duck';
import { InnloggingsstatusState } from '../../store/reducers/innloggingsstatus-duck';
import { logPageView } from '../analytics/amplitude';

type PushStateArgs = Parameters<typeof window.history.pushState>;

export const useLogPageviews = (params: Params, innloggingsstatus: InnloggingsstatusState) => {
    const [isInitialPage, setIsInitialPage] = useState(true);
    const [currentPathname, setCurrentPathname] = useState('');

    useEffect(() => {
        if (innloggingsstatus.status === 'OK') {
            logPageView(params, innloggingsstatus);
            console.log(`Setting initial pathname: ${window.location.pathname}`);
            setCurrentPathname(window.location.pathname);
            setIsInitialPage(false);
        }
    }, [innloggingsstatus]);

    useEffect(() => {
        const pushStateActual = window.history.pushState;

        window.history.pushState = (...args: PushStateArgs) => {
            pushStateActual.call(window.history, ...args);

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
        if (isInitialPage) {
            console.log('Is initial page, skipping');
            return;
        }

        console.log(`Logging pageview: ${currentPathname}`);
        logPageView(params, innloggingsstatus);
    }, [currentPathname, isInitialPage]);
};
