import { RequestHandler } from 'express';
import { startUnleash } from 'unleash-client';

export const getFeaturesHandler: RequestHandler = async (req, res) => {
    // Cant easily fetch feature toggles when running locally
    // so just mock this.
    const { UNLEASH_SERVER_API_TOKEN, UNLEASH_SERVER_API_URL } = process.env;

    if (process.env.NODE_ENV === 'development') {
        const features = {
            skjermdeling: true,
            chatbotscript: true,
        };
        res.json(features);
        return;
    }

    if (!UNLEASH_SERVER_API_TOKEN || !UNLEASH_SERVER_API_URL) {
        res.status(500).send('Missing UNLEASH_SERVER_API_TOKEN or UNLEASH_SERVER_API_URL');
        return;
    }

    const unleash = await startUnleash({
        url: UNLEASH_SERVER_API_URL,
        appName: 'nav-dekoratoren',
        customHeaders: { Authorization: UNLEASH_SERVER_API_TOKEN },
    });

    return {
        skjermdeling: unleash.isEnabled('dekoratoren.skjermdeling'),
        chatbotscript: unleash.isEnabled('dekoratoren.chatbotscript'),
    };
};
