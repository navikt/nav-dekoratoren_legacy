import { CSPDirectives, UNSAFE_EVAL, UNSAFE_INLINE, BLOB, DATA } from 'csp-header';

const navNo = '*.nav.no';
const cdnNavNo = 'cdn.nav.no';

const vergicScreenSharing = '*.psplugin.com';
const vergicDotCom = 'www.vergic.com'; // seems to only be used for a single placeholder image
const boostChatbot = '*.boost.ai';
const boostScript = process.env.ENV === 'prod' ? 'nav.boost.ai' : 'navtest.boost.ai';
const vimeoPlayer = 'player.vimeo.com'; // used for inline videos in the chat client
const qbrick = 'video.qbrick.com'; // used for inline videos in the chat client
const vimeoCdn = '*.vimeocdn.com'; // used for video preview images

const hotjarCom = '*.hotjar.com';
const hotjarIo = '*.hotjar.io';
const taskAnalytics = '*.taskanalytics.com';
const googleStorage = 'storage.googleapis.com';

const styleSrc = [
    navNo,
    vergicScreenSharing,
    UNSAFE_INLINE, // various components with style-attributes
];

const scriptSrc = [
    navNo,
    vergicScreenSharing,
    hotjarCom,
    taskAnalytics,
    boostScript,
    UNSAFE_INLINE, // vergic, hotjar
];

const workerSrc = [
    BLOB, // vergic
];

const directives: Partial<CSPDirectives> = {
    'default-src': [navNo],
    'script-src': [
        ...scriptSrc,
        UNSAFE_EVAL, // vergic
    ],
    'script-src-elem': scriptSrc,
    'worker-src': workerSrc,
    'child-src': workerSrc, // for browsers lacking support for worker-src
    'style-src': styleSrc,
    'style-src-elem': styleSrc,
    'font-src': [
        vergicScreenSharing,
        hotjarCom,
        cdnNavNo,
        DATA, // ds-css
    ],
    'img-src': [navNo, vergicScreenSharing, vimeoCdn, hotjarCom, vergicDotCom, googleStorage],
    'frame-src': [hotjarCom, vimeoPlayer, qbrick],
    'connect-src': [navNo, boostChatbot, vergicScreenSharing, hotjarCom, hotjarIo, taskAnalytics],
};

const localDirectives = Object.entries(directives).reduce((acc, [key, value]) => {
    return { ...acc, [key]: Array.isArray(value) ? [...value, 'localhost:*'] : value };
}, {});

export const cspDirectives = process.env.ENV === 'localhost' ? localDirectives : directives;
