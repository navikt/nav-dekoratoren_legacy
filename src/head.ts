const faviconIco = require('ikoner/favicon/favicon.ico');
const faviconSvg = require('ikoner/favicon/favicon.svg');
const appleTouchIcon = require('ikoner/favicon/apple-touch-icon.png');
const webManifest = require('ikoner/favicon/site.webmanifest');

// Files referred from webmanifest
require('ikoner/favicon/android-chrome-192x192.png');
require('ikoner/favicon/android-chrome-512x512.png');

type Tag = {
    tag: string;
    attribs: Record<string, string>;
};

const getTagsData = (appUrl: string): Tag[] => [
    {
        tag: 'link',
        attribs: {
            rel: 'icon',
            href: `${appUrl}${faviconIco}`,
            sizes: 'any',
        },
    },
    {
        tag: 'link',
        attribs: {
            rel: 'icon',
            href: `${appUrl}${faviconSvg}`,
            type: 'image/svg+xml',
        },
    },
    {
        tag: 'link',
        attribs: {
            rel: 'apple-touch-icon',
            href: `${appUrl}${appleTouchIcon}`,
        },
    },
    {
        tag: 'link',
        attribs: {
            rel: 'manifest',
            href: `${appUrl}${webManifest}`,
        },
    },
    {
        tag: 'link',
        attribs: {
            rel: 'preload',
            href: `https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2`,
            as: 'font',
            type: 'font/woff2',
            crossorigin: 'true',
        },
    },
];

export const injectHeadTags = (appUrl: string) => {
    // Should only run client-side
    if (typeof document === 'undefined') {
        return;
    }

    getTagsData(appUrl).forEach(({ tag, attribs }) => {
        const attribsEntries = Object.entries(attribs);

        const selector = attribsEntries.reduce((acc, [key, value]) => {
            return `${acc}[${key}="${value}"]`;
        }, tag);

        const tagExists = !!document.querySelector(selector);
        if (tagExists) {
            return;
        }

        const element = document.createElement(tag);
        attribsEntries.forEach(([key, value]) => {
            element.setAttribute(key, value);
        });

        document.head.appendChild(element);
    });
};
