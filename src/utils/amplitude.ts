import { contentEngaged } from './content-engaged';
import amplitude from 'amplitude-js';

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
        logAmplitudeEvent('sidevisning');
    }
    
    /*
    contentEngaged(0, () => {
        logAmplitudeEvent('sidevisning');
    });
    */
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
