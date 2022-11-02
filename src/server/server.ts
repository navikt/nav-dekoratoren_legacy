import express, { NextFunction, Request, Response } from 'express';
import { createMiddleware } from '@promster/express';
import { getSummary, getContentType } from '@promster/express';
import rewrite from 'express-urlrewrite';
import { clientEnv, fiveMinutesInSeconds } from './utils';
import cookiesMiddleware from 'universal-cookie-express';
import { template } from './template';
import compression from 'compression';
import dotenv from 'dotenv';
import { getMenuHandler } from './api-handlers/menu';
import { getSokHandler } from './api-handlers/sok';
import { getDriftsmeldingerHandler } from './api-handlers/driftsmeldinger';
import { varselInnboksProxyHandler, varselInnboksProxyUrl } from './api-handlers/varsler';
import { getCSP } from 'csp-header';
import { cspDirectives } from '../csp';

require('console-stamp')(console, '[HH:MM:ss.l]');

const isProduction = process.env.NODE_ENV === 'production';
const buildId = process.env.BUILD_ID || '';

// Local environment - import .env
if (!isProduction || process.env.PROD_TEST) {
    dotenv.config();
}

// Config
const appBasePath = process.env.APP_BASE_PATH || ``;
const appPaths = [appBasePath, '', '/dekoratoren'].filter((path, index, array) => array.indexOf(path) === index);
const oldBasePath = '/common-html/v4/navno';
const buildPath = `${process.cwd()}/build`;

const createPaths = (subPath: string) => appPaths.map((path) => `${path}${subPath}`);

const app = express();
const PORT = 8088;

const corsWhitelist = [
    '.nav.no',
    '.oera.no',
    '.nais.io',
    'https://preview-sykdomifamilien.gtsb.io',
    'navdialog.cs102.force.com',
    'navdialog.cs106.force.com',
    'navdialog.cs108.force.com',
    'navdialog.cs162.force.com',
];

const isAllowedDomain = (origin?: string) => origin && corsWhitelist.some((domain) => origin.endsWith(domain));

// Middleware
app.disable('x-powered-by');
app.use(compression());
app.use(cookiesMiddleware());
app.use((req, res, next) => {
    const origin = req.get('origin');
    const isLocalhost = origin?.startsWith('http://localhost:');

    // Allowed origins // cors
    if (isAllowedDomain(origin) || isLocalhost) {
        res.header('Access-Control-Allow-Origin', req.get('origin'));
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        res.header('Access-Control-Allow-Credentials', 'true');

        const requestHeaders = req.header('Access-Control-Request-Headers');
        if (requestHeaders) {
            res.header('Access-Control-Allow-Headers', requestHeaders);
        }
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
const pathsForTemplate = [appPaths, createPaths('/:locale(no|en|se)/*'), oldBasePath].flat();

// HTML template
app.get(pathsForTemplate, (req, res, next) => {
    try {
        res.setHeader('Content-Security-Policy-Report-Only', getCSP({ directives: cspDirectives }));
        res.send(template(req));
    } catch (e) {
        next(e);
    }
});

app.post(createPaths('/api/csp-reports'), (req, res) => {
    return res.status(200).send();
});

// Client environment
app.get(createPaths('/env'), (req, res, next) => {
    try {
        const cookies = (req as any).universalCookies.cookies;
        res.send(clientEnv({ req, cookies }));
    } catch (e) {
        next(e);
    }
});

// Api endpoints
app.get(createPaths('/api/meny'), getMenuHandler);
app.get(createPaths('/api/sok'), getSokHandler);
app.get(createPaths('/api/driftsmeldinger'), getDriftsmeldingerHandler);
app.use(varselInnboksProxyUrl, varselInnboksProxyHandler);

// Nais endpoints
app.use(`${appBasePath}/metrics`, (req, res) => {
    req.statusCode = 200;
    res.setHeader('Content-Type', getContentType());
    getSummary().then((summary) => res.end(summary));
});

app.get(`${appBasePath}/isAlive`, (req, res) => res.sendStatus(200));
app.get(`${appBasePath}/isReady`, (req, res) => res.sendStatus(200));

// Prevent requests for stale client.js/css files from getting cache-headers in the response
const isStaleClientRequest = (req: Request) => {
    if (req.url !== '/client.js' && req.url !== '/css/client.css') {
        return false;
    }

    return !req.originalUrl?.includes(buildId);
};

// Static files
app.use(
    createPaths('/'),
    // Strip cache buster segment from client.css/js files
    rewrite('*/client:buildId.(css|js)*', '$1/client.$3'),
    express.static(buildPath, {
        setHeaders: (res: Response) => {
            if (isProduction && !isStaleClientRequest(res.req)) {
                // Override cache on static files
                res.header('Cache-Control', `max-age=${fiveMinutesInSeconds}`);
                res.header('Pragma', `max-age=${fiveMinutesInSeconds}`);
            }

            // Allow serving resources to sites using cross-origin isolation
            res.header('Cross-Origin-Resource-Policy', 'cross-origin');
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

    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
