import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import NodeCache from 'node-cache';
import { tenSeconds } from '../utils';

const driftsmeldingerServiceUrl = `${process.env.API_XP_SERVICES_URL}/no.nav.navno/driftsmeldinger`;

const cacheKey = 'driftsmeldinger-cache';

const cache = new NodeCache({
    stdTTL: tenSeconds,
    deleteOnExpire: false,
});

let isFetching = false;

const refreshCache = () => {
    if (isFetching) {
        return;
    }

    isFetching = true;
    fetch(driftsmeldingerServiceUrl)
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
        })
        .finally(() => {
            isFetching = false;
        });
};

cache.on('expired', refreshCache);

export const getDriftsmeldingerHandler: RequestHandler = (req, res) => {
    const cached = cache.get(cacheKey);

    if (cached) {
        res.status(200).send(cached);
    } else {
        refreshCache();
        cache.on('set', (key, value) => {
            res.status(200).send(value);
        });
    }
};
