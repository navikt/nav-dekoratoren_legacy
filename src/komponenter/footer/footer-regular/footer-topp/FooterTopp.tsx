import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Lenke from 'nav-frontend-lenker';

import LenkeListe from 'komponenter/common/lenke-liste/LenkeListe';
import Tekst from 'tekster/finn-tekst';
import PilOppHvit from 'ikoner/meny/PilOppHvit';
import { AppState } from 'store/reducers';
import { MenyNode } from 'store/reducers/menu-duck';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import BEMHelper from 'utils/bem';

import Spraakvalg from './spraakvalg/Spraakvalg';
import FooterArbeidsflatevalg from './footer-arbeidsflatevalg/FooterArbeidsflatevalg';
import FooterLenker from '../../FooterLenker';

import './FooterTopp.less';
import {
    LinkLoader,
    LinksLoader,
} from 'komponenter/common/content-loaders/LinkLoader';

const FooterTopp = () => {
    const cls = BEMHelper('menylinje-topp');
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);

    const [kontaktNode, settKontaktNode] = useState<MenyNode>();
    const [samfunnNode, settSamfunnNode] = useState<MenyNode>();

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !kontaktNode && !samfunnNode) {
            settKontaktNode(findNode(noder, 'Kontakt'));
            settSamfunnNode(findNode(noder, 'NAV og samfunn'));
        }
    }, [data, kontaktNode, samfunnNode]);

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
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToTop();
                            }}
                        >
                            <Tekst id="footer-til-toppen" />
                        </Lenke>
                    </div>
                </div>

                <LenkeListe
                    className="menylenker-seksjon venstre"
                    tittel={{
                        tekst: <Tekst id="footer-kontakt-overskrift" />,
                        typografitype: 'undertittel',
                    }}
                    data={kontaktNode ? kontaktNode.children : undefined}
                    listElement={(props) => <FooterLenker {...props} />}
                    linkLoader={<LinksLoader id="kontakt-loader" />}
                />

                <div className="menylenker-seksjon midt">
                    <Spraakvalg />
                </div>

                <LenkeListe
                    className="menylenker-seksjon hoyre"
                    tittel={{
                        tekst: <Tekst id="footer-navsamfunn-overskrift" />,
                        typografitype: 'undertittel',
                    }}
                    data={samfunnNode ? samfunnNode.children : undefined}
                    listElement={(props) => <FooterLenker {...props} />}
                    linkLoader={<LinksLoader id="samfunn-loader" />}
                />

                <FooterArbeidsflatevalg />
            </div>
        </section>
    );
};

export default FooterTopp;
