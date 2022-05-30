import React from 'react';
import ContentLoader from 'react-content-loader';
import './ContentLoaders.less';

export const LinkLoader = ({ id }: { id: string }) => (
    <div className={'content-loader'}>
        <ContentLoader uniqueKey={id} speed={1} width={225} height={18}>
            <rect x="0" y="4" rx="4" ry="4" width="225" height="16" />
        </ContentLoader>
    </div>
);

export const LinksLoader = ({ id }: { id: string }) => (
    <div className={'content-loader'}>
        <ContentLoader speed={1} uniqueKey={id} backgroundColor={'#005077'} foregroundColor={'#196da2'}>
            <rect x="0" y="5" rx="4" ry="4" width="100" height="10" />
            <rect x="0" y="50" rx="4" ry="4" width="135" height="10" />
            <rect x="0" y="95" rx="4" ry="4" width="175" height="10" />
            <rect x="0" y="140" rx="4" ry="4" width="150" height="10" />
            <rect x="0" y="195" rx="4" ry="4" width="150" height="10" />
        </ContentLoader>
    </div>
);
