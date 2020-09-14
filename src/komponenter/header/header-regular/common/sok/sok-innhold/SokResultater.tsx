import SokeforslagIngress from './SokeforslagIngress';
import Sokeforslagtext from './Sokeforslagtext';
import { finnTekst } from 'tekster/finn-tekst';
import React from 'react';
import { Locale } from 'store/reducers/language-duck';
import { SokeresultatData } from '../sok-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { getKbId } from 'utils/keyboard-navigation/kb-navigation';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import Tekst from 'tekster/finn-tekst';
import './SokResultater.less';
import Lenke from 'nav-frontend-lenker';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../store/reducers';

type Props = {
    writtenInput: string;
    items: SokeresultatData[];
    numberOfResults: number;
    language: Locale;
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
    const { language, fetchError } = props;
    const { writtenInput, items, numberOfResults } = props;
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);

    const itemsFiltered =
        removeDuplicates(items).slice(0, numberOfResults + 1) || items;

    return (
        <div className="sokeresultat-container">
            {fetchError && (
                <div className={'sokeresultat-feil'}>
                    <AlertStripeFeil>
                        <Tekst id={'feil-sok-fetch'} />
                    </AlertStripeFeil>
                </div>
            )}

            {!fetchError && itemsFiltered.length ? (
                <ul className="sokeresultat-liste">
                    {itemsFiltered.map((item, index) => {
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
                                >
                                    <SokeforslagIngress
                                        className="sok-resultat-listItem"
                                        displayName={item.displayName}
                                    />
                                    <Sokeforslagtext
                                        highlight={item.highlight}
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            ) : null}

            {!fetchError && itemsFiltered.length ? (
                <Lenke
                    className={'sokeresultat-alle-treff'}
                    href={`${XP_BASE_URL}/sok?ord=${writtenInput}`}
                >{`Se alle treff ("${writtenInput}")`}</Lenke>
            ) : null}

            {!fetchError && !itemsFiltered.length && (
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
        </div>
    );
};

export default SokResultater;
