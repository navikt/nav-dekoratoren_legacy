import React from 'react';
import ContentLoader from 'react-content-loader';

export const LinkLoader = ({ id }: { id: string }) => (
    <ContentLoader uniqueKey={id} speed={1} viewBox="0 0 200 26">
        <rect x="0" y="10" rx="4" ry="4" width="200" height="16" />
    </ContentLoader>
);

export const LinksLoader = ({ id }: { id: string }) => (
    <ContentLoader
        speed={1}
        uniqueKey={id}
        backgroundColor={'white'}
        foregroundColor={'lightgray'}
    >
        <rect x="0" y="5" rx="4" ry="4" width="100" height="10" />
        <rect x="0" y="50" rx="4" ry="4" width="135" height="10" />
        <rect x="0" y="95" rx="4" ry="4" width="175" height="10" />
        <rect x="0" y="140" rx="4" ry="4" width="150" height="10" />
    </ContentLoader>
);
