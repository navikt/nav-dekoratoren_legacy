import { verifyWindowObj } from 'utils/Environment';
import { Params } from 'store/reducers/environment-duck';

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

export function logPageView(params: Params, title: string | null = null) {
    logAmplitudeEvent('sidevisning', {
        sidetittel: title ? title : document.title,
        platform: window.location.toString(),
        parametre: {
            ...params,
            BREADCRUMBS: !!(params?.BREADCRUMBS && params.BREADCRUMBS.length > 0),
            ...(params.AVAILABLE_LANGUAGES && {
                AVAILABLE_LANGUAGES: params.AVAILABLE_LANGUAGES.map((lang) => lang.locale),
            }),
        },
    });
}

export function initPageViewObserver(params: Params) {
    const title: HTMLTitleElement | null = document.querySelector('title');
    if (title instanceof HTMLTitleElement) {
        new MutationObserver(function (mutations) {
            if (currentPageTitle !== title.text) {
                logPageView(params);
                currentPageTitle = title.text;
            }
        }).observe(title, { subtree: true, characterData: true, childList: true });
    }
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
