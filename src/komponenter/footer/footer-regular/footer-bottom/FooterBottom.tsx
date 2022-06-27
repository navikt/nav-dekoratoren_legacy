import React from 'react';
import { useSelector } from 'react-redux';
import BEMHelper from 'utils/bem';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import { ChatbotWrapper } from 'komponenter/footer/chatbot/ChatbotWrapper';
import Logo from 'ikoner/meny/nav-logo-black.svg';
import './FooterBottom.less';
import { BodyShort } from '@navikt/ds-react';

const FooterBottom = () => {
    const cls = BEMHelper('footer-bottom-content');
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);

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
                    <BodyShort className="bottom-tekst">
                        <Tekst id="footer-arbeids-og-veldferdsetaten" />
                    </BodyShort>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;
