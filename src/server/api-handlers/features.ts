import { RequestHandler } from 'express';
import { forceArray } from '../utils';
import { initialize, Unleash } from 'unleash-client';

let unleashInstance: Unleash;

type Features = { [key: string]: boolean };

// If Unleash instance goes down, we don't want screen sharing and chatbot to be
// feature disabled. So we default to true if the instance can not initialize.
// NOTE: Other filters may have other strategies, by setting to false.
const defaultToggles: Features = {
    'dekoratoren.skjermdeling': true,
    'dekoratoren.chatbotscript': true,
};

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

const resolveRequestedFeatures = (requestedFeatures: string[]) => {
    return requestedFeatures.reduce((acc: Features, feature: string) => {
        acc[feature] = unleashInstance.isSynchronized() ? unleashInstance.isEnabled(feature) : defaultToggles[feature];
        return acc;
    }, {});
};

export const getFeaturesHandler: RequestHandler = async (req, res) => {
    // If for some reason the unleash instance is not initialized,
    // make a new attempt.
    if (!unleashInstance) {
        await initializeUnleash();
    }

    const { query } = req;
    if (!query?.feature) {
        res.status(400).json({ error: 'Missing feature query parameters' });
        return;
    }

    const requestedFeatures: string[] = forceArray(query.feature).filter((feature) => typeof feature === 'string');
    console.log(resolveRequestedFeatures(requestedFeatures));
    res.json(resolveRequestedFeatures(requestedFeatures));
};

initializeUnleash();
