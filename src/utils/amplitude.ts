import { verifyWindowObj } from 'utils/Environment';
import { Params } from 'store/reducers/environment-duck';
import { initialState } from 'store/reducers/environment-duck';

const defaultParams = initialState.PARAMS;

// const getNonDefaultParams = (params: Params) => {
//     return Object.keys(params).reduce((acc, key) => {
//         return params[key as keyof Params] !== defaultParams[key as keyof Params] ? { ...acc } : acc;
//     }, {});
// };

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
            parametre: params,
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
