import { RequestHandler } from 'express';
import NodeCache from 'node-cache';
import { tenSeconds } from '../utils';

type RevalidateCacheFunc = (cache: NodeCache) => Promise<any>;

export const cachedResourceHandler = (revalidateCacheFunc: RevalidateCacheFunc, cacheKey: string): RequestHandler => {
    const cache = new NodeCache({
        stdTTL: tenSeconds,
        deleteOnExpire: false,
    });

    let isFetching = false;

    const revalidateCache = () => {
        if (isFetching) {
            return;
        }

        isFetching = true;

        revalidateCacheFunc(cache).finally(() => {
            isFetching = false;
        });
    };

    cache.on('expired', revalidateCache);

    return (req, res) => {
        const cached = cache.get(cacheKey);

        if (cached) {
            res.status(200).send(cached);
        } else {
            const sendResponseOnCacheSet = (key: string, value: any) => {
                cache.off('set', sendResponseOnCacheSet);
                res.status(200).send(value);
            };

            revalidateCache();
            cache.on('set', sendResponseOnCacheSet);
        }
    };
};
