import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import NodeCache from 'node-cache';
import { tenSeconds } from '../utils';

const driftsmeldingerUrl = `${process.env.API_XP_SERVICES_URL}/no.nav.navno/driftsmeldinger`;

const cacheKey = 'driftsmeldinger-cache';

const cache = new NodeCache({
    stdTTL: tenSeconds,
});

export const getDriftsmeldingerHandler: RequestHandler = async (req, res) => {
    const cached = cache.get(cacheKey);
    if (cached) {
        return res.status(200).send(cached);
    }

    try {
        const response = await fetch(driftsmeldingerUrl);

        if (response.status !== 200) {
            return res.status(response.status).send(`Failed to fetch driftsmeldinger - ${response.statusText}`);
        }

        const json = await response.json();
        cache.set(cacheKey, json);

        return res.status(200).send(json);
    } catch (e) {
        return res.status(500).send(`Failed to fetch driftsmeldinger - ${e}`);
    }
};
