import { RequestHandler } from 'express';
import fs from 'fs';
import { getCachedRequestHandler } from './_cachedResourceHandler';
import NodeCache from 'node-cache';

const cacheKey = 'taConfig';

// To mock this locally, create the file /config/ta-config.json on the project root
const getTaConfig = () => {
    try {
        const taConfigFile = fs.readFileSync(`${process.cwd()}/config/ta-config.json`);
        return JSON.parse(taConfigFile.toString());
    } catch (e) {
        console.error(`Error reading Task Analytics config - ${e}`);
        return null;
    }
};

export const getTaskAnalyticsConfigHandler: RequestHandler = getCachedRequestHandler((cache: NodeCache) => {
    const taConfig = getTaConfig();
    cache.set(cacheKey, taConfig || cache.get(cacheKey) || []);

    return Promise.resolve();
}, cacheKey);
