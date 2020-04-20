import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';

import Tekst from 'tekster/finn-tekst';
import PilOppHvit from 'ikoner/meny/PilOppHvit';
import LenkeMedIkon from 'komponenter/footer/lenke-med-ikon/LenkeMedIkon';
import { AppState } from 'store/reducers';
import { MenyNode } from 'store/reducers/menu-duck';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import BEMHelper from 'utils/bem';

import Spraakvalg from './spraakvalg/Spraakvalg';
import FooterArbeidsflatevalg from './footer-arbeidsflatevalg/FooterArbeidsflatevalg';
import FooterLenker from '../../Lenker';
import { LinksLoader } from '../../../common/content-loaders/LinkLoader';

import './FooterTopp.less';

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
                        <LenkeMedIkon
                            href="#scroll-til-toppen"
                            onClick={scrollToTop}
                            tekst={<Tekst id="footer-til-toppen" />}
                            ikon={
                                <PilOppHvit
                                    style={{ height: '18px', width: '18px' }}
                                />
                            }
                            venstrestiltIkon={true}
                        />
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
                        {kontaktNode ? (
                            <FooterLenker node={kontaktNode} />
                        ) : (
                            <LinksLoader id="kontakt-loader" />
                        )}
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
                        {samfunnNode ? (
                            <FooterLenker node={samfunnNode} />
                        ) : (
                            <LinksLoader id="samfunn-loader" />
                        )}
                    </ul>
                </div>
                <FooterArbeidsflatevalg />
            </div>
        </section>
    );
};

export default FooterTopp;
