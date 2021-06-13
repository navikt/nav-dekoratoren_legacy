import { verifyWindowObj } from 'utils/Environment';
import { Params } from 'store/reducers/environment-duck';
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
export const usePageviewLogger = (params: Params) => {
    const [pushStateUrl, setPushStateUrl] = useState<string | null>();

    useEffect(() => {
        const pushState = window.history.pushState;
        window.history.pushState = (...args: Parameters<typeof pushState>) => {
            pushState.call(window.history, ...args);
            const url = args[2];

            // delay triggering the pageview to give client-side params time to update
            setTimeout(() => setPushStateUrl(url));
        };
    }, []);

    useEffect(() => {
        if (pushStateUrl) {
            logPageView(params);
        }
    }, [pushStateUrl]);
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
