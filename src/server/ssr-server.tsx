/* tslint:disable:typedef no-shadowed-variable */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
import NodeCache from 'node-cache';
import express from 'express';
import React from 'react';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import backupData from './menu/menu.json';
import request from 'request';
import { Provider as ReduxProvider } from 'react-redux';
import Footer from '../komponenter/footer/Footer';
import getStore from './../redux/store';
import Head from '../Head';

const basePath = '/person/nav-dekoratoren';
const sokeresultatMockData = require('./sokeresultat-mockdata.json');
const favicon = require('../../public/favicon.ico');
const isProduction = process.env.NODE_ENV === 'production';
const buildPath = `${process.cwd()}/buildfolder`;
const app = express();
const PORT = 8088;

// Default vars
const defaultSearchUrl = `https://www-x1.nav.no/www.nav.no/sok/_/service/navno.nav.no.search/search2`;
const defaultMenuUrl = `http://localhost:8080/navno/_/service/no.nav.navno/menu`;
const defaultScriptUrl = `http://localhost:8088/person/nav-dekoratoren/client.js`;
const defaultCssUrl = `http://localhost:8088/person/nav-dekoratoren/css/client.css'`;

// Cache setup
const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';

// Environment
const env = {
    miljo: process.env.NAMESPACE,
    baseUrl: `https://www-q6.nav.no`,
    baseUrlEnonic: `https://www-x1.nav.no`,
    innloggingslinjenUrl: `https://tjenester-q6.nav.no`,
    loginUrl: `https://loginservice-q.nav.no`,
    logoutUrl: `https://loginservice-q.nav.no/slo`,
    menypunkter: `https://www-q0.nav.no/person/nav-dekoratoren/api/get/menyvalg`,
    minsideArbeidsgiverUrl: `https://arbeidsgiver-q6.nav.no/min-side-arbeidsgiver/`,
    sokeresultat: `https://www-q0.nav.no/person/nav-dekoratoren/api/get/sokeresultat`,
};

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
const script = process.env.SCRIPTURL || defaultScriptUrl;
const css = process.env.CSSURL || defaultCssUrl;
const header = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
        <Head />
    </ReduxProvider>
);
const footer = ReactDOMServer.renderToString(
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
                <link href=${css} rel="stylesheet" />
            </div>
        </head>
        <body>
            <div id="header-withmenu">
                <section id="decorator-header" role="main">${header}</section>
            </div>
            <div id="footer-withmenu">
                <section id="decorator-footer" role="main">${footer}</section>
            </div>
            <div id="scripts">
                <script type="text/javascript" src=${script}></script>
                <script type="text/javascript" >
                    var env = ${env};
                </script>
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
        { method: 'GET', uri: process.env.MENYLENKER || defaultMenuUrl },
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
                        res.send(backupData);
                        mainCache.set(
                            mainCacheKey,
                            backupData,
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
    const uri = `${process.env.SOKERESULTAT || defaultSearchUrl}?ord=${
        req.query.ord
    }`;
    if (isProduction) {
        request({ method: 'GET', uri }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                res.send(body);
            } else {
                res.send(sokeresultatMockData);
            }
        });
    } else {
        res.send(sokeresultatMockData);
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
