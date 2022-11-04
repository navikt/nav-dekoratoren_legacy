import { CSPDirectives, UNSAFE_EVAL, UNSAFE_INLINE, BLOB, DATA } from 'csp-header';

const navno = '*.nav.no';
const vergicScreenSharing = '*.psplugin.com';
const boostChatbot = '*.boost.ai';
const vimeoPlayer = 'player.vimeo.com'; // used for inline videos in the chat client
const qbrick = 'video.qbrick.com'; // used for inline videos in the chat client
const vimeoCdn = '*.vimeocdn.com'; // used for video preview images

const googleAnalytics = '*.google-analytics.com';
const googleTagManager = '*.googletagmanager.com';
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
        UNSAFE_INLINE, // chatbot (styled-components) and some of our own components with style-attributes
    ],
    'style-src-elem': [
        navno,
        vergicScreenSharing,
        UNSAFE_INLINE, // vergic
    ],
    'font-src': [
        vergicScreenSharing,
        DATA, // ds-css
    ],
    'img-src': [navno, vergicScreenSharing, googleAnalytics, vimeoCdn],
    'frame-src': [hotjarCom, hotjarIo, googleTagManager, vimeoPlayer, qbrick],
    'connect-src': [navno, boostChatbot, vergicScreenSharing, googleAnalytics, hotjarCom, hotjarIo, taskAnalytics],
};

const localDirectives = Object.entries(directives).reduce((acc, [key, value]) => {
    return { ...acc, [key]: Array.isArray(value) ? [...value, 'localhost:*'] : value };
}, {});

export const cspDirectives = process.env.ENV === 'localhost' ? localDirectives : directives;
