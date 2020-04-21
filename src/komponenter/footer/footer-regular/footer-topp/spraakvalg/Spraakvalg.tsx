import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Tekst from 'tekster/finn-tekst';
import { AppState } from 'store/reducers';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import LenkeListe from 'komponenter/common/lenke-liste/LenkeListe';
import { erNavDekoratoren } from 'utils/Environment';
import { GACategory } from 'utils/google-analytics';
import { getSpraaklenker, Spraaklenke } from './Spraakvalg-lenker';
import { Language } from 'store/reducers/language-duck';

const Spraakvalg = () => {
    const language = useSelector((state: AppState) => state.language.language);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const { COOKIES } = useSelector((state: AppState) => state.environment);
    const [erDekoratoren, setErDekoratoren] = useState<boolean>(false);
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

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
        <LenkeListe
            tittel={{
                tekst: <Tekst id="footer-languages-overskrift" />,
                typografitype: 'undertittel',
            }}
            data={spraklenker}
            listElement={({ testurl, url, lang, lenketekst }) => (
                <LenkeMedGA
                    href={erDekoratoren ? testurl : url}
                    gaEventArgs={{
                        context: arbeidsflate,
                        category: GACategory.Footer,
                        action: `språkvalg/${lang}`,
                    }}
                >
                    {lenketekst}
                </LenkeMedGA>
            )}
        />
    );
};

export default Spraakvalg;
