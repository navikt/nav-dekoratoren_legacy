import { CSPDirectives, UNSAFE_EVAL, UNSAFE_INLINE, BLOB, DATA } from 'csp-header';

const navno = '*.nav.no';
const vergicScreenSharing = '*.psplugin.com';
const vergicDotCom = 'www.vergic.com'; // seems to only be used for a single unused image
const boostChatbot = '*.boost.ai';
const vimeoPlayer = 'player.vimeo.com'; // used for inline videos in the chat client
const qbrick = 'video.qbrick.com'; // used for inline videos in the chat client
const vimeoCdn = '*.vimeocdn.com'; // used for video preview images

const googleAnalytics = '*.google-analytics.com';
const googleTagManager = '*.googletagmanager.com';
const hotjarCom = '*.hotjar.com';
const hotjarIo = '*.hotjar.io';
const taskAnalytics = '*.taskanalytics.com';
const navCdn = 'https://cdn.nav.no';

const styleSrc = [
    navno,
    vergicScreenSharing,
    UNSAFE_INLINE, // chatbot (styled-components) and some of our own components with style-attributes
];

const scriptSrc = [
    navno,
    vergicScreenSharing,
    googleTagManager,
    googleAnalytics,
    hotjarCom,
    taskAnalytics,
    UNSAFE_INLINE, // GTM
];

const directives: Partial<CSPDirectives> = {
    'default-src': [navno],
    'script-src': [
        ...scriptSrc,
        UNSAFE_EVAL, // vergic
    ],
    'script-src-elem': scriptSrc,
    'worker-src': [
        BLOB, // vergic
    ],
    'style-src': styleSrc,
    'style-src-elem': styleSrc,
    'font-src': [
        vergicScreenSharing,
        hotjarCom,
        navCdn,
        DATA, // ds-css
    ],
    'img-src': [navno, vergicScreenSharing, googleAnalytics, vimeoCdn, hotjarCom, googleTagManager, vergicDotCom],
    'frame-src': [hotjarCom, googleTagManager, vimeoPlayer, qbrick],
    'connect-src': [navno, boostChatbot, vergicScreenSharing, googleAnalytics, hotjarCom, hotjarIo, taskAnalytics],
};

const localDirectives = Object.entries(directives).reduce((acc, [key, value]) => {
    return { ...acc, [key]: Array.isArray(value) ? [...value, 'localhost:*'] : value };
}, {});

export const cspDirectives = process.env.ENV === 'localhost' ? localDirectives : directives;
