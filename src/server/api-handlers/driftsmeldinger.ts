import { RequestHandler } from 'express';
import NodeCache from 'node-cache';
import { getCachedRequestHandler } from './_cachedResourceHandler';

const driftsmeldingerServiceUrl = `${process.env.API_XP_SERVICES_URL}/no.nav.navno/driftsmeldinger`;

const cacheKey = 'driftsmeldinger-cache';

const revalidateDriftsmeldingerCache = (cache: NodeCache) =>
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
        });

export const getDriftsmeldingerHandler: RequestHandler = getCachedRequestHandler(
    revalidateDriftsmeldingerCache,
    cacheKey
);
