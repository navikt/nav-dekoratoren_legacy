import SokeforslagIngress from './SokeforslagIngress';
import Sokeforslagtext from './Sokeforslagtext';
import { finnTekst } from 'tekster/finn-tekst';
import React from 'react';
import { Locale } from 'store/reducers/language-duck';
import { Sokeresultat, Soketreff } from '../utils';
import { getKbId } from 'utils/keyboard-navigation/kb-navigation';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import { Alert, Link } from '@navikt/ds-react';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import { ArrowRightIcon } from '@navikt/aksel-icons';

import 'komponenter/header/header-regular/common/sok/sok-innhold/SokResultater.scss';

type Props = {
    writtenInput: string;
    result: Sokeresultat;
    numberOfResults: number;
    language: Locale;
    fetchError?: string | boolean;
    audience: string;
};

const removeDuplicates = (items: Soketreff[]) =>
    items.filter(
        (itemA, index) =>
            items.findIndex((itemB) => itemA.href === itemB.href && itemA.displayName === itemB.displayName) === index
    );

export const SokResultater = (props: Props) => {
    const { language, fetchError, audience, writtenInput, result, numberOfResults } = props;
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const itemsFiltered = removeDuplicates(result.hits) || result.hits;
    const dispatch = useDispatch();

    return (
        <div className="sokeresultat-container">
            {fetchError && (
                <div className={'sokeresultat-feil'}>
                    <Alert variant="error">
                        <Tekst id={'feil-sok-fetch'} />
                    </Alert>
                </div>
            )}
            {!fetchError && (
                <div className={'sokeresultat-treff'} role={'status'}>
                    <SokeforslagIngress
                        className="sok-resultat-listItem"
                        displayName={
                            <div role={'status'}>
                                {result.total} {finnTekst('sok-resultater', language)}
                                {' for '} &laquo;{`${writtenInput}`}&raquo; {' for '}
                                {finnTekst('sok-audience', language, audience)}
                            </div>
                        }
                    />
                    {
                        <Link className={'typo-element'} href={`${XP_BASE_URL}/sok?ord=${writtenInput}`}>{`${finnTekst(
                            'sok-alle-treff',
                            language
                        )} `}</Link>
                    }
                </div>
            )}
            {!fetchError && itemsFiltered.length ? (
                <ul className="sokeresultat-liste">
                    {itemsFiltered.slice(0, numberOfResults).map((item, index) => {
                        const style = {
                            '--index': index,
                        } as React.CSSProperties;
                        const id = getKbId(KbNavGroup.Sok, {
                            col: 0,
                            row: 1,
                            sub: index,
                        });
                        return (
                            <li key={index} style={style}>
                                <a
                                    id={id}
                                    className={'sokeresultat-lenke'}
                                    href={item.href}
                                    onClick={() => {
                                        dispatch(lukkAlleDropdowns());
                                        logAmplitudeEvent('resultat-klikk', {
                                            destinasjon: '[redacted]',
                                            sokeord: '[redacted]',
                                            treffnr: index + 1,
                                        });
                                    }}
                                >
                                    <SokeforslagIngress
                                        className="sok-resultat-listItem"
                                        displayName={item.displayName}
                                    />
                                    <Sokeforslagtext highlight={item.highlight} />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
            {result.total > itemsFiltered.length && (
                <Link className={'typo-element'} href={`${XP_BASE_URL}/sok?ord=${writtenInput}`}>
                    {finnTekst('sok-flere-treff', language)}
                    {<ArrowRightIcon className="sokeresultat-treff-pil" />}
                </Link>
            )}
        </div>
    );
};

export default SokResultater;
