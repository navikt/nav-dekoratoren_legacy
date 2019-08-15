const express = require('express');
const app = express();
const PORT = 8088;
const path = require('path');
const buildPath = path.resolve(__dirname, '../../build/');
const request = require('request');
const NodeCache = require('node-cache');

const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';

const isProduction = process.env.NODE_ENV === 'production';
const fetchmenyUri = isProduction
    ? process.env.MENYLENKER
    : 'http://localhost:8080';

const allowedOrigin = isProduction
    ? `(http|https)://(.*).nav.no`
    : `http://localhost:8080`;

app.disable('x-powered-by');

app.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin && origin.match(allowedOrigin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    next();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

if (!process.env.DEVELOPMENT) {
    app.use(['/person/nav-dekoratoren/'], express.static(buildPath));

    app.get(['/person/nav-dekoratoren/*'], (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../build/index.html'));
    });
}

const fetchmenuOptions = res => {
    request(
        {
            method: 'GET',
            uri: `${fetchmenyUri}/navno/_/service/no.nav.navno/menu`,
        },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
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
                        console.log(serverErr);
                        res.sendFile(
                            path.resolve(__dirname, './menu/no.menu.json')
                        );
                    }
                });
            }
        }
    );
};

app.get('/api/get/menyvalg', (req, res) => {
    mainCache.get('navno-menu', (err, response) => {
        if (!err && response !== undefined) {
            res.send(response);
        } else fetchmenuOptions(res);
    });
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
