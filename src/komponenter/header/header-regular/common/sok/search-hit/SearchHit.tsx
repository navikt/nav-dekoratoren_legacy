import React from 'react';
import htmlReactParser from 'html-react-parser';
// import { SearchHitProps } from 'types/search-result';
// import { logResultClick } from 'utils/amplitude';
import { BodyLong, LinkPanel } from '@navikt/ds-react';
import { SearchHitOfficeInformation } from './office-information/SearchHitOfficeInformation';
import { SearchHitAudience } from './audience/SearchHitAudience';
import { SearchHitTimestamps } from './timestamps/SearchHitTimestamps';
import style from './SearchHit.module.scss';
import { Audience, Language } from '../utils';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import { useDispatch } from 'react-redux';

type SearchHitProps = {
    priority: boolean;
    displayName: string;
    href: string;
    displayPath: string;
    highlight: string;
    publish?: {
        from?: string;
        first?: string;
    };
    createdTime: string;
    modifiedTime?: string;
    officeInformation?: {
        phone?: string;
        audienceReception?: string;
    };
    audience?: Audience | Audience[];
    language: Language;
    hidePublishDate: boolean;
    hideModifiedDate: boolean;
};

const parseHighlight = (highlight: string) => {
    return htmlReactParser(
        // trim whitespace
        highlight.replace(/(\r\n|\n|\r)/gm, '')
    );
};

type Props = {
    hit: SearchHitProps;
    hitIndex: number;
};

export const SearchHit = ({ hit, hitIndex }: Props) => {
    const { displayName, href, highlight, officeInformation, audience } = hit;
    const dispatch = useDispatch();

    if (!displayName || !href) {
        return null;
    }

    return (
        <LinkPanel
            href={href}
            className={style.searchHit}
            onClick={() => {
                //TODO
                // logResultClick(hitIndex + 1)
                console.log(hitIndex + 1);

                dispatch(lukkAlleDropdowns());
                logAmplitudeEvent('resultat-klikk', {
                    destinasjon: '[redacted]',
                    sokeord: '[redacted]',
                    treffnr: hitIndex + 1, //Sjekk om hitindex er riktig
                });
            }}
            // id={id}
            // className={'sokeresultat-lenke'}
            // href={item.href}
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