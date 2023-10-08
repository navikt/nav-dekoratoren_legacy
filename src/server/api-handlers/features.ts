import { RequestHandler } from 'express';
import { forceArray } from '../utils';
import { initialize, Unleash } from 'unleash-client';

let unleashInstance: Unleash;

type Features = { [key: string]: boolean };

const initializeUnleash = async () => {
    const { UNLEASH_SERVER_API_TOKEN, UNLEASH_SERVER_API_URL } = process.env;
    if (!UNLEASH_SERVER_API_TOKEN || !UNLEASH_SERVER_API_URL) {
        console.error('Missing UNLEASH_SERVER_API_TOKEN or UNLEASH_SERVER_API_URL');
        return false;
    }

    try {
        unleashInstance = initialize({
            url: `${UNLEASH_SERVER_API_URL}/api/`,
            appName: 'nav-dekoratoren',
            customHeaders: { Authorization: UNLEASH_SERVER_API_TOKEN },
        });
    } catch (e) {
        console.error('Error initializing unleash', e);
    }

    return true;
};

initializeUnleash();

export const getFeaturesHandler: RequestHandler = async (req, res) => {
    if (!unleashInstance) {
        await initializeUnleash();
    }

    const { query } = req;
    if (!query?.feature) {
        return;
    }
    const requestedFeatures: string[] = forceArray(query.feature);

    // Cant easily fetch feature toggles when running locally
    // so just mock this.
    if (process.env.NODE_ENV === 'development') {
        const features = {
            'dekoratoren.skjermdeling': true,
            'dekoratoren.chatbotscript': true,
        };
        res.json(features);
        return;
    }

    const features = requestedFeatures.reduce((acc: Features, feature: string) => {
        acc[feature] = unleashInstance.isEnabled(feature);
        return acc;
    }, {});

    res.json(features);
};
