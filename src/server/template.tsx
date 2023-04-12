import fetch from 'node-fetch';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import Header from 'komponenter/header/Header';
import Footer from 'komponenter/footer/Footer';
import { Request } from 'express';
import { clientEnv, fiveMinutesInSeconds, oneMinuteInSeconds } from './utils';
import { createStore } from 'store';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import { CookiesProvider } from 'react-cookie';
import hash from 'object-hash';
import { fontAttribs } from '../head';

// Local environment - import .env
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const cache = new NodeCache({
    stdTTL: fiveMinutesInSeconds,
    checkperiod: oneMinuteInSeconds,
});

const buildId = process.env.BUILD_ID;

export const template = async (req: Request) => {
    // Set environment based on request params
    const env = clientEnv(req);

    // Resources
    const fileEnv = `${env.APP_URL}/env`;
    // Insert buildId-segment as a cache buster
    const fileCss = `${env.APP_URL}/css/client.${buildId}.css`;
    const fileScript = `${env.APP_URL}/client.${buildId}.js`;

    // Retreive from cache
    const cachedEnvHash = hash({ env });
    const cachedHtml = cache.get(cachedEnvHash);

    if (cachedHtml) {
        return cachedHtml;
    }

    // Create store based on request params
    const store = createStore(env);

    // Fetch params and forward to client
    const params = req.query;
    const paramsAsString = Object.keys(req.query).length ? `?${req.url.split('?')[1]}` : ``;

    // Backward compatibility
    // for simple header and footer
    const headerId = params.header === 'true' ? `header` : `header-withmenu`;
    const footerId = params.footer === 'true' ? `footer` : `footer-withmenu`;

    const language = params.language || 'nb';

    const isExternallyAvailable = env.APP_URL.includes('www.nav.no');

    // Render SSR
    const HtmlHeader = ReactDOMServer.renderToString(
        <ReduxProvider store={store}>
            <CookiesProvider>
                <Header />
            </CookiesProvider>
        </ReduxProvider>
    );

    const HtmlFooter = ReactDOMServer.renderToString(
        <ReduxProvider store={store}>
            <CookiesProvider>
                <Footer />
            </CookiesProvider>
        </ReduxProvider>
    );

    const html = `
    <!DOCTYPE html>
    <html lang=${language}>
        <head>
            <title>NAV Dekoratør</title>
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='description' content='Felles header og footer for nav.no' />
            <meta charset='utf-8' />
            <meta name='robots' content='noindex, nofollow' />
            <!-- Decorator development styling -->
            <!-- Hide decorator-utils-container to prevent content spoofing attacks via the breadcrumbs parameter -->
            <style>
            html, body {  height: 100%; }
            .decorator-dev-container {
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
            }
            .decorator-dummy-app {
                background: #f1f1f1;
                height: 100%;
                min-height: 55rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            ${
                isExternallyAvailable &&
                `.decorator-utils-container {
                display: none !important;
            }`
            }
            </style>
        </head>
        <body>
            <!-- Styling fetched by apps -->
            <div id='styles'>
                <link href='${fileCss}' rel='stylesheet'/>
                <link ${Object.entries(fontAttribs)
                    .map(([key, value]) => `${key}='${value}'`)
                    .join(' ')}/>
            </div>
            <div class='decorator-dev-container'>
                <!-- Header fetched by apps -->
                <div id='${headerId}'>
                    <div id='decorator-header'>${HtmlHeader}</div>
                </div>
                <div class='decorator-dummy-app decorator-wrapper'>
                    <div class='navds-alert navds-alert--info navds-alert--medium'>
                        <span>Hei! Dette er en intern test-side for header og footer på nav.no. <a href='https://www.nav.no'>Gå til forsiden</a>.</span>
                    </div>
                </div>
                <!-- Footer fetched by apps -->
                <div id='${footerId}'>
                    <div id='decorator-footer'>${HtmlFooter}</div>
                </div>
            </div>
            <!-- Scripts fetched by apps -->
            <div id='scripts'>
                <div id='decorator-env' data-src='${fileEnv}${paramsAsString}'></div>
                <script async src='${fileScript}'></script>
                <script id="__DECORATOR_DATA__" type="application/json">
                    ${JSON.stringify({
                        env,
                        menu: await fetch(`${process.env.API_XP_SERVICES_URL}/no.nav.navno/menu`).then((response) => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                throw new Error(`${response.status} - ${response.statusText}`);
                            }
                        }),
                    })}
                </script>
            </div>
            <div id='skiplinks'></div>
            <div id='megamenu-resources'></div>
            <div id='webstats-ga-notrack'></div>
        </body>
    </html>`;

    cache.set(cachedEnvHash, html);
    return html;
};
