import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import LanguageProvider from '../provider/Language-provider';
import Header from '../komponenter/header/Header';
import Footer from '../komponenter/footer/Footer';
import getStore from '../redux/store';
import Environment from '../utils/Environment';
import dotenv from 'dotenv';
const env = dotenv.config();

// Set server-side environment
Environment.settEnv(env.parsed || process.env);

// Favicons
const fileFavicon = require('../../src/ikoner/favicon/favicon.ico');
const fileAppleTouchIcon = require('../../src/ikoner/favicon/apple-touch-icon.png');
const fileFavicon16x16 = require('../../src/ikoner/favicon/favicon-16x16.png');
const fileFavicon32x32 = require('../../src/ikoner/favicon/favicon-32x32.png');
const fileMaskIcon = require('../../src/ikoner/favicon/safari-pinned-tab.svg');

// Resources
const store = getStore();
const baseUrl = `${process.env.APP_BASE_URL}`;
const fileEnv = `${process.env.APP_BASE_URL}/env`;
const fileCss = `${process.env.APP_BASE_URL}/css/client.css`;
const fileScript = `${process.env.APP_BASE_URL}/client.js`;

const htmlHeader = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
        <LanguageProvider>
            <Header />
        </LanguageProvider>
    </ReduxProvider>
);

const htmlFooter = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
        <Footer />
    </ReduxProvider>
);

export const template = (parameters: string) => {
    return `
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
            .decorator-dummy-app{
                background: #f1f1f1;
                height:100%;
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
                <div id="header-withmenu">
                    <section class="navno-dekorator" id="decorator-header" role="main">${htmlHeader}</section>
                </div>
                <div class="decorator-dummy-app"></div>
                <div id="footer-withmenu">
                    <section class="navno-dekorator" id="decorator-footer" role="main">${htmlFooter}</section>
                </div>
            </div>
            <div id="scripts">
                <div id="decorator-env" data-src="${fileEnv}${parameters}"></div>
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
};
