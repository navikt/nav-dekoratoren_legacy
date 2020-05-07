import SokeforslagIngress from './SokeforslagIngress';
import Sokeforslagtext from './Sokeforslagtext';
import { finnTekst } from 'tekster/finn-tekst';
import React from 'react';
import { Language } from 'store/reducers/language-duck';
import { SokeresultatData } from '../sok-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Tekst from 'tekster/finn-tekst';
import './SokResultater.less';

type Props = {
    writtenInput: string;
    items: SokeresultatData[];
    predefinedlistview: number;
    getMenuProps: any;
    getItemProps: any;
    language: Language;
    fetchError: boolean;
};

const cssIndex = (index: number) => {
    return { '--listmap': index } as React.CSSProperties;
};

export const SokResultater = ({
    writtenInput,
    items,
    getMenuProps,
    getItemProps,
    predefinedlistview,
    language,
    fetchError,
}: Props) => {
    return (
        <ul {...getMenuProps()} className="sokeresultat-liste">
            {fetchError && (
                <AlertStripeFeil>
                    <Tekst id={'feil-sok-fetch'} />
                </AlertStripeFeil>
            )}
            {items.length > 1 ? (
                items.slice(0, predefinedlistview + 1).map((item, index) => (
                    <li
                        {...getItemProps({
                            key: index,
                            index,
                            item,
                        })}
                        style={cssIndex(index)}
                    >
                        <SokeforslagIngress
                            className="sok-resultat-listItem"
                            displayName={item.displayName}
                        />
                        <Sokeforslagtext highlight={item.highlight} />
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
