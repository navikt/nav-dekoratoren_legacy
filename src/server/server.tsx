/* tslint:disable:typedef no-shadowed-variable */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
import FS from 'fs';
import NodeCache from 'node-cache';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import request from 'request';
import { Provider as ReduxProvider } from 'react-redux';
import Footer from '../komponenter/footer/Footer';
import getStore from './../redux/store';
import Head from '../Head';

const basePath = '/person/nav-dekoratoren';
const favicon = require('../../public/favicon.ico');
const isProduction = process.env.NODE_ENV === 'production';
const buildPath = `${process.cwd()}/buildfolder`;
const app = express();
const PORT = 8088;

// Default vars
const defaultSearchUrl = `https://www-x1.nav.no/www.nav.no/sok/_/service/navno.nav.no.search/search2`;
const defaultMenuUrl = `http://localhost:8080/navno/_/service/no.nav.navno/menu`;
const defaultAppUrl = `http://localhost:8088`;

// Mock
import mockMenu from './mock/menu.json';
import mockSok from './mock/sokeresultat.json';

// Cache setup
const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';
const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

// Environment
const env = {
    urlXpBase: 'TEST',
    urlAppBase: process.env.URL_APP_BASE,
};

FS.writeFile(`${buildPath}/env.json`, JSON.stringify(env), err =>
    console.error(err)
);

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

// Server-side rendering
const store = getStore();
const fileEnv = `${process.env.URL_APP_BASE || defaultAppUrl}/.env`;
const fileCss = `${process.env.URL_APP_BASE || defaultAppUrl}/css/client.css`;
const fileScript = `${process.env.URL_APP_BASE || defaultAppUrl}/client.js`;
const htmlHeader = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
        <Head />
    </ReduxProvider>
);
const htmlFooter = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
        <Footer />
    </ReduxProvider>
);

const template = `
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
            <link rel="icon" href=${favicon} type="image/x-icon" />
            <title>NAV Dekoratør</title>
            <div id="styles">
                <link href=${fileCss} rel="stylesheet" />
            </div>
        </head>
        <body>
            <div id="header-withmenu">
                <div id="decorator-env" data-src="${fileEnv}"></div>
                <section id="decorator-header" role="main">${htmlHeader}</section>
            </div>
            <div id="footer-withmenu">
                <section id="decorator-footer" role="main">${htmlFooter}</section>
            </div>
            <div id="scripts">
                <script type="text/javascript" src=${fileScript}></script>
            </div>
            <div id="megamenu-resources"></div>
            <div id="webstats-ga-notrack"></div>
        </body>
    </html>`;

// Express config
const pathsForTemplate = [
    `${basePath}/`,
    `${basePath}/person`,
    `${basePath}/person/*`,
    `${basePath}/bedrift`,
    `${basePath}/bedrift/*`,
    `${basePath}/samarbeidspartner`,
    `${basePath}/samarbeidspartner/*`,
];

app.get(pathsForTemplate, (req, res) => {
    res.send(template);
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

app.get(`${basePath}/api/get/sokeresultat`, (req, res) => {
    fetchSearchResults(req, res);
});

app.use(`${basePath}/`, express.static(buildPath));
app.get(`${basePath}/isAlive`, (req, res) => res.sendStatus(200));
app.get(`${basePath}/isReady`, (req, res) => res.sendStatus(200));

const fetchmenuOptions = (res: any) => {
    request(
        { method: 'GET', uri: process.env.URL_APP_MENY || defaultMenuUrl },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
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
                        mainCache.set(
                            mainCacheKey,
                            mockMenu,
                            (err, success) => {
                                if (!err && success) {
                                    console.log(
                                        'maincache updated successfully'
                                    );
                                } else {
                                    console.log('mainCache-set error :', err);
                                    console.log('server error:', serverErr);
                                }
                            }
                        );
                    }
                });
            }
        }
    );
};

const fetchSearchResults = (req: any, res: any) => {
    const uri = `${process.env.URL_APP_SOK || defaultSearchUrl}?ord=${
        req.query.ord
    }`;
    if (isProduction) {
        request({ method: 'GET', uri }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                res.send(body);
            } else {
                res.send(mockSok);
            }
        });
    } else {
        res.send(mockSok);
    }
};

const server = app.listen(PORT, () =>
    console.log(`App listening on port: ${PORT}`)
);

function shutdown() {
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
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
