import menuFallback from '../mock/menu.json';
import { RequestHandler } from 'express';
import NodeCache from 'node-cache';
import { getCachedRequestHandler } from './_cachedResourceHandler';

const menuServiceUrl = `${process.env.API_XP_SERVICES_URL}/no.nav.navno/menu`;

const cacheKey = 'navno-menu';

const revalidateMenuCache = (cache: NodeCache) =>
    fetch(menuServiceUrl)
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

export const getMenuHandler: RequestHandler = getCachedRequestHandler(revalidateMenuCache, cacheKey);
