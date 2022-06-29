import TagManager from 'react-gtm-module';
import { MenuValue } from '../meny-storage-utils';
import { initAmplitude } from 'utils/analytics/amplitude';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import { Params } from 'store/reducers/environment-duck';

const tagManagerArgs = {
    gtmId: 'GTM-PM9RP3',
    dataLayerName: 'dataLayer',
};

export enum AnalyticsCategory {
    Header = 'dekorator-header',
    Footer = 'dekorator-footer',
    Meny = 'dekorator-meny',
}

export type AnalyticsEventArgs = {
    eventName?: string;
    category: AnalyticsCategory;
    action: string;
    context?: MenuValue;
    label?: string;
    komponent?: string;
    lenkegruppe?: string;
};

export const initAnalytics = (params: Params) => {
    TagManager.initialize(tagManagerArgs);
    initAmplitude();
};

export const analyticsEvent = (props: AnalyticsEventArgs) => {
    const { context, eventName, category, action, label, komponent, lenkegruppe } = props;
    const actionFinal = `${context ? context + '/' : ''}${action}`;

    logAmplitudeEvent(eventName || 'navigere', {
        destinasjon: label,
        lenketekst: actionFinal,
        kategori: category,
        komponent,
        lenkegruppe,
    });

    TagManager.dataLayer({
        dataLayer: {
            event: category,
            action: actionFinal.toLowerCase(),
            data: label || undefined,
        },
    });
};
