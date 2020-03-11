import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../reducer/reducer';
import { Undertittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { GACategory } from '../../../../utils/google-analytics';
import {
    GAEventArgs,
    triggerGaEvent,
} from '../../../../utils/google-analytics';
import { Language } from '../../../../reducer/language-duck';
import Tekst from '../../../../tekster/finn-tekst';
import {
    ArbeidsflateLenke,
    arbeidsflateLenker,
    arbeidsgiverContextLenke,
    samarbeidspartnerContextLenke,
    settArbeidsflate,
} from '../../../header/arbeidsflatemeny/arbeidsflate-lenker';

const gaEventArgs: GAEventArgs = {
    category: GACategory.Header,
    action: 'arbeidsflate-valg',
};

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const FooterArbeidsflatevalg = () => {
    const { arbeidsflate, language } = useSelector(stateSelector);

    const [arbeidsflatevalgLenker, setArbeidsflatevalgLenker] = useState<
        ArbeidsflateLenke[]
    >([arbeidsgiverContextLenke(), samarbeidspartnerContextLenke()]);

    const finnArbeidsflateLenker = () =>
        arbeidsflateLenker().filter(lenke => lenke.key !== arbeidsflate);

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
                                                settArbeidsflate(lenke);
                                                triggerGaEvent(gaEventArgs);
                                            }}
                                            onAuxClick={event =>
                                                event.button &&
                                                event.button === 1 &&
                                                triggerGaEvent(gaEventArgs)
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
