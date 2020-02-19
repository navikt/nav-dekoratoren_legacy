import ReactGA from 'react-ga';
import { getSessionStorage, NAVHEADER } from './meny-storage-utils';

const trackingId = 'UA-9127381-16';

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
    ReactGA.initialize(trackingId,
        {
            titleCase: false,
            debug: false,
        }
    );
    ReactGA.pageview(window.location.pathname + window.location.search);
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
