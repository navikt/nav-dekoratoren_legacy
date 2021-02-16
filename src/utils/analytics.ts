import TagManager from 'react-gtm-module';
import { MenuValue } from './meny-storage-utils';
import { initAmplitude } from 'utils/amplitude';
import { logAmplitudeEvent } from 'utils/amplitude';
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
    category: AnalyticsCategory;
    action: string;
    context?: MenuValue;
    label?: string;
};

export const initAnalytics = (params: Params) => {
    TagManager.initialize(tagManagerArgs);
    initAmplitude(params);
};

export const analyticsEvent = (props: AnalyticsEventArgs) => {
    const { context, category, action, label } = props;
    const actionFinal = `${context ? context + '/' : ''}${action}`;

    logAmplitudeEvent('navigere', {
        destinasjon: label,
        lenketekst: actionFinal,
        kategori: category,
    });

    TagManager.dataLayer({
        dataLayer: {
            event: category,
            action: actionFinal.toLowerCase(),
            data: label || undefined,
        },
    });
};
