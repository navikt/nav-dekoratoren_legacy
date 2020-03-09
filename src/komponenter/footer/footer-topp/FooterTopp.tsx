import React, { useEffect, useState } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../../utils/bem';
import { GACategory, triggerGaEvent } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import Tekst from '../../../tekster/finn-tekst';
import { genererLenkerTilUrl } from '../../../utils/Environment';
import { FooterLenke, lenkerHoyre, lenkerVenstre } from '../Footer-lenker';
import DelSkjermModal from './del-skjerm-modal/DelSkjermModal';
import Spraakvalg from './spraakvalg/Spraakvalg';
import FooterArbeidsflatevalg from './footer-arbeidsflatevalg/FooterArbeidsflatevalg';

interface Props {
    classname: string;
}

const FooterTopp = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    const [venstrelenker, setVenstrelenker] = useState<FooterLenke[]>(
        lenkerVenstre
    );
    const [hoyrelenker, setHoyrelenker] = useState<FooterLenke[]>(lenkerHoyre);
    const [visDelSkjermModal, setVisDelSkjermModal] = useState(false);

    useEffect(() => {
        setVenstrelenker(genererLenkerTilUrl(lenkerVenstre));
        setHoyrelenker(genererLenkerTilUrl(lenkerHoyre));
    }, []);

    const openModal = () => {
        triggerGaEvent({
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });
        setVisDelSkjermModal(true);
    };

    const closeModal = () => {
        triggerGaEvent({
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setVisDelSkjermModal(false);
    };

    return (
        <section className={cls.element('menylinje-topp')}>
            <div className="topp-kolonner">
                <div className="menylenker-seksjon til-toppen">
                    <Lenke href="#">Til toppen</Lenke>
                </div>
                <div className="menylenker-seksjon venstre">
                    <Undertittel
                        className="venstrelenker-overskrift"
                        id="venstrelenker-overskrift"
                    >
                        <Tekst id="footer-kontakt-overskrift" />
                    </Undertittel>
                    <ul aria-labelledby="venstrelenker-overskrift">
                        {venstrelenker.map(lenke => {
                            return (
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
                            );
                        })}
                        <li>
                            <Lenke href="#" role="button" onClick={openModal}>
                                <Tekst id="footer-del-skjerm" />
                            </Lenke>
                            {visDelSkjermModal && (
                                <DelSkjermModal
                                    isOpen={visDelSkjermModal}
                                    onClose={closeModal}
                                />
                            )}
                        </li>
                    </ul>
                </div>
                <div className="menylenker-seksjon midt">
                    <Spraakvalg />
                </div>
                <div className="menylenker-seksjon hoyre">
                    <Undertittel
                        className="nav-samfunn-overskrift"
                        id="hoyrelenker-overskrift"
                    >
                        <Tekst id="footer-navsamfunn-overskrift" />
                    </Undertittel>
                    <ul aria-labelledby="hoyrelenker-overskrift">
                        {hoyrelenker.map(lenke => {
                            return (
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
                            );
                        })}
                    </ul>
                </div>
                <div className="menylenker-seksjon arbeidsflatevalg">
                    <FooterArbeidsflatevalg classname={cls.className} />
                </div>
            </div>
        </section>
    );
};

export default FooterTopp;
