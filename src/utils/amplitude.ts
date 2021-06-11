import { verifyWindowObj } from 'utils/Environment';
import { Params } from 'store/reducers/environment-duck';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { useState, useEffect } from 'react';

// Hindrer crash ved server-side kjøring (amplitude.js fungerer kun i browser)
const amplitude = verifyWindowObj() ? require('amplitude-js') : () => null;
let currentPageTitle = 'undefined';

export const initAmplitude = (params: Params) => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
        currentPageTitle = window.location.toString();
        logPageView(params);
    }
};

export const usePushstatePageviewHook = () => {
    const { params } = useSelector((state: AppState) => ({ params: state.environment.PARAMS }));
    const [pushStateTimestamp, setPushStateTimestamp] = useState(0);

    useEffect(() => {
        const pushState = window.history.pushState;
        window.history.pushState = (...args: Parameters<typeof pushState>) => {
            pushState.call(window.history, ...args);
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
