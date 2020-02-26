/* tslint:disable:typedef no-shadowed-variable */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
import NodeCache from 'node-cache';
import express, { Response } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import request from 'request';
import { Provider as ReduxProvider } from 'react-redux';
import LanguageProvider from '../provider/Language-provider';
import Footer from '../komponenter/footer/Footer';
import Header from '../komponenter/header/Header';
import getStore from './../redux/store';

// Favicons
const fileFavicon = require('../../src/ikoner/favicon/favicon.ico');
const fileAppleTouchIcon = require('../../src/ikoner/favicon/apple-touch-icon.png');
const fileFavicon16x16 = require('../../src/ikoner/favicon/favicon-16x16.png');
const fileFavicon32x32 = require('../../src/ikoner/favicon/favicon-32x32.png');
// const fileWebManifest = require('../../src/ikoner/favicon/site.webmanifest');
const fileMaskIcon = require('../../src/ikoner/favicon/safari-pinned-tab.svg');

// Config
const basePath = '/dekoratoren';
const isProduction = process.env.NODE_ENV === 'production';
const buildPath = `${process.cwd()}/buildfolder`;
const app = express();
const PORT = 8088;

// Default vars
const defaultBaseUrl = 'http://localhost:8088';
const defaultSearchUrl = `https://www.nav.no/_/service/navno.nav.no.search/search2`;
const defaultMenuUrl = `https://www.nav.no/_/service/no.nav.navno/menu`;
const defaultAppUrl = `${defaultBaseUrl}${basePath}`;

// Mock
import mockEnv from './mock/env';
import mockMenu from './mock/menu.json';
import mockSok from './mock/sok.json';

// Cache setup
const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';
const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

// Server-side rendering
const store = getStore();
const baseUrl = `${process.env.BASE_URL || defaultBaseUrl}`;
const fileEnv = `${process.env.BASE_URL_APP || defaultAppUrl}/env`;
const fileCss = `${process.env.BASE_URL_APP || defaultAppUrl}/css/client.css`;
const fileScript = `${process.env.BASE_URL_APP || defaultAppUrl}/client.js`;

// Cors
app.disable('x-powered-by');
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

// Templates
const htmlHeader = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
        <LanguageProvider>
            <Header />
        </LanguageProvider>
    </ReduxProvider>
);

const htmlFooter = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
        <Footer />
    </ReduxProvider>
);

const template = (parameters: string) => `
    <!DOCTYPE html>
    <html lang="no">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,shrink-to-fit=no"
            />
            <meta name="theme-color" content="#000000" />
            <title>NAV Dekoratør</title>
            <link rel="icon" type="image/x-icon" href="${baseUrl}${fileFavicon}" />
            <style>
            /* Decorator development styling */
            html, body {  height: 100%; }
            .decorator-dev-container {
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
            }
            .decorator-dummy-app{
                background: #f1f1f1;
                height:100%;
            }
            </style>
            <div id="styles">
                <link rel="icon" type="image/x-icon" href="${baseUrl}${fileFavicon}" />
                <link rel="icon" type="image/png" sizes="16x16" href="${baseUrl}${fileFavicon16x16}">
                <link rel="icon" type="image/png" sizes="32x32" href="${baseUrl}${fileFavicon32x32}">
                <link rel="apple-touch-icon" sizes="180x180" href="${baseUrl}${fileAppleTouchIcon}">
                <link rel="mask-icon" href="${baseUrl}${fileMaskIcon}" color="#5bbad5">
                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="theme-color" content="#ffffff">
                <link href=${fileCss} rel="stylesheet" />
            </div>
        </head>
        <body>
            <div class="decorator-dev-container">
                <div id="header-withmenu">
                    <section class="navno-dekorator" id="decorator-header" role="main">${htmlHeader}</section>
                </div>
                <div class="decorator-dummy-app"></div>
                <div id="footer-withmenu">
                    <section class="navno-dekorator" id="decorator-footer" role="main">${htmlFooter}</section>
                </div>
            </div>
            <div id="scripts">
                <div id="decorator-env" data-src="${fileEnv}${parameters}"></div>
                <script type="text/javascript" src=${fileScript}></script>
                <script 
                    src="https://account.psplugin.com/83BD7664-B38B-4EEE-8D99-200669A32551/ps.js" 
                    integrity="sha384-O8gbAZERPHZ6hLuGmdmxg66Z9i2XwrCJqQMqhyXGroS3nsNvMetwFTJgRpDRd3a5" 
                    crossorigin="anonymous"></script>
            </div>
            <div id="skiplinks"></div>
            <div id="megamenu-resources"></div>
            <div id="webstats-ga-notrack"></div>
        </body>
    </html>`;

// Express config
const pathsForTemplate = [
    `${basePath}`,
    `${basePath}/`,
    `${basePath}/person`,
    `${basePath}/person/*`,
    `${basePath}/bedrift`,
    `${basePath}/bedrift/*`,
    `${basePath}/samarbeidspartner`,
    `${basePath}/samarbeidspartner/*`,
];

app.get(pathsForTemplate, (req, res) => {
    const parameters = Object.keys(req.query).length
        ? `?${req.url.split('?')[1]}`
        : ``;
    res.send(template(parameters));
});

app.get(`${basePath}/env`, (req, res) => {
    // Client environment
    // Obs! Don't expose secrets
    res.send({
        ...{
            ...(req.query && {
                language: req.query.language || 'nb',
                context: (req.query.context || 'ikkevalgt').toUpperCase(),
                stripped: req.query.stripped || false,
                redirectToApp: req.query.redirectToApp || false,
                level: req.query.level || 'Level4',
            }),
            ...(isProduction
                ? {
                      BASE_URL: process.env.BASE_URL,
                      BASE_URL_ENONIC: process.env.BASE_URL_ENONIC,
                      API_INNLOGGINGSLINJE_URL:
                          process.env.API_INNLOGGINGSLINJE_URL,
                      API_VARSELINNBOKS_URL: process.env.API_VARSELINNBOKS_URL,
                      BACKEND_MENY_URL: process.env.BACKEND_MENY_URL,
                      BACKEND_SOK_URL: process.env.BACKEND_SOK_URL,
                      MINSIDE_ARBEIDSGIVER_URL:
                          process.env.MINSIDE_ARBEIDSGIVER_URL,
                      DITT_NAV_URL: process.env.DITT_NAV_URL,
                      LOGIN_URL: process.env.LOGIN_URL,
                      LOGOUT_URL: process.env.LOGOUT_URL,
                  }
                : mockEnv),
        },
    });
});

app.get(`${basePath}/api/sok`, (req, res) => {
    const base = process.env.API_SOK_URL || defaultSearchUrl;
    const uri = `${base}?ord=${req.query.ord}`;
    request({ method: 'GET', uri }, (error, response, body) =>
        !error && response.statusCode === 200
            ? res.send(body)
            : res.send(mockSok)
    );
});

app.get(`${basePath}/api/meny`, (req, res) =>
    mainCache.get(mainCacheKey, (error, mainCacheContent) =>
        !error && mainCacheContent ? res.send(mainCacheContent) : fetchMenu(res)
    )
);

const fetchMenu = (res: Response) => {
    const uri = process.env.API_MENY_URL || defaultMenuUrl;
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

app.use(`${basePath}/`, express.static(buildPath));
app.get(`${basePath}/isAlive`, (req, res) => res.sendStatus(200));
app.get(`${basePath}/isReady`, (req, res) => res.sendStatus(200));

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
