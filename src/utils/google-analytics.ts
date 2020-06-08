import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { MenuValue } from './meny-storage-utils';

const trackingId = 'UA-9127381-16';

const tagManagerArgs = {
    gtmId: 'GTM-PM9RP3',
    dataLayerName: 'dataLayer',
};

export enum GACategory {
    Header = 'dekorator-header',
    Footer = 'dekorator-footer',
    Meny = 'dekorator-meny',
}

export type GAEventArgs = {
    category: GACategory;
    action: string;
    context?: MenuValue;
    label?: string;
};

export const initGA = () => {
    TagManager.initialize(tagManagerArgs);

    ReactGA.initialize(trackingId, {
        titleCase: false,
        debug: false,
    });
};

export const gaEvent = (props: GAEventArgs) => {
    const { context, category, action, label } = props;
    const actionFinal = `${context ? context + '/' : ''}${action}`;

    ReactGA.event({
        category: category,
        action: actionFinal.toLowerCase(),
        label: label || undefined,
    });
};
