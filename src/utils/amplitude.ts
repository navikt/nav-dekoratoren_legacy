import { verifyWindowObj } from 'utils/Environment';
import { Params } from 'store/reducers/environment-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { useState, useEffect } from 'react';

// Hindrer crash ved server-side kjøring (amplitude.js fungerer kun i browser)
const amplitude = verifyWindowObj() ? require('amplitude-js') : () => null;

export const initAmplitude = (params: Params) => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
        logPageView(params);
    }
};

// Ensures page views are logged in applications utilizing client-side routing
export const usePageviewLogger = () => {
    const { params } = useSelector((state: AppState) => ({ params: state.environment.PARAMS }));
    const [pushStateTimestamp, setPushStateTimestamp] = useState(0);

    useEffect(() => {
        const pushState = window.history.pushState;
        window.history.pushState = (...args: Parameters<typeof pushState>) => {
            pushState.call(window.history, ...args);
            // delay triggering the pageview to give client-side params time to update
            setTimeout(() => setPushStateTimestamp(Date.now()), 1000);
        };
    }, []);

    useEffect(() => {
        if (pushStateTimestamp) {
            logPageView(params);
        }
    }, [pushStateTimestamp]);
};

export function logPageView(params: Params, title: string | null = null) {
    console.log('logging pageview!');
    logAmplitudeEvent('sidevisning', {
        sidetittel: title || document.title,
        parametre: {
            ...params,
            BREADCRUMBS: !!(params?.BREADCRUMBS && params.BREADCRUMBS.length > 0),
            ...(params.AVAILABLE_LANGUAGES && {
                AVAILABLE_LANGUAGES: params.AVAILABLE_LANGUAGES.map((lang) => lang.locale),
            }),
        },
    });
}

export function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
    return new Promise(function (resolve: any) {
        const eventData = data || {};
        eventData.origin = 'dekoratøren';
        eventData.originVersion = 'unknown';

        if (amplitude) {
            amplitude.getInstance().logEvent(eventName, eventData, resolve);
        }
    });
}
