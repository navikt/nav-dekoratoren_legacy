import React, { useEffect, useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from 'utils/bem';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import Tekst from 'tekster/finn-tekst';
import DelSkjermModal from '../../del-skjerm-modal/DelSkjermModal';
import Spraakvalg from './spraakvalg/Spraakvalg';
import FooterArbeidsflatevalg from './footer-arbeidsflatevalg/FooterArbeidsflatevalg';
import PilOppHvit from 'ikoner/meny/PilOppHvit';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import { MenyNode } from 'store/reducers/menu-duck';
import FooterLenker from '../../Lenker';
import './footerTopp.less';

const FooterTopp = () => {
    const cls = BEMHelper('menylinje-topp');
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);

    const [kontaktNode, settKontaktNode] = useState<MenyNode>();
    const [samfunnNode, settSamfunnNode] = useState<MenyNode>();
    const [visDelSkjermModal, setVisDelSkjermModal] = useState(false);

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !kontaktNode && !samfunnNode) {
            settKontaktNode(findNode(noder, 'Kontakt'));
            settSamfunnNode(findNode(noder, 'NAV og samfunn'));
        }
    }, [data, kontaktNode, samfunnNode]);

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
                        <FooterLenker node={kontaktNode} />
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
                        className="menylenker-overskrift"
                        id="hoyrelenker-overskrift"
                    >
                        <Tekst id="footer-navsamfunn-overskrift" />
                    </Undertittel>
                    <ul aria-labelledby="hoyrelenker-overskrift">
                        <FooterLenker node={samfunnNode} />
                    </ul>
                </div>
                <FooterArbeidsflatevalg />
            </div>
        </section>
    );
};

export default FooterTopp;
