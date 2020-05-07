import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Undertittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';

import Tekst from 'tekster/finn-tekst';
import { arbeidsflateLenker } from 'komponenter/header/header-regular/common/arbeidsflate-lenker';
import { ArbeidsflateLenke } from 'komponenter/header/header-regular/common/arbeidsflate-lenker';
import { AppState } from 'store/reducers';
import { Language } from 'store/reducers/language-duck';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import { MenuValue } from 'utils/meny-storage-utils';
import { erNavDekoratoren } from 'utils/Environment';

import './FooterArbeidsflatevalg.less';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const FooterArbeidsflatevalg = () => {
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { arbeidsflate, language } = useSelector(stateSelector);
    const { XP_BASE_URL, COOKIES } = useSelector(
        (state: AppState) => state.environment
    );

    const getLenker = () => {
        switch (arbeidsflate) {
            case MenuValue.IKKEBESTEMT:
                return arbeidsflateLenker(XP_BASE_URL).filter(
                    (lenke) => lenke.key !== COOKIES.CONTEXT
                );
            default:
                return arbeidsflateLenker(XP_BASE_URL).filter(
                    (lenke) => lenke.key !== arbeidsflate
                );
        }
    };

    const [lenker, setLenker] = useState<ArbeidsflateLenke[]>(getLenker());
    useEffect(() => {
        setLenker(getLenker());
    }, [arbeidsflate]);

    const showContextMenu =
        (language === Language.IKKEBESTEMT &&
            COOKIES.LANGUAGE === Language.NORSK) ||
        language === Language.NORSK;

    return (
        <>
            {showContextMenu ? (
                <div className="menylenker-seksjon arbeidsflate">
                    <div className="arbeidsflatevalg-innhold">
                        <ul
                            className="arbeidsflatevalg"
                            aria-label="Gå til innhold for privatperson, arbeidsgiver eller samarbeidspartner"
                        >
                            {lenker.map((lenke: ArbeidsflateLenke) => (
                                <li key={lenke.key}>
                                    <Lenkepanel
                                        href={lenke.url}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            dispatch(
                                                settArbeidsflate(lenke.key)
                                            );
                                            triggerGaEvent({
                                                context: arbeidsflate,
                                                category: GACategory.Header,
                                                action: 'arbeidsflate-valg',
                                            });
                                            setCookie(
                                                'decorator-context',
                                                lenke.key,
                                                cookieOptions
                                            );
                                            if (!erNavDekoratoren()) {
                                                window.location.href =
                                                    lenke.url;
                                            }
                                        }}
                                        onAuxClick={(event) =>
                                            event.button &&
                                            event.button === 1 &&
                                            triggerGaEvent({
                                                context: arbeidsflate,
                                                category: GACategory.Header,
                                                action: 'arbeidsflate-valg',
                                            })
                                        }
                                        tittelProps="normaltekst"
                                        key={lenke.key}
                                        border
                                    >
                                        <div className="arbeidsflatevalg-tekst">
                                            <Undertittel>
                                                <Tekst
                                                    id={lenke.lenkeTekstId}
                                                />
                                            </Undertittel>
                                            <Tekst
                                                id={lenke.footerStikkordId}
                                            />
                                        </div>
                                    </Lenkepanel>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default FooterArbeidsflatevalg;
