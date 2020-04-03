import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
require('console-stamp')(console, '[HH:MM:ss.l]');
import NodeCache from 'node-cache';
import request from 'request';
import express, { Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { template } from './template';
import dotenv from 'dotenv';

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

// Mock
import mockMenu from './mock/menu.json';
import { clientEnv } from './utils';

// Cache setup
const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';
const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

// Cors
app.disable('x-powered-by');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,Content-Type,Accept,Authorization'
    );
    next();
});

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
    res.send(clientEnv(req));
});

app.get(`${appBasePath}/api/meny`, (req, res) =>
    mainCache.get(mainCacheKey, (error, mainCacheContent) =>
        !error && mainCacheContent ? res.send(mainCacheContent) : fetchMenu(res)
    )
);

const fetchMenu = (res: Response) => {
    const uri = `${process.env.API_XP_MENY_URL}`;
    request({ method: 'GET', uri }, (reqError, reqResponse, reqBody) => {
        if (!reqError && reqResponse.statusCode === 200 && reqBody.length > 2) {
            mainCache.set(mainCacheKey, reqBody, 100);
            backupCache.set(backupCacheKey, reqBody, 0);
            res.send(reqBody);
        } else {
            console.error('Failed to fetch decorator', reqError);
            backupCache.get(backupCacheKey, (err, backupCacheContent) => {
                if (!err && backupCacheContent) {
                    console.log('Using backup cache - copy to main cache');
                    mainCache.set(mainCacheKey, backupCacheContent, 100);
                    res.send(backupCacheContent);
                } else {
                    console.log('Failed to use backup-cache - using mock', err);
                    mainCache.set(mainCacheKey, mockMenu, 100);
                    backupCache.set(backupCacheKey, mockMenu, 0);
                    res.send(mockMenu);
                }
            });
        }
    });
};

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

app.get(`${appBasePath}/isAlive`, (req, res) => res.sendStatus(200));
app.get(`${appBasePath}/isReady`, (req, res) => res.sendStatus(200));
app.use(`${appBasePath}/`, express.static(buildPath));

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
