import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import NodeCache from 'node-cache';
import { tenSeconds } from '../utils';

const driftsmeldingerUrl = `${process.env.API_XP_SERVICES_URL}/no.nav.navno/driftsmeldinger`;

const cacheKey = 'driftsmeldinger-cache';

const cache = new NodeCache({
    stdTTL: tenSeconds,
    deleteOnExpire: false,
});

const refreshCache = () => {
    fetch(driftsmeldingerUrl)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
        })
        .then((json) => {
            cache.set(cacheKey, json);
        })
        .catch((e) => {
            console.error(`Failed to fetch from driftsmeldinger service - ${e}`);
            const prevCache = cache.get(cacheKey) || [];
            cache.set(cacheKey, prevCache);
        });
};

cache.on('expired', refreshCache);

refreshCache();

export const getDriftsmeldingerHandler: RequestHandler = async (req, res) => {
    const cached = cache.get(cacheKey);

    if (!cached) {
        return res.status(500).send('Unknown server error - driftsmeldinger not available');
    }

    return res.status(200).send(cached);
};
