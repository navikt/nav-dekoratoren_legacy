import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { ChatbotWrapper } from 'komponenter/footer/chatbot/ChatbotWrapper';
import Logo from 'ikoner/meny/nav-logo-white.svg';
import { BodyShort } from '@navikt/ds-react';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import style from './FooterBottom.module.scss';

const FooterBottom = () => {
    return (
        <div className={style.menylinjeBottom}>
            <div className={style.footerBottomContent}>
                <div className={style.topRow}>
                    <ChatbotWrapper />
                    <Bilde asset={Logo} ariaHidden={true} />
                </div>
                <div className={style.bottomLenker}>
                    <BodyShort>
                        <Tekst id="footer-arbeids-og-veldferdsetaten" />
                    </BodyShort>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;
