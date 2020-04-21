import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import NavLogoFooter from 'ikoner/meny/NavLogoFooter';
import DelSkjerm from 'ikoner/del-skjerm/DelSkjerm';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import { MenyNode } from 'store/reducers/menu-duck';
import FooterLenker from '../../FooterLenker';
import LenkeMedIkon from 'komponenter/footer/lenke-med-ikon/LenkeMedIkon';
import DelSkjermModal from 'komponenter/footer/del-skjerm-modal/DelSkjermModal';
import LenkeListe from 'komponenter/common/lenke-liste/LenkeListe';

import './FooterBottom.less';
import { LinkLoader } from 'komponenter/common/content-loaders/LinkLoader';

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
        triggerGaEvent({
            context: arbeidsflate,
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });
        setVisDelSkjermModal(true);
    };

    const closeModal = () => {
        triggerGaEvent({
            context: arbeidsflate,
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setVisDelSkjermModal(false);
    };

    return (
        <section className="menylinje-bottom">
            <div className={cls.className}>
                <NavLogoFooter
                    width="65"
                    height="65"
                    classname={cls.element('bottom-logo')}
                />
                <div className={cls.element('bottom-lenker')}>
                    <LenkeListe
                        tittel={{
                            tekst: (
                                <Tekst id="footer-arbeids-og-veldferdsetaten" />
                            ),
                        }}
                        data={
                            personvernNode ? personvernNode.children : undefined
                        }
                        listElement={(props) => <FooterLenker {...props} />}
                        linkLoader={<LinkLoader id="personvern-loader" />}
                    />

                    <LenkeMedIkon
                        className={cls.element('del-skjerm')}
                        onClick={openModal}
                        tekst={<Tekst id="footer-del-skjerm" />}
                        ikon={<DelSkjerm height={24} width={24} />}
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
