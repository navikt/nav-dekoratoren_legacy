import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BEMHelper from 'utils/bem';
import { AnalyticsCategory } from 'utils/analytics';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import { MenyNode } from 'store/reducers/menu-duck';
import FooterLenker from 'komponenter/footer/common/Lenker';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import { ChatbotWrapper } from 'komponenter/footer/chatbot/ChatbotWrapper';
import { DelSkjermLenke } from 'komponenter/footer/common/del-skjerm-lenke/DelSkjermLenke';
import Logo from 'ikoner/meny/nav-logo-black.svg';
import './FooterBottom.less';
import { BodyShort } from '@navikt/ds-react';

const FooterBottom = () => {
    const cls = BEMHelper('footer-bottom-content');
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const [personvernNode, settPersonvernNode] = useState<MenyNode>();
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);
    const { PARAMS } = useSelector((state: AppState) => state.environment);

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !personvernNode) {
            settPersonvernNode(findNode(noder, 'Personvern'));
        }
    }, [data, personvernNode]);

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
                        <BodyShort className="bottom-tekst">
                            <Tekst id="footer-arbeids-og-veldferdsetaten" />
                        </BodyShort>
                        <ul className={cls.element('personvern-lenker')}>
                            <FooterLenker node={personvernNode} />
                            {PARAMS.SHARE_SCREEN && <DelSkjermLenke />}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;
