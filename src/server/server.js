const express = require('express');
const app = express();
const PORT = 8088;
const fs = require('fs');
const path = require('path');
const buildPath = path.resolve(__dirname, '../../build/');
const request = require('request');
const NodeCache = require('node-cache');
const backupData = require('./menu/menu.json');
const sokeresultatMockData = require('./sokeresultat-mockdata.json');
const basePath = '/person/nav-dekoratoren';

// Config cache
const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';

// Config express
app.disable('x-powered-by');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

app.use(`${basePath}/`, express.static(buildPath));

app.get(
    [
        `${basePath}/`,
        `${basePath}/person/*`,
        `${basePath}/bedrift/*`,
        `${basePath}/samarbeidspartner/*`,
    ],
    (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
    }
);

app.get(`${basePath}/api/get/menyvalg`, (req, res) =>
    mainCache.get(mainCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            res.send(response);
        } else {
            fetchmenuOptions(res);
        }
    })
);

app.get(`${basePath}/api/get/sokeresultat`, (req, res) =>
    fetchSearchResults(req, res)
);

app.get(`${basePath}/isAlive`, (req, res) => res.sendStatus(200));
app.get(`${basePath}/isReady`, (req, res) => res.sendStatus(200));

const fetchmenuOptions = res => {
    request(
        { method: 'GET', uri: process.env.MENYLENKER },
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

const fetchSearchResults = (req, res) => {
    const uri = `${process.env.SOKERESULTAT}?ord=${req.query.ord}`;
    request({ method: 'GET', uri }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send(sokeresultatMockData);
        }
    });
};

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
