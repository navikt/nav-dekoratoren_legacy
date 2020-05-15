import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { GACategory } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import { erNavDekoratoren } from 'utils/Environment';
import { getSpraaklenker, Spraaklenke } from './Spraakvalg-lenker';
import Tekst from 'tekster/finn-tekst';
import { Language } from 'store/reducers/language-duck';
import { useCookies } from 'react-cookie';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';

const Spraakvalg = () => {
    const language = useSelector((state: AppState) => state.language.language);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [erDekoratoren, setErDekoratoren] = useState<boolean>(false);
    const [, setCookie] = useCookies(['decorator-context']);
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    const [spraklenker, setSpraklenker] = useState<Spraaklenke[]>(
        getSpraaklenker(XP_BASE_URL, language)
    );

    useEffect(() => {
        setErDekoratoren(erNavDekoratoren());
        setSpraklenker(getSpraaklenker(XP_BASE_URL, language));
    }, []);

    const setCookieAndRedirect = (
        event: React.MouseEvent<MouseEvent | HTMLAnchorElement>,
        url: string,
        lang: Language
    ) => {
        event.preventDefault();
        setCookie('decorator-language', lang, cookieOptions);
        document.location.href = url;
    };

    return (
        <>
            <Undertittel
                className="menylenker-overskrift"
                id="spraaklenker-overskrift"
            >
                <Tekst id="footer-languages-overskrift" />
            </Undertittel>
            <ul aria-labelledby="spraaklenker-overskrift">
                {spraklenker.map((lenke) => (
                    <li key={lenke.lang}>
                        <Normaltekst>
                            <LenkeMedGA
                                href={erDekoratoren ? lenke.testurl : lenke.url}
                                onClick={(event) =>
                                    setCookieAndRedirect(
                                        event,
                                        erDekoratoren
                                            ? lenke.testurl
                                            : lenke.url,
                                        lenke.lang
                                    )
                                }
                                gaEventArgs={{
                                    context: arbeidsflate,
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
