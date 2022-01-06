import fetch from 'node-fetch';
import mockMenu from '../mock/menu.json';
import NodeCache from 'node-cache';
import { oneMinuteInSeconds, tenSeconds } from '../utils';
import { RequestHandler } from 'express';

const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';
const mainCache = new NodeCache({
    stdTTL: tenSeconds,
    checkperiod: oneMinuteInSeconds,
});
const backupCache = new NodeCache({
    stdTTL: 0,
    checkperiod: 0,
});

export const getMenyHandler: RequestHandler = (req, res) => {
    const mainCacheContent = mainCache.get(mainCacheKey);
    if (mainCacheContent) {
        res.send(mainCacheContent);
    } else {
        fetch(`${process.env.API_XP_SERVICES_URL}/no.nav.navno/menu`, {
            method: 'GET',
        })
            .then((xpRes) => {
                if (xpRes.ok && xpRes.status === 200) {
                    return xpRes;
                } else {
                    throw new Error(`Response ${xpRes.status}`);
                }
            })
            .then((xpRes) => xpRes.json())
            .then((xpData) => {
                mainCache.set(mainCacheKey, xpData);
                backupCache.set(backupCacheKey, xpData);
                res.send(xpData);
            })
            .catch((err) => {
                console.error('Failed to fetch decorator - ', err);
            })

            // Use backup cache
            .then(() => {
                if (!res.headersSent) {
                    console.log('Using backup cache');
                    const backupCacheData = backupCache.get(backupCacheKey);
                    if (backupCacheData) {
                        mainCache.set(mainCacheKey, backupCacheData);
                        res.send(backupCacheData);
                    } else {
                        throw new Error('Invalid cache');
                    }
                }
            })
            .catch((err) => {
                console.error('Failed to use backup cache - ', err);
            })

            // Use backup mock
            .then(() => {
                if (!res.headersSent) {
                    console.log('Using backup mock');
                    if (mockMenu) {
                        mainCache.set(mainCacheKey, mockMenu);
                        res.send(mockMenu);
                    } else {
                        throw new Error('Mock is undefined');
                    }
                }
            })
            .catch((err) => {
                console.error('Failed to use backup mock - ', err);
            });
    }
};
