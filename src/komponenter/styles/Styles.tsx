import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

// Favicons
const fileFavicon = require('ikoner/favicon/favicon.ico');
const fileAppleTouchIcon = require('ikoner/favicon/apple-touch-icon.png');
const fileFavicon16x16 = require('ikoner/favicon/favicon-16x16.png');
const fileFavicon32x32 = require('ikoner/favicon/favicon-32x32.png');
const fileMaskIcon = require('ikoner/favicon/safari-pinned-tab.svg');

const Styles = () => {
    const { APP_BASE_URL, XP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );

    const Elements = [
        {
            id: 'file-favicon',
            component: ({ id }: { id: string }) => (
                <link
                    id={id}
                    rel="icon"
                    type="image/x-icon"
                    href={`${XP_BASE_URL}${fileFavicon}`}
                />
            ),
        },
        {
            id: 'file-favicon-16x16',
            component: ({ id }: { id: string }) => (
                <link
                    id={id}
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`${XP_BASE_URL}${fileFavicon16x16}`}
                />
            ),
        },
        {
            id: 'file-favicon-32x32',
            component: ({ id }: { id: string }) => (
                <link
                    id={id}
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={`${XP_BASE_URL}${fileFavicon32x32}`}
                />
            ),
        },
        {
            id: 'file-apple-touch-icon',
            component: ({ id }: { id: string }) => (
                <link
                    id={id}
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={`${XP_BASE_URL}${fileAppleTouchIcon}`}
                />
            ),
        },
        {
            id: 'file-mask-icon',
            component: ({ id }: { id: string }) => (
                <link
                    id={id}
                    rel="mask-icon"
                    color="#5bbad5"
                    href={`${XP_BASE_URL}${fileMaskIcon}`}
                />
            ),
        },
        {
            id: 'decorator-style',
            component: ({ id }: { id: string }) => (
                <link
                    id={id}
                    href={`${APP_BASE_URL}/css/client.css`}
                    rel="stylesheet"
                />
            ),
        },
    ];

    // CSR (Client-side-rendering)
    /*
    if (typeof window !== 'undefined') {
        Elements.map((Element) => {
            if (!document.getElementById(Element.id)) {
                document.head.insertAdjacentHTML(
                    'beforeend',
                    ReactDOMServer.renderToString(Element.component)
                );
            }
        });
    }
    */

    // SSR (Server-side-rendering)
    return (
        <>
            {Elements.map((Element) => (
                <Fragment key={Element.id}>
                    <Element.component id={Element.id} />
                </Fragment>
            ))}
        </>
    );
};

export default Styles;
