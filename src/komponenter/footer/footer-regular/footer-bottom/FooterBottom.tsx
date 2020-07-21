import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import { GACategory, gaEvent } from 'utils/google-analytics';
import DelSkjerm from 'ikoner/del-skjerm/DelSkjerm';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import { MenyNode } from 'store/reducers/menu-duck';
import FooterLenker from 'komponenter/footer/common/Lenker';
import LenkeMedIkon from 'komponenter/footer/common/lenke-med-ikon/LenkeMedIkon';
import DelSkjermModal from 'komponenter/footer/common/del-skjerm-modal/DelSkjermModal';
import { LinkLoader } from '../../../common/content-loaders/LinkLoader';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import './FooterBottom.less';
import Logo from 'ikoner/meny/nav-logo-black.svg'

const FooterBottom = () => {
    const cls = BEMHelper('footer-bottom-content');
    const [visDelSkjermModal, setVisDelSkjermModal] = useState(false);
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const [personvernNode, settPersonvernNode] = useState<MenyNode>();
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !personvernNode) {
            settPersonvernNode(findNode(noder, 'Personvern'));
        }
    }, [data, personvernNode]);

    const openModal = () => {
        gaEvent({
            context: arbeidsflate,
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });
        setVisDelSkjermModal(true);
    };

    const closeModal = () => {
        gaEvent({
            context: arbeidsflate,
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setVisDelSkjermModal(false);
    };

    return (
        <section className="menylinje-bottom">
            <div className={cls.className}>
                <NavLogoLenke
                    gaEventArgs={{
                        context: arbeidsflate,
                        category: GACategory.Footer,
                        action: 'navlogo',
                    }}
                    ikon={Logo}
                />
                <div className={cls.element('bottom-lenker')}>
                    <div>
                        <Normaltekst className="bottom-tekst">
                            <Tekst id="footer-arbeids-og-veldferdsetaten" />
                        </Normaltekst>
                        <ul className={cls.element('personvern-lenker')}>
                            {personvernNode ? (
                                <FooterLenker node={personvernNode} />
                            ) : (
                                <LinkLoader id={'personvern-loader'} />
                            )}
                        </ul>
                    </div>

                    <LenkeMedIkon
                        className={cls.element('del-skjerm')}
                        onClick={openModal}
                        tekst={<Tekst id="footer-del-skjerm" />}
                        ikon={
                            <DelSkjerm
                                style={{ height: '24px', width: '24px' }}
                            />
                        }
                    />
                </div>
                {visDelSkjermModal && (
                    <DelSkjermModal
                        isOpen={visDelSkjermModal}
                        onClose={closeModal}
                    />
                )}
            </div>
        </section>
    );
};

export default FooterBottom;
