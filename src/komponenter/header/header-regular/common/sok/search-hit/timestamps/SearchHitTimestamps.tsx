import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { Soketreff } from '../../utils';
import dayjs from 'dayjs';
import { getTranslations } from '../translations';

const formatDate = (datetime: string) => (datetime ? dayjs(datetime).format('DD.MM.YYYY') : '');

const createPublishedAndModifiedString = ({
    publish,
    modifiedTime,
    createdTime,
    language,
    hidePublishDate,
    hideModifiedDate,
}: Soketreff) => {
    if (hidePublishDate && hideModifiedDate) {
        return '';
    }

    const publishedTime = publish?.first || createdTime;

    if (hidePublishDate) {
        return modifiedTime ? `${getTranslations(language).lastModified} ${formatDate(modifiedTime)}` : '';
    }

    const publishedString = `${getTranslations(language).published} ${formatDate(publishedTime)}`;

    const isModifiedSincePublishedTime = modifiedTime && dayjs(modifiedTime).unix() > dayjs(publishedTime).unix();

    if (!isModifiedSincePublishedTime) {
        return publishedString;
    }

    return `${publishedString} | ${getTranslations(language).lastModified} ${formatDate(modifiedTime)}`;
};

type Props = {
    hit: Soketreff;
};

export const SearchHitTimestamps = ({ hit }: Props) => {
    const publishedString = createPublishedAndModifiedString(hit);

    return <BodyShort size={'small'}>{publishedString}</BodyShort>;
};
