import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
require('console-stamp')(console, '[HH:MM:ss.l]');
import NodeCache from 'node-cache';
import fetch from 'node-fetch';
import express, { Request, Response } from 'express';
const { createMiddleware } = require('@promster/express');
const { getSummary, getContentType } = require('@promster/express');
import { clientEnv, fiveMinutesInSeconds, oneMinuteInSeconds } from './utils';
import cookiesMiddleware from 'universal-cookie-express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { template } from './template';
import dotenv from 'dotenv';
import mockMenu from './mock/menu.json';

// Local environment - import .env
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Config
const appBasePath = '/dekoratoren';
const oldBasePath = '/common-html/v4/navno';
const buildPath = `${process.cwd()}/build`;
const app = express();
const PORT = 8088;

// Cache setup
const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';
const mainCache = new NodeCache({
    stdTTL: fiveMinutesInSeconds,
    checkperiod: oneMinuteInSeconds,
});
const backupCache = new NodeCache({
    stdTTL: 0,
    checkperiod: 0,
});

// Cors
app.disable('x-powered-by');
app.use(cookiesMiddleware());
app.use((req, res, next) => {
    // Allowed origins
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,Content-Type,Accept,Authorization'
    );

    // Cache control
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    next();
});

// Metrics
app.use(
    createMiddleware({
        app,
        options: {
            labels: ['app', 'namespace', 'cluster'],
            getLabelValues: (req: Request, res: Response) => ({
                app: process.env.NAIS_APP_NAME || 'nav-dekoratoren',
                namespace: process.env.NAIS_NAMESPACE || 'local',
                cluster: process.env.NAIS_CLUSTER_NAME || 'local',
            }),
        },
    })
);

// Express config
const pathsForTemplate = [
    `${appBasePath}`,
    `${appBasePath}/:locale(no|en|se)/*`,
    `${oldBasePath}`,
];

app.get(pathsForTemplate, (req, res) => {
    res.send(template(req));
});

app.get(`${appBasePath}/env`, (req, res) => {
    const cookies = (req as any).universalCookies.cookies;
    res.send(clientEnv({ req, cookies }));
});

app.get(`${appBasePath}/api/meny`, (req, res) => {
    // const mainCacheContent = mainCache.get(mainCacheKey);
    // if (mainCacheContent) {
    //     res.send(mainCacheContent);
    // } else {
    // Fetch fom XP
    fetch(`${process.env.API_XP_MENY_URL}`, { method: 'GET' })
        .then((xpRes) => xpRes.json())
        .then((xpData) => {
            mainCache.set(mainCacheKey, xpData, 100);
            backupCache.set(backupCacheKey, xpData, 0);
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
                    mainCache.set(mainCacheKey, backupCacheData, 100);
                    res.send(backupCacheData);
                } else {
                    throw 'Invalid cache';
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
                    mainCache.set(mainCacheKey, mockMenu, 100);
                    res.send(mockMenu);
                } else {
                    throw 'Mock is undefined';
                }
            }
        })
        .catch((err) => {
            console.error('Failed to use backup mock - ', err);
        });
    // }
});

// Proxied requests
const proxiedAuthUrl = `${appBasePath}/api/auth`;
const proxiedVarslerUrl = `${appBasePath}/api/varsler`;
const proxiedSokUrl = `${appBasePath}/api/sok`;

app.use(
    proxiedAuthUrl,
    createProxyMiddleware(proxiedAuthUrl, {
        target: `${process.env.API_INNLOGGINGSLINJE_URL}`,
        pathRewrite: { [`^${proxiedAuthUrl}`]: '' },
    })
);

app.use(
    proxiedVarslerUrl,
    createProxyMiddleware(proxiedVarslerUrl, {
        target: `${process.env.API_VARSELINNBOKS_URL}`,
        pathRewrite: { [`^${proxiedVarslerUrl}`]: '' },
    })
);

app.use(
    proxiedSokUrl,
    createProxyMiddleware(proxiedSokUrl, {
        target: `${process.env.API_XP_SOK_URL}`,
        pathRewrite: { [`^${proxiedSokUrl}`]: '' },
        changeOrigin: true,
    })
);

app.use(`${appBasePath}/metrics`, (req, res) => {
    req.statusCode = 200;
    res.setHeader('Content-Type', getContentType());
    res.end(getSummary());
});

app.get(`${appBasePath}/isAlive`, (req, res) => res.sendStatus(200));
app.get(`${appBasePath}/isReady`, (req, res) => res.sendStatus(200));
app.use(
    `${appBasePath}/`,
    express.static(buildPath, {
        setHeaders: (res: Response) => {
            if (process.env.NODE_ENV === 'production') {
                // Override cache on static files
                res.header('Cache-Control', `max-age=${fiveMinutesInSeconds}`);
                res.header('Pragma', `max-age=${fiveMinutesInSeconds}`);
            }
        },
    })
);

const server = app.listen(PORT, () =>
    console.log(`App listening on port: ${PORT}`)
);

const shutdown = () => {
    console.log('Retrived signal terminate , shutting down node service');

    mainCache.flushAll();
    backupCache.flushAll();
    console.log('cache data flushed');

    mainCache.close();
    backupCache.close();
    console.log('cache data closed');

    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
