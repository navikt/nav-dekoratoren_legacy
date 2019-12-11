/* tslint:disable:typedef no-shadowed-variable */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
import NodeCache from 'node-cache';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import backupData from './menu/menu.json';
import requestNode from 'request';
const sokeresultatMockData = require('./sokeresultat-mockdata.json');
import { Provider as ReduxProvider } from 'react-redux';
import Footer from '../komponenter/footer/Footer';
import getStore from './../redux/store';
import Head from '../Head';
const app = express();
const PORT = 8088;

const favicon = require('../../public/favicon.ico');

const envSok = process.env.SOKERESULTAT
    ? process.env.SOKERESULTAT
    : 'https://www-x1.nav.no/www.nav.no/sok/_/service/navno.nav.no.search/search2';

const isProduction = process.env.NODE_ENV === 'production';

const fetchSearchResultUri = isProduction ? envSok : 'http://localhost:8088';
const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';
const env = process.env.MENYLENKER
    ? process.env.MENYLENKER
    : 'https://www-x1.nav.no/navno/_/service/no.nav.navno/menu';

const fetchmenyUri = isProduction
    ? env
    : 'http://localhost:8080/navno/_/service/no.nav.navno/menu';

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

const store = getStore();

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

app.use(
    '/person/nav-dekoratoren/',
    express.static(`${process.cwd()}/buildfolder`)
);

const script = isProduction
    ? process.env.SCRIPTURL
    : 'http://localhost:8088/person/nav-dekoratoren/client.js';

const css = isProduction
    ? process.env.CSSURL
    : 'http://localhost:8088/person/nav-dekoratoren/css/client.css';

app.get(
    [
        '/person/nav-dekoratoren/',
        '/person/nav-dekoratoren/person',
        '/person/nav-dekoratoren/person/*',
        '/person/nav-dekoratoren/bedrift',
        '/person/nav-dekoratoren/bedrift/*',
        '/person/nav-dekoratoren/samarbeidspartner',
        '/person/nav-dekoratoren/samarbeidspartner/*',
    ],
    (req, res) => {
        res.send(`
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
        </div>
        <div id="megamenu-resources"></div>
        <div id="webstats-ga-notrack"></div>
    </body>
</html>`);
    }
);

const fetchmenuOptions = (res: any) => {
    requestNode(
        {
            method: 'GET',
            uri: `${fetchmenyUri}`,
        },
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

app.get('/person/nav-dekoratoren/api/get/menyvalg', (req, res) => {
    mainCache.get(mainCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            res.send(response);
        } else {
            fetchmenuOptions(res);
        }
    });
});

const fetchSearchResults = (req: any, res: any) => {
    const uri = `${fetchSearchResultUri}?ord=${req.query.ord}`;
    if (isProduction) {
        requestNode(
            {
                method: 'GET',
                uri,
            },
            (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    res.send(body);
                } else {
                    res.send(sokeresultatMockData);
                }
            }
        );
    } else {
        res.send(sokeresultatMockData);
    }
};

app.get('/person/nav-dekoratoren/api/get/sokeresultat', (req, res) => {
    fetchSearchResults(req, res);
});

app.get('/person/nav-dekoratoren/isAlive', (req, res) => res.sendStatus(200));
app.get('/person/nav-dekoratoren/isReady', (req, res) => res.sendStatus(200));
app.get('/person/nav-dekoratoren/', (req, res) => res.sendStatus(200));

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
