import React, { useEffect, useState } from 'react';
import { ArbeidsflateLenke } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { arbeidsflateLenker } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { arbeidsgiverContextLenke } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { samarbeidspartnerContextLenke } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Undertittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { GACategory } from 'utils/google-analytics';
import { triggerGaEvent } from 'utils/google-analytics';
import { Language } from 'store/reducers/language-duck';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import Tekst from 'tekster/finn-tekst';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const FooterArbeidsflatevalg = () => {
    const dispatch = useDispatch();
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const { arbeidsflate, language } = useSelector(stateSelector);

    const [arbeidsflatevalgLenker, setArbeidsflatevalgLenker] = useState<
        ArbeidsflateLenke[]
    >([
        arbeidsgiverContextLenke(XP_BASE_URL),
        samarbeidspartnerContextLenke(XP_BASE_URL),
    ]);

    const finnArbeidsflateLenker = () =>
        arbeidsflateLenker(XP_BASE_URL).filter(
            lenke => lenke.key !== arbeidsflate
        );

    useEffect(() => {
        setArbeidsflatevalgLenker(finnArbeidsflateLenker);
    }, [arbeidsflate]);

    return (
        <>
            {language === Language.NORSK && (
                <div className="menylenker-seksjon arbeidsflate">
                    <div className="arbeidsflatevalg-innhold">
                        <ul
                            className="arbeidsflatevalg"
                            aria-label="Gå til innhold for privatperson, arbeidsgiver eller samarbeidspartner"
                        >
                            {arbeidsflatevalgLenker.map(
                                (lenke: ArbeidsflateLenke) => (
                                    <li key={lenke.key}>
                                        <Lenkepanel
                                            href={lenke.url}
                                            onClick={event => {
                                                event.preventDefault();
                                                dispatch(
                                                    settArbeidsflate(lenke.key)
                                                );
                                                triggerGaEvent({
                                                    context: arbeidsflate,
                                                    category: GACategory.Header,
                                                    action: 'arbeidsflate-valg',
                                                });
                                            }}
                                            onAuxClick={event =>
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
                                )
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default FooterArbeidsflatevalg;
