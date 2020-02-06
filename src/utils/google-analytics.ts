import ReactGA from 'react-ga';
import { getSessionStorage, NAVHEADER } from './meny-storage-utils';

const trackingIdAnders = 'UA-157705574-1';
const trackingIdNav = 'UA-9127381-16';

const activeTrackers = ['testtracker', 'navtracker'];

export enum GACategory {
    Header = 'dekorator-header',
    Footer = 'dekorator-footer',
    Meny = 'dekorator-meny'
}

export type GAEventArgs = {
    category: GACategory,
    action: string,
    label?: string
}

export const initGA = () => {
    ReactGA.initialize([{
        trackingId: trackingIdAnders,
        titleCase: false,
        gaOptions: {
            name: 'testtracker',
            userId: '1337',
        },
    }, {
        trackingId: trackingIdNav,
        titleCase: false,
        gaOptions: {
            name: 'navtracker',
        },
    }], {
        debug: true,
    });
    ReactGA.pageview(window.location.pathname + window.location.search, activeTrackers);
};

export const triggerGaEvent = ({ category, action, label }: GAEventArgs) => {
    const rolleValg = getSessionStorage(NAVHEADER);
    const actionFinal = `${rolleValg ? rolleValg + '/' : ''}${action}`;

    ReactGA.event({
        category: category,
        action: actionFinal.toLowerCase(),
        label: label || undefined,
    }, activeTrackers);
};
