import fetch from 'node-fetch';
import menuFallback from '../mock/menu.json';
import NodeCache from 'node-cache';
import { tenSeconds } from '../utils';
import { RequestHandler } from 'express';

const menuServiceUrl = `${process.env.API_XP_SERVICES_URL}/no.nav.navno/menu`;

const cacheKey = 'navno-menu';
const cache = new NodeCache({
    stdTTL: tenSeconds,
    deleteOnExpire: false,
});

const refreshCache = () => {
    return fetch(menuServiceUrl)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
        })
        .then((json) => {
            cache.set(cacheKey, json);
            console.log('Successfully refreshed menu cache');
        })
        .catch((err) => {
            console.error(`Failed to fetch menu content - ${err}`);
            const prevCache = cache.get(cacheKey);
            if (prevCache) {
                cache.set(cacheKey, prevCache);
            } else {
                console.error('No valid cache present on this instance - using static fallback');
                cache.set(cacheKey, menuFallback);
            }
        });
};

cache.on('expired', refreshCache);

export const getMenyHandler: RequestHandler = (req, res) => {
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
