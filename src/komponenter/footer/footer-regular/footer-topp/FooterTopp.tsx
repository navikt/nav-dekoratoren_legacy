import React, { useEffect, useState } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from 'utils/bem';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import Tekst from 'tekster/finn-tekst';
import { genererLenkerTilUrl } from 'utils/Environment';
import { FooterLenke, lenkerHoyre, lenkerVenstre } from '../FooterLenker';
import DelSkjermModal from '../../del-skjerm-modal/DelSkjermModal';
import Spraakvalg from './spraakvalg/Spraakvalg';
import FooterArbeidsflatevalg from './footer-arbeidsflatevalg/FooterArbeidsflatevalg';
import PilOppHvit from 'ikoner/meny/PilOppHvit';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import './footerTopp.less';

const FooterTopp = () => {
    const cls = BEMHelper('menylinje-topp');
    const [venstrelenker, setVenstrelenker] = useState<FooterLenke[]>(
        lenkerVenstre
    );
    const [hoyrelenker, setHoyrelenker] = useState<FooterLenke[]>(lenkerHoyre);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);

    useEffect(() => {
        setVenstrelenker(genererLenkerTilUrl(XP_BASE_URL, lenkerVenstre));
        setHoyrelenker(genererLenkerTilUrl(XP_BASE_URL, lenkerHoyre));
    }, []);

    const scrollToTop = () =>
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

    return (
        <section className={cls.className}>
            <div className="topp-kolonner">
                <div className="menylenker-seksjon til-toppen">
                    <div className="til-toppen-innhold">
                        <PilOppHvit />
                        <Lenke
                            href="#scroll-til-toppen"
                            onClick={e => {
                                e.preventDefault();
                                scrollToTop();
                            }}
                        >
                            <Tekst id="footer-til-toppen" />
                        </Lenke>
                    </div>
                </div>
                <div className="menylenker-seksjon venstre">
                    <Undertittel
                        className="menylenker-overskrift"
                        id="venstrelenker-overskrift"
                    >
                        <Tekst id="footer-kontakt-overskrift" />
                    </Undertittel>
                    <ul aria-labelledby="venstrelenker-overskrift">
                        {venstrelenker.map(lenke => (
                            <li key={lenke.lenketekst}>
                                <Normaltekst>
                                    <LenkeMedGA
                                        href={lenke.url}
                                        gaEventArgs={{
                                            category: GACategory.Footer,
                                            action: `kontakt/${lenke.lenketekst}`,
                                            label: lenke.url,
                                        }}
                                    >
                                        {lenke.lenketekst}
                                    </LenkeMedGA>
                                </Normaltekst>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="menylenker-seksjon midt">
                    <Spraakvalg />
                </div>
                <div className="menylenker-seksjon hoyre">
                    <Undertittel
                        className="menylenker-overskrift"
                        id="hoyrelenker-overskrift"
                    >
                        <Tekst id="footer-navsamfunn-overskrift" />
                    </Undertittel>
                    <ul aria-labelledby="hoyrelenker-overskrift">
                        {hoyrelenker.map(lenke => (
                            <li key={lenke.lenketekst}>
                                <Normaltekst>
                                    <LenkeMedGA
                                        href={lenke.url}
                                        gaEventArgs={{
                                            category: GACategory.Footer,
                                            action: `nav-og-samfunn/${lenke.lenketekst}`,
                                            label: lenke.url,
                                        }}
                                    >
                                        {lenke.lenketekst}
                                    </LenkeMedGA>
                                </Normaltekst>
                            </li>
                        ))}
                    </ul>
                </div>
                <FooterArbeidsflatevalg />
            </div>
        </section>
    );
};

export default FooterTopp;
