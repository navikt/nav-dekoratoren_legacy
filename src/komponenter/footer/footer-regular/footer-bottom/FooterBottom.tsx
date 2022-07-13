import React from 'react';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { ChatbotWrapper } from 'komponenter/footer/chatbot/ChatbotWrapper';
import Logo from 'ikoner/meny/nav-logo-white.svg';
import { BodyShort } from '@navikt/ds-react';
import { Bilde } from 'komponenter/common/bilde/Bilde';

import './FooterBottom.less';

const FooterBottom = () => {
    const cls = BEMHelper('footer-bottom-content');
    return (
        <div className="menylinje-bottom">
            <div className={cls.className}>
                <div className={'top-row'}>
                    <ChatbotWrapper />
                    <Bilde asset={Logo} ariaHidden={true} />
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
