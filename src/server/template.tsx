import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import LanguageProvider from '../provider/Language-provider';
import Header from '../komponenter/header/Header';
import Footer from '../komponenter/footer/Footer';
import { Request } from 'express';
import { clientEnv } from './utils';
import hash from 'object-hash';

import { createStore } from '../redux/store';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

// Local environment - import .env
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Favicons
const fileFavicon = require('../../src/ikoner/favicon/favicon.ico');
const fileAppleTouchIcon = require('../../src/ikoner/favicon/apple-touch-icon.png');
const fileFavicon16x16 = require('../../src/ikoner/favicon/favicon-16x16.png');
const fileFavicon32x32 = require('../../src/ikoner/favicon/favicon-32x32.png');
const fileMaskIcon = require('../../src/ikoner/favicon/safari-pinned-tab.svg');

// Resources
const baseUrl = `${process.env.APP_BASE_URL}`;
const fileEnv = `${process.env.APP_BASE_URL}/env`;
const fileCss = `${process.env.APP_BASE_URL}/css/client.css`;
const fileScript = `${process.env.APP_BASE_URL}/client.js`;

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const template = (req: Request) => {
    // Set environment based on request params
    const env = clientEnv(req);
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
            <LanguageProvider>
                <Header />
            </LanguageProvider>
        </ReduxProvider>
    );

    const HtmlFooter = ReactDOMServer.renderToString(
        <ReduxProvider store={store}>
            <Footer />
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
            .decorator-dummy-app {np
                background: #8888;
                height: 100%;
                min-height: 25rem;
                display: flex;
                justify-content: center;
                align-items: center;
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
                <script type="text/javascript" src=${fileScript}></script>
                <script 
                    src="https://account.psplugin.com/83BD7664-B38B-4EEE-8D99-200669A32551/ps.js" 
                    integrity="sha384-O8gbAZERPHZ6hLuGmdmxg66Z9i2XwrCJqQMqhyXGroS3nsNvMetwFTJgRpDRd3a5" 
                    crossorigin="anonymous"></script>
            </div>
            <div id="skiplinks"></div>
            <div id="megamenu-resources"></div>
            <div id="webstats-ga-notrack"></div>
        </body>
    </html>`;

    cache.set(envHash, html);
    return html;
};
