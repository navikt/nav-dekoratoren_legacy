import { CSPDirectives } from 'csp-header/src/types';
import { UNSAFE_EVAL, UNSAFE_INLINE } from 'csp-header/src/constants/values';
import { BLOB, DATA, SELF } from 'csp-header';

const navno = '*.nav.no';
const vergicScreenSharing = '*.psplugin.com';
const boostChatbot = process.env.ENV === 'prod' ? 'nav.boost.ai' : 'staging-nav.boost.ai';
const googleAnalytics = 'www.google-analytics.com';
const googleTagManager = 'www.googletagmanager.com';
const hotjarCom = '*.hotjar.com';
const hotjarIo = '*.hotjar.io';
const taskAnalytics = '*.taskanalytics.com';
const taskAnalyticsHeroku = 'ta-survey-v2.herokuapp.com';

export const cspDirectives: Partial<CSPDirectives> = {
    'default-src': [
        navno,
        // vergic,
        // boost,
        // googleAnalytics,
        // googleTagManager,
        // hotjarCom,
        // hotjarIo,
        // taskAnalytics,
        // taskAnalyticsHeroku,
    ],
    'script-src': [
        navno,
        // vergic,
        // boost,
        // googleAnalytics,
        // googleTagManager,
        // hotjarCom,
        // hotjarIo,
        // taskAnalytics,
        // taskAnalyticsHeroku,
        UNSAFE_INLINE, // GTM
        UNSAFE_EVAL, // vergic
    ],
    'script-src-elem': [googleTagManager, vergicScreenSharing],
    'worker-src': [
        BLOB, // vergic
    ],
    'style-src': [
        navno,
        UNSAFE_INLINE, // vergic, chatbot (styled-components) and some of our own components with style-attributes
    ],
    'font-src': [
        vergicScreenSharing,
        DATA, // ds-css
    ],
    // 'img-src': [vergic, googleAnalytics],
    // 'frame-src': [hotjarCom, hotjarIo, googleTagManager],
    'connect-src': [navno, vergicScreenSharing],
    'report-uri': '/dekoratoren/api/csp-reports',
};
