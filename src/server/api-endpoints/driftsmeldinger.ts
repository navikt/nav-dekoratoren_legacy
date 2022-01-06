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
    return fetch(driftsmeldingerUrl)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
        })
        .then((json) => {
            cache.set(cacheKey, json);
            console.log('Successfully refreshed driftsmeldinger cache');
        })
        .catch((e) => {
            console.error(`Failed to fetch from driftsmeldinger service - ${e}`);
            const prevCache = cache.get(cacheKey) || [];
            cache.set(cacheKey, prevCache);
        });
};

cache.on('expired', refreshCache);

export const getDriftsmeldingerHandler: RequestHandler = async (req, res) => {
    const cached = cache.get(cacheKey);

    if (cached) {
        res.status(200).send(cached);
    } else {
        refreshCache().then(() => {
            const cachedNew = cache.get(cacheKey);
            res.status(200).send(cachedNew);
        });
    }
};
