import { MenuValue } from '../meny-storage-utils';
import { initAmplitude } from 'utils/analytics/amplitude';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import { initTaskAnalytics } from './task-analytics/ta';

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
    destination?: string;
    label?: string;
    komponent?: string;
    lenkegruppe?: string;
};

export const initAnalytics = () => {
    initAmplitude();
    initTaskAnalytics();
};

export const analyticsEvent = (props: AnalyticsEventArgs) => {
    const { context, eventName, destination, category, action, label, komponent, lenkegruppe } = props;
    const actionFinal = `${context ? context + '/' : ''}${action}`;

    logAmplitudeEvent(eventName || 'navigere', {
        destinasjon: destination || label,
        søkeord: eventName === 'søk' ? label : undefined,
        lenketekst: actionFinal,
        kategori: category,
        komponent: komponent || action,
        lenkegruppe,
    });
};
