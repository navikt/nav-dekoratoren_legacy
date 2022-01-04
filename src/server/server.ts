import NodeCache from 'node-cache';
import fetch from 'node-fetch';
import express, { NextFunction, Request, Response } from 'express';
import { createMiddleware } from '@promster/express';
import { getSummary, getContentType } from '@promster/express';
import { oneMinuteInSeconds, tenSeconds } from './utils';
import { clientEnv, fiveMinutesInSeconds } from './utils';
import cookiesMiddleware from 'universal-cookie-express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { template } from './template';
import compression from 'compression';
import dotenv from 'dotenv';
import mockMenu from './mock/menu.json';
import { IncomingMessage } from 'http';

require('console-stamp')(console, '[HH:MM:ss.l]');

const isProduction = process.env.NODE_ENV === 'production';

// Local environment - import .env
if (!isProduction || process.env.PROD_TEST) {
    dotenv.config();
}

// Config
const appBasePath = process.env.APP_BASE_PATH || ``;
const oldBasePath = '/common-html/v4/navno';
const buildPath = `${process.cwd()}/build`;
const app = express();
const PORT = 8088;

// Cache setup
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

const setAllowedCorsProxyHeaders = (proxyRes: IncomingMessage, req: Request, res: Response) => {
    const requestHeaders = req.headers['access-control-request-headers'];
    if (requestHeaders) {
        proxyRes.headers['access-control-allow-headers'] = req.headers['access-control-request-headers'];
    }
};

// Middleware
app.disable('x-powered-by');
app.use(compression());
app.use(cookiesMiddleware());
app.use((req, res, next) => {
    const origin = req.get('origin');
    const whitelist = ['.nav.no', '.oera.no', '.nais.io', 'https://preview-sykdomifamilien.gtsb.io'];
    const isAllowedDomain = whitelist.some((domain) => origin?.endsWith(domain));
    const isLocalhost = origin?.startsWith('http://localhost:');

    // Allowed origins // cors
    if (isAllowedDomain || isLocalhost) {
        res.header('Access-Control-Allow-Origin', req.get('origin'));
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,Accept,Authorization,Adrum');
    }

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
const pathsForTemplate = [`${appBasePath}`, `${appBasePath}/:locale(no|en|se)/*`, `${oldBasePath}`];

app.get(pathsForTemplate, (req, res, next) => {
    try {
        res.send(template(req));
    } catch (e) {
        next(e);
    }
});

app.get(`${appBasePath}/env`, (req, res, next) => {
    try {
        const cookies = (req as any).universalCookies.cookies;
        res.send(clientEnv({ req, cookies }));
    } catch (e) {
        next(e);
    }
});

app.get(`${appBasePath}/api/meny`, (req, res) => {
    const mainCacheContent = mainCache.get(mainCacheKey);
    if (mainCacheContent) {
        res.send(mainCacheContent);
    } else {
        // Fetch fom XP
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
});

// Proxied requests
const proxiedVarslerUrl = `${appBasePath}/api/varsler`;
const proxiedDriftsmeldingerUrl = `${appBasePath}/api/driftsmeldinger`;
const proxiedSokUrl = `${appBasePath}/api/sok`;

app.use(
    proxiedVarslerUrl,
    createProxyMiddleware(proxiedVarslerUrl, {
        target: `${process.env.API_VARSELINNBOKS_URL}`,
        pathRewrite: { [`^${proxiedVarslerUrl}`]: '' },
        changeOrigin: true,
        onProxyRes: setAllowedCorsProxyHeaders,
    })
);

app.use(
    proxiedSokUrl,
    createProxyMiddleware(proxiedSokUrl, {
        target: `${process.env.API_XP_SERVICES_URL}/navno.nav.no.search/search2/sok`,
        pathRewrite: { [`^${proxiedSokUrl}`]: '' },
        changeOrigin: true,
        onProxyRes: setAllowedCorsProxyHeaders,
    })
);

app.use(
    proxiedDriftsmeldingerUrl,
    createProxyMiddleware(proxiedDriftsmeldingerUrl, {
        target: `${process.env.API_XP_SERVICES_URL}/no.nav.navno/driftsmeldinger`,
        pathRewrite: { [`^${proxiedDriftsmeldingerUrl}`]: '' },
        changeOrigin: true,
        onProxyRes: setAllowedCorsProxyHeaders,
    })
);

app.use(`${appBasePath}/metrics`, (req, res) => {
    req.statusCode = 200;
    res.setHeader('Content-Type', getContentType());
    getSummary().then((summary) => res.end(summary));
});

app.get(`${appBasePath}/isAlive`, (req, res) => res.sendStatus(200));
app.get(`${appBasePath}/isReady`, (req, res) => res.sendStatus(200));
app.use(
    `${appBasePath}/`,
    express.static(buildPath, {
        setHeaders: (res: Response) => {
            if (isProduction) {
                // Override cache on static files
                res.header('Cache-Control', `max-age=${fiveMinutesInSeconds}`);
                res.header('Pragma', `max-age=${fiveMinutesInSeconds}`);
            }
        },
    })
);

// Error handler middleware
app.use((e: Error, req: Request, res: Response, next: NextFunction) => {
    const origin = req.get('origin');
    const host = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const url = origin || host;
    console.error(`${url}: ${e.message}`);
    console.error(e.stack);
    res.status(405);
    res.send({
        error: { status: 405, message: e.message },
    });
});

const server = app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

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
