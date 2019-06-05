const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('build/'));

const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigin = isProduction
    ? `(http|https)://(.*).nav.no`
    : `http://localhost:8080`;

// Express settings

app.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin && origin.match(allowedOrigin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
    }
    next();
});

app.get('/nav-dekoratoren/fragmenter', (req, res) =>
    res.sendFile('/index.html', { root: './build' })
);

app.get('/nav-dekoratoren/isAlive', (req, res) => res.sendStatus(200));
app.get('/nav-dekoratoren/isReady', (req, res) => res.sendStatus(200));
app.get('/nav-dekoratoren/', (req, res) => res.sendStatus(200));

app.listen(PORT, () => console.log(`App listening on port: 8080`));
