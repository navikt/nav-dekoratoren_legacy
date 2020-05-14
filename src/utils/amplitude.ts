import amplitude, { logEvent } from 'amplitude-js';

export const initAmplitude = () => {
    amplitude.getInstance().init('default', '', {
        apiEndpoint: 'amplitude.nav.no/collect-auto',
        saveEvents: false,
        includeUtm: true,
        includeReferrer: true,
        platform: window.location.toString(),
    });
    logAmplitudeEvent('sidevisning');
};

export function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
    return new Promise(function (resolve) {
        amplitude.getInstance().logEvent(eventName, data, resolve)
    });
};