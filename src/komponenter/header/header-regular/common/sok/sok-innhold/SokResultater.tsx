import SokeforslagIngress from './SokeforslagIngress';
import { SearchHit } from '../search-hit/SearchHit';
import { finnTekst } from 'tekster/finn-tekst';
import React from 'react';
import { Locale } from 'store/reducers/language-duck';
import { Sokeresultat, Soketreff } from '../utils';
import { getKbId } from 'utils/keyboard-navigation/kb-navigation';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Alert, Link } from '@navikt/ds-react';

import 'komponenter/header/header-regular/common/sok/sok-innhold/SokResultater.scss';

type Props = {
    writtenInput: string;
    result: Sokeresultat;
    numberOfResults: number;
    language: Locale;
    fetchError?: string | boolean;
};

const removeDuplicates = (items: Soketreff[]) =>
    items.filter(
        (itemA, index) =>
            items.findIndex((itemB) => itemA.href === itemB.href && itemA.displayName === itemB.displayName) === index
    );

export const SokResultater = (props: Props) => {
    const { language, fetchError } = props;
    const { writtenInput, result, numberOfResults } = props;
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const itemsFiltered = removeDuplicates(result.hits) || result.hits;
    const itemsSpliced = itemsFiltered.slice(0, numberOfResults);

    return (
        <div className="sokeresultat-container">
            {fetchError && (
                <div className={'sokeresultat-feil'}>
                    <Alert variant="error">
                        <Tekst id={'feil-sok-fetch'} />
                    </Alert>
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

                        const key = `${item.href}-${item.displayName}`;

                        return (
                            <li key={index} style={style}>
                                <SearchHit id={id} hit={item} hitIndex={index} key={key} />
                            </li>
                        );
                    })}
                </ul>
            ) : null}

            {!fetchError && itemsFiltered.length ? (
                <div className={'sokeresultat-treff'}>
                    <div role={'status'}>
                        {finnTekst('sok-viser', language)} {itemsSpliced.length} {finnTekst('sok-av', language)}{' '}
                        {result.total} {finnTekst('sok-resultater', language)}
                    </div>
                    {result.total > itemsFiltered.length && (
                        <Link className={'typo-element'} href={`${XP_BASE_URL}/sok?ord=${writtenInput}`}>{`${finnTekst(
                            'se-alle-treff',
                            language
                        )} ("${writtenInput}")`}</Link>
                    )}
                </div>
            ) : null}

            {!fetchError && !itemsFiltered.length && (
                <div className={'sokeresultat-treff'} role={'status'}>
                    <SokeforslagIngress
                        className="sok-resultat-listItem"
                        displayName={`${finnTekst('sok-ingen-treff', language)} (${writtenInput})`}
                    />
                </div>
            )}
        </div>
    );
};

export default SokResultater;
