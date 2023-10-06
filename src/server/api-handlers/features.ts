import { RequestHandler } from 'express';
import { initialize, Unleash } from 'unleash-client';

let unleashInstance: Unleash;
const featurePrefix = 'dekoratoren';
const expectedFeatures = ['skjermdeling', 'chatbotscript'];

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

    // Cant easily fetch feature toggles when running locally
    // so just mock this.
    if (process.env.NODE_ENV === 'development') {
        const features = {
            skjermdeling: true,
            chatbotscript: true,
        };
        res.json(features);
        return;
    }

    console.log(unleashInstance.isEnabled('dekoratoren.skjermdeling'));

    const features = expectedFeatures.reduce((acc: Features, feature: string) => {
        acc[feature] = unleashInstance.isEnabled(`${featurePrefix}.${feature}`);
        return acc;
    }, {});

    res.json(features);
};
