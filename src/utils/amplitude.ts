import amplitude from 'amplitude-js';
import { contentEngaged } from './content-engaged';

export const initAmplitude = () => {
    amplitude.getInstance().init('default', '', {
        apiEndpoint: 'amplitude.nav.no/collect-auto',
        saveEvents: false,
        includeUtm: true,
        includeReferrer: true,
        platform: window.location.toString(),
    });
    contentEngaged(1, () => {
        logAmplitudeEvent('sidevisning');
    });
};

export function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
    return new Promise(function (resolve) {
        const eventData = data || {};
        eventData.origin = 'dekoratøren';
        eventData.originVersion = 'unknown';
        amplitude.getInstance().logEvent(eventName, eventData, resolve);
    });
}
