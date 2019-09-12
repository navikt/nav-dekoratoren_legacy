const express = require('express');
const app = express();
const PORT = 8088;
const path = require('path');
const buildPath = path.resolve(__dirname, '../../build/');
const requestNode = require('request');
const NodeCache = require('node-cache');
const backupData = require('./menu/menu.json');
const sokeresultatMockData = require('./sokeresultat-mockdata.json');

const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const mainCacheKey = 'navno-menu';
const backupCacheKey = 'navno-menu-backup';

const isProduction = process.env.NODE_ENV === 'production';

const env = process.env.MENYLENKER
    ? process.env.MENYLENKER
    : 'https://www-x1.nav.no/navno/_/service/no.nav.navno/menu';

const fetchmenyUri = isProduction ? env : 'http://localhost:8088';

const envSok = process.env.SOKERESULTAT
    ? process.env.SOKERESULTAT
    : 'https://www-x1.nav.no/www.nav.no/sok/_/service/navno.nav.no.search/search2';

const fetchSearchResultUri = isProduction ? envSok : 'http://localhost:8088';

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

app.use('/person/nav-dekoratoren/', express.static(buildPath));

app.get(
    [
        '/person/nav-dekoratoren/',
        '/person/nav-dekoratoren/person/',
        '/person/nav-dekoratoren/bedrift/',
        '/person/nav-dekoratoren/samarbeidspartner/',
    ],
    (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
    }
);

const fetchmenuOptions = res => {
    requestNode(
        {
            method: 'GET',
            uri: `${fetchmenyUri}`,
        },
        (error, response, body) => {
            // satt til false, slik at vi leser at backupData til vi har fått fikset riktig endepunkt i enonic-xp
            if (false && !error && response.statusCode === 200) {
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
    const uri = `${fetchSearchResultUri}?ord=${req.query.ord}`;

    requestNode(
        {
            method: 'GET',
            uri,
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                res.send(body);
            } else {
                console.log('server error:', error);
                res.send(sokeresultatMockData);
            }
        }
    );
};

app.get('/person/nav-dekoratoren/api/get/menyvalg', (req, res) => {
    mainCache.get(mainCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            res.send(response);
        } else fetchmenuOptions(res);
    });
});

app.get('/person/nav-dekoratoren/api/get/sokeresultat', (req, res) => {
    console.log('req:', req);
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
