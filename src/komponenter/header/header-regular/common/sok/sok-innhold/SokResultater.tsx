import SokeforslagIngress from './SokeforslagIngress';
import Sokeforslagtext from './Sokeforslagtext';
import { finnTekst } from 'tekster/finn-tekst';
import React, { FocusEvent } from 'react';
import { Language } from 'store/reducers/language-duck';
import { SokeresultatData } from '../sok-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Tekst from 'tekster/finn-tekst';
import './SokResultater.less';

type Props = {
    writtenInput: string;
    items: SokeresultatData[];
    numberOfResults: number;
    focusIndex: number;
    language: Language;
    onFocus: (e: FocusEvent<HTMLAnchorElement>) => void;
    fetchError?: string | boolean;
};

const removeDuplicates = (items: SokeresultatData[]) =>
    items.filter(
        (itemA, index) =>
            items.findIndex(
                (itemB) =>
                    itemA.href === itemB.href &&
                    itemA.displayName === itemB.displayName
            ) === index
    );

export const SokResultater = (props: Props) => {
    const { language, fetchError, focusIndex, onFocus } = props;
    const { writtenInput, items, numberOfResults } = props;

    const itemsFiltered =
        items.length > 1 &&
        removeDuplicates(items).slice(0, numberOfResults + 1);

    return (
        <ul className="sokeresultat-liste">
            {fetchError ? (
                <div className={'sokeresultat-feil'}>
                    <AlertStripeFeil>
                        <Tekst id={'feil-sok-fetch'} />
                    </AlertStripeFeil>
                </div>
            ) : itemsFiltered ? (
                itemsFiltered.map((item, index) => {
                    return (
                        <li key={index}>
                            <a
                                onFocus={onFocus}
                                id={`sokeresultat-${index}`}
                                className={'sokeresultat-lenke'}
                                href={item.href}
                            >
                                <SokeforslagIngress
                                    className="sok-resultat-listItem"
                                    displayName={item.displayName}
                                />
                                <Sokeforslagtext highlight={item.highlight} />
                            </a>
                        </li>
                    );
                })
            ) : (
                <div className={'sokeresultat-ingen-treff'}>
                    <SokeforslagIngress
                        className="sok-resultat-listItem"
                        displayName={`${finnTekst(
                            'sok-ingen-treff',
                            language
                        )} (${writtenInput})`}
                    />
                </div>
            )}
        </ul>
    );
};

export default SokResultater;
