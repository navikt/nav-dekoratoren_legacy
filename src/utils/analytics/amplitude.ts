import amplitude from 'amplitude-js';
import { Params } from 'store/reducers/environment-duck';
import { InnloggingsstatusState } from '../../store/reducers/innloggingsstatus-duck';

type EventData = Record<string, any>;

export const initAmplitude = () => {
    const userProps = {
        skjermbredde: window.screen.width,
        skjermhoyde: window.screen.height,
        vindusbredde: window.innerWidth,
        vindushoyde: window.innerHeight,
    };

    amplitude.getInstance().init('default', '', {
        apiEndpoint: 'amplitude.nav.no/collect-auto',
        saveEvents: false,
        includeUtm: true,
        includeReferrer: true,
        platform: window.location.toString(),
    });
    amplitude.getInstance().setUserProperties(userProps);

    window.dekoratorenAmplitude = logEventFromApp;
};

const logEventFromApp = (eventName: string, appName: string, eventData: EventData = {}) => {
    return logAmplitudeEvent(eventName, { ...eventData, app: appName });
};

export const logPageView = (params: Params, authState: InnloggingsstatusState) => {
    return logAmplitudeEvent('besøk', {
        sidetittel: document.title,
        innlogging: authState.data.securityLevel ?? false,
        parametre: {
            ...params,
            BREADCRUMBS: !!(params?.BREADCRUMBS && params.BREADCRUMBS.length > 0),
            ...(params.AVAILABLE_LANGUAGES && {
                AVAILABLE_LANGUAGES: params.AVAILABLE_LANGUAGES.map((lang) => lang.locale),
            }),
        },
    });
};

export const logAmplitudeEvent = (eventName: string, eventData: EventData = {}) => {
    return new Promise(function (resolve, reject) {
        if (!amplitude) {
            reject('Amplitude is not initialized!');
        }

        eventData.platform = window.location.toString();
        eventData.origin = 'dekoratøren';
        eventData.originVersion = 'unknown';

        amplitude.getInstance().logEvent(eventName, eventData, resolve);
    });
};
