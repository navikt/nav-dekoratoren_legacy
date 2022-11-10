const fileFaviconIco = require('ikoner/favicon/favicon.ico');
const fileFavicon32x32 = require('ikoner/favicon/favicon-32x32.png');
const fileFavicon128x128 = require('ikoner/favicon/favicon-128x128.png');
const fileFavicon180x180 = require('ikoner/favicon/favicon-180x180.png');
const fileFavicon192x192 = require('ikoner/favicon/favicon-192x192.png');

type FaviconProps = {
    file: string;
    type: string;
    size: number;
};

const favIcons: FaviconProps[] = [
    {
        file: fileFaviconIco,
        type: 'image/x-icon',
        size: 32,
    },
    {
        file: fileFavicon32x32,
        type: 'image/png',
        size: 32,
    },
    {
        file: fileFavicon128x128,
        type: 'image/png',
        size: 128,
    },
    {
        file: fileFavicon180x180,
        type: 'image/png',
        size: 180,
    },
    {
        file: fileFavicon192x192,
        type: 'image/png',
        size: 192,
    },
];

export const injectFaviconLinks = (appUrl: string) => {
    // Should only run client-side
    if (typeof document === 'undefined') {
        return;
    }

    favIcons.forEach(({ file, type, size }) => {
        const iconUrl = `${appUrl}${file}`;

        const linkExists = !!document.querySelector(`link[rel=icon][href="${iconUrl}"]`);
        if (linkExists) {
            return;
        }

        const link = document.createElement('link');
        link.setAttribute('rel', 'icon');
        link.setAttribute('type', type);
        link.setAttribute('href', iconUrl);
        link.setAttribute('sizes', `${size}x${size}`);

        document.head.appendChild(link);
    });
};
