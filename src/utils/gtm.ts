import TagManager from 'react-gtm-module';

const tagManagerArgs = {
    gtmId: 'GTM-PM9RP3',
    dataLayerName: 'dataLayer',
};

export const initGTM = () => {
    TagManager.initialize(tagManagerArgs);
};
