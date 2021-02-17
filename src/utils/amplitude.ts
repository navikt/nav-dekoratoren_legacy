import { verifyWindowObj } from 'utils/Environment';
import { Params } from 'store/reducers/environment-duck';

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
        logAmplitudeEvent('sidevisning', {
            sidetittel: document.title,
            parametre: {
                ...params,
                BREADCRUMBS: !!(params?.BREADCRUMBS && params.BREADCRUMBS.length > 0),
                AVAILABLE_LANGUAGES: !!(params?.AVAILABLE_LANGUAGES && params.AVAILABLE_LANGUAGES.length > 0),
            },
        });
    }
};

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
