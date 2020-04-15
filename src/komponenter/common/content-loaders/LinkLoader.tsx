import React from 'react';
import ContentLoader from 'react-content-loader';

export const LinkLoader = () => (
    <ContentLoader speed={1}>
        <rect x="0" y="10" rx="4" ry="4" width="350" height="16" />
    </ContentLoader>
);

export const LinksLoader = () => (
    <ContentLoader
        speed={1}
        backgroundColor={'white'}
        foregroundColor={'lightgray'}
    >
        <rect x="0" y="0" rx="4" ry="4" width="150" height="10" />
        <rect x="0" y="40" rx="4" ry="4" width="200" height="10" />
        <rect x="0" y="80" rx="4" ry="4" width="100" height="10" />
        <rect x="0" y="120" rx="4" ry="4" width="125" height="10" />
    </ContentLoader>
);
