import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import Header from '../komponenter/header/Header';
import Footer from '../komponenter/footer/Footer';
import Styles from '../komponenter/styles/Styles';
import { Request } from 'express';
import { clientEnv } from './utils';
import hash from 'object-hash';

import { createStore } from '../store';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import { CookiesProvider } from 'react-cookie';

// Local environment - import .env
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Resources
const fileEnv = `${process.env.APP_BASE_URL}/env`;
const fileScript = `${process.env.APP_BASE_URL}/client.js`;

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const template = (req: Request) => {
    // Set environment based on request params
    const universalCookies = (req as any).universalCookies;
    const cookies = universalCookies.cookies;
    const env = clientEnv({ req, cookies });

    const envHash = hash({ env });
    const cachedHtml = cache.get(envHash);

    // Retreive from cache
    if (cachedHtml) {
        return cachedHtml;
    }

    // Create store based on request params
    const store = createStore(env);

    // Fetch params and forward to client
    const params = req.query;
    const paramsAsString = Object.keys(req.query).length
        ? `?${req.url.split('?')[1]}`
        : ``;

    // Backward compatibility
    // for simple header and footer
    const headerId = params.header ? `header` : `header-withmenu`;
    const footerId = params.footer ? `footer` : `footer-withmenu`;

    // Render SSR
    const HtmlHeader = ReactDOMServer.renderToString(
        <ReduxProvider store={store}>
            <CookiesProvider cookies={universalCookies}>
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

    const HtmlStyles = ReactDOMServer.renderToString(
        <ReduxProvider store={store}>
            <CookiesProvider cookies={universalCookies}>
                <Styles />
            </CookiesProvider>
        </ReduxProvider>
    );

    const html = `
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
            <style>
            /* Decorator development styling */
            html, body {  height: 100%; }
            .decorator-dev-container {
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
            }
            .decorator-dummy-app {
                background: #8888;
                height: 100%;
                min-height: 75rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            </style>
            <div id="styles">
                <section id="decorator-styles" role="main">${HtmlStyles}</section>
            </div>
        </head>
        <body>
            <div class="decorator-dev-container">
                <div id="${headerId}">
                    <section class="navno-dekorator" id="decorator-header" role="main">${HtmlHeader}</section>
                </div>
                <div class="decorator-dummy-app">
                </div>
                <div id="${footerId}">
                    <section class="navno-dekorator" id="decorator-footer" role="main">${HtmlFooter}</section>
                </div>
            </div>
            <div id="scripts">
                <div id="decorator-env" data-src="${fileEnv}${paramsAsString}"></div>
                <script src="https://account.psplugin.com/83BD7664-B38B-4EEE-8D99-200669A32551/ps.js"></script>
                <script type="text/javascript" src=${fileScript}></script>
            </div>
            <div id="skiplinks"></div>
            <div id="megamenu-resources"></div>
            <div id="webstats-ga-notrack"></div>
        </body>
    </html>`;

    cache.set(envHash, html);
    return html;
};
