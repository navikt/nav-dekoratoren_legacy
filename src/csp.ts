import { CSPDirectives } from 'csp-header/src/types';
import { UNSAFE_EVAL, UNSAFE_INLINE } from 'csp-header/src/constants/values';
import { BLOB, DATA } from 'csp-header';

const vergic = '*.psplugin.com'; // Screen sharing
const boost = process.env.ENV === 'prod' ? 'nav.boost.ai' : 'staging-nav.boost.ai'; // Chatbot
const googleAnalytics = 'www.google-analytics.com';
const googleTagManager = 'www.googletagmanager.com';
const hotjarCom = '*.hotjar.com';
const hotjarIo = '*.hotjar.io';
const taskAnalytics = '*.taskanalytics.com';
const taskAnalyticsHeroku = 'ta-survey-v2.herokuapp.com';

export const cspDirectives: Partial<CSPDirectives> = {
    // 'default-src': [
    //     vergic,
    //     boost,
    //     googleAnalytics,
    //     googleTagManager,
    //     hotjarCom,
    //     hotjarIo,
    //     taskAnalytics,
    //     taskAnalyticsHeroku,
    // ],
    // 'script-src': [
    //     vergic,
    //     boost,
    //     googleAnalytics,
    //     googleTagManager,
    //     hotjarCom,
    //     hotjarIo,
    //     taskAnalytics,
    //     taskAnalyticsHeroku,
    //     UNSAFE_INLINE,
    //     UNSAFE_EVAL,
    // ],
    // 'worker-src': [BLOB], // blob: Required by vergic
    // 'style-src': [vergic, UNSAFE_INLINE], // unsafe-inline required by vergic
    // 'font-src': [vergic, DATA],
    // 'img-src': [vergic, googleAnalytics],
    // 'frame-src': [hotjarCom, hotjarIo, googleTagManager],
    'report-uri': '/dekoratoren/api/csp-reports',
};
