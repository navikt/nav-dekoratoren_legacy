import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import { Language } from '../../../reducer/language-duck';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import Tekst from '../../../tekster/finn-tekst';
import { erNavDekoratoren } from '../../../utils/Environment';
import {
    getSpraaklenker,
    Spraaklenke,
    spraaklenker,
} from './Spraakvalg-lenker';

interface StateProps {
    language: Language;
}

interface State {
    hasMounted: boolean;
    erNavDekoratoren: boolean;
    spraaklenker: Spraaklenke[];
}

const Spraakvalg = ({ language }: StateProps) => {
    const [erDekoratoren, setErDekoratoren] = useState<boolean>(false);
    const [spraklenker, setSpraklenker] = useState<Spraaklenke[]>([
        spraaklenker[1],
        spraaklenker[2],
    ]);

    useEffect(() => {
        setErDekoratoren(erNavDekoratoren());
        setSpraklenker(getSpraaklenker(language));
    }, []);

    return (
        <>
            <Undertittel className="blokk-xxs" id="spraaklenker-overskrift">
                <Tekst id="footer-languages-overskrift" />
            </Undertittel>
            <ul aria-labelledby="spraaklenker-overskrift">
                {spraklenker.map(lenke => {
                    return (
                        <li key={lenke.lang}>
                            <HoyreChevron />
                            <LenkeMedGA
                                href={erDekoratoren ? lenke.testurl : lenke.url}
                                gaEventArgs={{
                                    category: GACategory.Footer,
                                    action: `språkvalg/${lenke.lang}`,
                                }}
                            >
                                {lenke.lenketekst}
                            </LenkeMedGA>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Spraakvalg);
