import ReactGA from 'react-ga';
import { getSessionStorage, NAVHEADER } from './meny-storage-utils';

const trackingId = 'UA-157705574-1';

export enum GACategory {
    Header = 'dekorator-header',
    Footer = 'dekorator-footer',
    Meny = 'meny'
}

export type GAEventArgs = {
    category: GACategory,
    action: string,
    label?: string
}

export const initGA = () => {
    ReactGA.initialize(trackingId, {
        debug: true,
        titleCase: false,
        gaOptions: {
            userId: '1337'
        }
    });
    ReactGA.pageview(window.location.pathname);
};

export const triggerGaEvent = ({category, action, label}: GAEventArgs) => {
    const rolleValg = getSessionStorage(NAVHEADER);
    const actionFinal = `${rolleValg ? rolleValg + '/' : ''}${action}`;

    ReactGA.event({
        category: category,
        action: actionFinal.toLowerCase(),
        label: label || undefined,
    });
};
