import { CSPDirectives, UNSAFE_EVAL, UNSAFE_INLINE } from 'csp-header';
import { BLOB, DATA } from 'csp-header';

const localhost = process.env.ENV === 'localhost' ? 'localhost:*' : '';

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

export const cspDirectives: Partial<CSPDirectives> = {
    'default-src': [navno, localhost],
    'script-src': [
        navno,
        UNSAFE_INLINE, // GTM
        UNSAFE_EVAL, // vergic
        localhost,
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
        localhost,
    ],
    'worker-src': [
        BLOB, // vergic
    ],
    'style-src': [
        navno,
        UNSAFE_INLINE, // vergic, chatbot (styled-components) and some of our own components with style-attributes
        localhost,
    ],
    'font-src': [
        vergicScreenSharing,
        DATA, // ds-css
    ],
    'img-src': [navno, vergicScreenSharing, googleAnalytics, vimeoCdn, localhost],
    'frame-src': [hotjarCom, hotjarIo, googleTagManager, vimeoPlayer],
    'connect-src': [navno, boostChatbot, vergicScreenSharing, googleAnalytics, localhost],
    'report-uri': '/dekoratoren/api/csp-reports',
};
