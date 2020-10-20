import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics';
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
import { ChatbotWrapper } from 'komponenter/footer/chatbot/ChatbotWrapper';
import './FooterBottom.less';

import Logo from 'ikoner/meny/nav-logo-black.svg';

const FooterBottom = () => {
    const cls = BEMHelper('footer-bottom-content');
    const [visDelSkjermModal, setVisDelSkjermModal] = useState(false);
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const [personvernNode, settPersonvernNode] = useState<MenyNode>();
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !personvernNode) {
            settPersonvernNode(findNode(noder, 'Personvern'));
        }
    }, [data, personvernNode]);

    const openModal = () => {
        analyticsEvent({
            context: arbeidsflate,
            category: AnalyticsCategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });
        setVisDelSkjermModal(true);
    };

    const closeModal = () => {
        analyticsEvent({
            context: arbeidsflate,
            category: AnalyticsCategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setVisDelSkjermModal(false);
    };

    return (
        <div className="menylinje-bottom">
            <div className={cls.className}>
                <div className={'top-row'}>
                    <ChatbotWrapper />
                    <NavLogoLenke
                        analyticsEventArgs={{
                            context: arbeidsflate,
                            category: AnalyticsCategory.Footer,
                            action: 'navlogo',
                        }}
                        ikon={Logo}
                    />
                </div>
                <div className={cls.element('bottom-lenker')}>
                    <div>
                        <Normaltekst className="bottom-tekst">
                            <Tekst id="footer-arbeids-og-veldferdsetaten" />
                        </Normaltekst>
                        <ul className={cls.element('personvern-lenker')}>
                            {personvernNode ? (
                                <FooterLenker node={personvernNode} />
                            ) : (
                                <li>
                                    <LinkLoader id={'personvern-loader'} />
                                </li>
                            )}
                        </ul>
                    </div>

                    <LenkeMedIkon
                        className={cls.element('del-skjerm')}
                        onClick={openModal}
                        tekst={<Tekst id="footer-del-skjerm" />}
                        ikon={<DelSkjerm style={{ height: '24px', width: '24px' }} />}
                    />
                </div>
                {visDelSkjermModal && <DelSkjermModal isOpen={visDelSkjermModal} onClose={closeModal} />}
            </div>
        </div>
    );
};

export default FooterBottom;
