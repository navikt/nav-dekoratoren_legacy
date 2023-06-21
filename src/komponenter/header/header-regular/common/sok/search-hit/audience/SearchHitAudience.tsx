import React from 'react';
import { Tag, TagProps } from '@navikt/ds-react';
import { Audience, Language, Soketreff } from '../../utils';
import { getTranslations } from '../translations';

import style from './SearchHitAudience.module.scss';

const variant: Record<Audience, TagProps['variant']> = {
    person: 'info',
    employer: 'alt1',
    provider: 'alt2',
    other: 'neutral',
};

type Props = {
    audience: Required<Soketreff>['audience'];
    language: Language;
};

export const SearchHitAudience = ({ audience, language }: Props) => {
    const audiences = Array.isArray(audience) ? audience : [audience];

    return (
        <>
            {audiences.map((aud) => {
                if (!variant[aud]) {
                    console.error(`Invalid audience: ${aud}`);
                    return null;
                }

                return (
                    <Tag variant={variant[aud]} className={style.tag} size={'small'} key={aud}>
                        {getTranslations(language)[aud]}
                    </Tag>
                );
            })}
        </>
    );
};
