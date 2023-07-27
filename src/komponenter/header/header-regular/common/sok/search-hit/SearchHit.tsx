import React from 'react';
import htmlReactParser from 'html-react-parser';
import { BodyLong, LinkPanel } from '@navikt/ds-react';
import { SearchHitOfficeInformation } from './office-information/SearchHitOfficeInformation';
import { SearchHitAudience } from './audience/SearchHitAudience';
import { SearchHitTimestamps } from './timestamps/SearchHitTimestamps';
import style from './SearchHit.module.scss';
import { Soketreff } from '../utils';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import { useDispatch } from 'react-redux';

const parseHighlight = (highlight: string) => {
    return htmlReactParser(
        // trim whitespace
        highlight.replace(/(\r\n|\n|\r)/gm, '')
    );
};

type Props = {
    id: string;
    hit: Soketreff;
    hitIndex: number;
};

export const SearchHit = ({ id, hit, hitIndex }: Props) => {
    const { displayName, href, highlight, officeInformation, audience } = hit;
    const dispatch = useDispatch();

    if (!displayName || !href) {
        return null;
    }

    return (
        <LinkPanel
            id={id}
            href={href}
            className={style.searchHit}
            onClick={() => {
                dispatch(lukkAlleDropdowns());
                logAmplitudeEvent('resultat-klikk', {
                    destinasjon: '[redacted]',
                    sokeord: '[redacted]',
                    treffnr: hitIndex + 1,
                });
            }}
        >
            <LinkPanel.Title>{displayName}</LinkPanel.Title>
            <div className={style.content}>
                {highlight && <BodyLong className={style.highlight}>{parseHighlight(highlight)}</BodyLong>}
                {officeInformation && <SearchHitOfficeInformation {...officeInformation} />}
                <div className={style.bottomRow}>
                    {audience && <SearchHitAudience audience={audience} language={hit.language} />}
                    <SearchHitTimestamps hit={hit} />
                </div>
            </div>
        </LinkPanel>
    );
};
