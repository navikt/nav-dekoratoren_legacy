import { CSPDirectives, UNSAFE_EVAL, UNSAFE_INLINE } from 'csp-header';
import { BLOB, DATA } from 'csp-header';

const navno = '*.nav.no';
const vergicScreenSharing = '*.psplugin.com';
const boostChatbot = '*.boost.ai';
const vimeoPlayer = 'player.vimeo.com'; // used for inline videos in the chat client
const vimeoCdn = '*.vimeocdn.com'; // used for video preview images

const googleAnalytics = 'www.google-analytics.com';
const googleTagManager = 'www.googletagmanager.com';
const hotjarCom = '*.hotjar.com';
const hotjarIo = '*.hotjar.io';
const taskAnalytics = '*.taskanalytics.com';

const directives: Partial<CSPDirectives> = {
    'default-src': [navno],
    'script-src': [
        navno,
        UNSAFE_INLINE, // GTM
        UNSAFE_EVAL, // vergic
    ],
    'script-src-elem': [
        navno,
        vergicScreenSharing,
        googleTagManager,
        googleAnalytics,
        hotjarCom,
        hotjarIo,
        taskAnalytics,
        UNSAFE_INLINE, // GTM
    ],
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
    'img-src': [navno, vergicScreenSharing, googleAnalytics, vimeoCdn],
    'frame-src': [hotjarCom, hotjarIo, googleTagManager, vimeoPlayer],
    'connect-src': [navno, boostChatbot, vergicScreenSharing, googleAnalytics],
    'report-uri': '/dekoratoren/api/csp-reports',
};

const localDirectives = Object.entries(directives).reduce((acc, [key, value]) => {
    return { ...acc, [key]: Array.isArray(value) ? [...value, 'localhost:*'] : value };
}, {});

export const cspDirectives = process.env.ENV === 'localhost' ? localDirectives : directives;
