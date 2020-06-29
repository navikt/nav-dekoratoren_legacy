import SokeforslagIngress from './SokeforslagIngress';
import Sokeforslagtext from './Sokeforslagtext';
import { finnTekst } from 'tekster/finn-tekst';
import React from 'react';
import { Language } from 'store/reducers/language-duck';
import { SokeresultatData } from '../sok-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Tekst from 'tekster/finn-tekst';
import './SokResultater.less';
import Lenke from 'nav-frontend-lenker';

type Props = {
    writtenInput: string;
    items: SokeresultatData[];
    numberOfResults: number;
    selectedIndex: number;
    language: Language;
    fetchError?: string | boolean;
};

const cssIndex = (index: number) => {
    return { '--listmap': index } as React.CSSProperties;
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
    const { language, fetchError, selectedIndex } = props;
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
                itemsFiltered.map((item, index) => (
                    <li
                        key={index}
                        style={cssIndex(index)}
                        aria-selected={selectedIndex === index}
                    >
                        <Lenke
                            className={'sokeresultat-lenke'}
                            href={item.href}
                        >
                            <SokeforslagIngress
                                className="sok-resultat-listItem"
                                displayName={item.displayName}
                            />
                            <Sokeforslagtext highlight={item.highlight} />
                        </Lenke>
                    </li>
                ))
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
