import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import { erNavDekoratoren } from 'utils/Environment';
import { getSpraaklenker, Spraaklenke } from './Spraakvalg-lenker';
import Tekst from 'tekster/finn-tekst';
import { Language } from '../../../../../store/reducers/language-duck';
import { arbeidsflateLenker } from '../../../../header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';

const Spraakvalg = () => {
    const language = useSelector((state: AppState) => state.language.language);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const { COOKIES } = useSelector((state: AppState) => state.environment);
    const [erDekoratoren, setErDekoratoren] = useState<boolean>(false);

    const getLenker = () => {
        switch (language) {
            case Language.IKKEBESTEMT:
                return getSpraaklenker(XP_BASE_URL, COOKIES.LANGUAGE);
            default:
                return getSpraaklenker(XP_BASE_URL, language);
        }
    };

    const [spraklenker, setSpraklenker] = useState<Spraaklenke[]>(getLenker());
    useEffect(() => {
        setErDekoratoren(erNavDekoratoren());
        setSpraklenker(getLenker());
    }, []);

    return (
        <>
            <Undertittel
                className="menylenker-overskrift"
                id="spraaklenker-overskrift"
            >
                <Tekst id="footer-languages-overskrift" />
            </Undertittel>
            <ul aria-labelledby="spraaklenker-overskrift">
                {spraklenker.map(lenke => (
                    <li key={lenke.lang}>
                        <Normaltekst>
                            <LenkeMedGA
                                href={erDekoratoren ? lenke.testurl : lenke.url}
                                gaEventArgs={{
                                    category: GACategory.Footer,
                                    action: `språkvalg/${lenke.lang}`,
                                }}
                            >
                                {lenke.lenketekst}
                            </LenkeMedGA>
                        </Normaltekst>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Spraakvalg;
