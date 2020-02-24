/* tslint:disable:typedef no-shadowed-variable */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
import NodeCache from 'node-cache';
import express from 'express';
import React, { ReactNode } from 'react';
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
const defaultSearchUrl = `https://www.nav.no/_/service/navno.nav.no.search/search2`;
const defaultMenuUrl = `https://www.nav.no/_/service/no.nav.navno/menu`;
const defaultAppUrl = `http://localhost:8088${basePath}`;
const localhost = 'http://localhost:8088';

// Mock
import mockEnv from './mock/env';
import mockMenu from './mock/menu.json';
import mockSok from './mock/sokeresultat.json';

// Cache setup
const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';
const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

// Server-side rendering
const store = getStore();
const baseUrl = `${process.env.baseUrl || localhost}`;
const fileEnv = `${process.env.URL_APP_BASE || defaultAppUrl}/env`;
const fileCss = `${process.env.URL_APP_BASE || defaultAppUrl}/css/client.css`;
const fileScript = `${process.env.URL_APP_BASE || defaultAppUrl}/client.js`;

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
                    integrity="sha384-9YqOIesDhDEY++EsRGPyixeoD0vNAx2BZNvvygZQ+83K6mK9Z0uK5xh380SCBenA"
                    crossorigin="anonymous"
                ></script>
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
                lvl: req.query.lvl || '3',
            }),
            ...(isProduction
                ? {
                      baseUrl: process.env.baseUrl,
                      baseUrlEnonic: process.env.baseUrlEnonic,
                      innloggingslinjenUrl: process.env.innloggingslinjenUrl,
                      menypunkter: process.env.menypunkter,
                      sokeresultat: process.env.sokeresultat,
                      minsideArbeidsgiverUrl:
                          process.env.minsideArbeidsgiverUrl,
                      varselinnboksUrl: process.env.varselinnboksUrl,
                      dittNavUrl: process.env.dittNavUrl,
                      loginUrl: process.env.loginUrl,
                      logoutUrl: process.env.logoutUrl,
                  }
                : mockEnv),
        },
    });
});

app.get(`${basePath}/api/get/sokeresultat`, (req, res) => {
    const uri = `${process.env.URL_API_SOK || defaultSearchUrl}?ord=${
        req.query.ord
    }`;
    request({ method: 'GET', uri }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send(mockSok);
        }
    });
});

app.get(`${basePath}/api/get/menyvalg`, (req, res) => {
    mainCache.get(mainCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            res.send(response);
        } else {
            fetchmenuOptions(res);
        }
    });
});

const fetchmenuOptions = (res: any) => {
    const uri = process.env.URL_API_MENY || defaultMenuUrl;
    request({ method: 'GET', uri }, (error, response, body) => {
        if (!error && response.statusCode === 200 && body.length > 2) {
            mainCache.set(mainCacheKey, body, 100);
            backupCache.set(backupCacheKey, body, 0);
            res.send(body);
        } else {
            backupCache.get(backupCacheKey, (err, response) => {
                if (!err && response !== undefined) {
                    mainCache.set(mainCacheKey, response, 100);
                    res.send(response);
                } else {
                    const serverErr = {
                        fetchresponse: error,
                        cacheresponse: err,
                    };
                    res.send(mockMenu);
                    mainCache.set(mainCacheKey, mockMenu, (err, success) => {
                        if (!err && success) {
                            console.log('maincache updated successfully');
                        } else {
                            console.log('mainCache-set error :', err);
                            console.log('server error:', serverErr);
                        }
                    });
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
