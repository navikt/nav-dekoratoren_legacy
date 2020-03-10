import React from 'react';
import BEMHelper from '../../utils/bem';
import FooterTopp from './footer-topp/FooterTopp';
import FooterArbeidsflatevalg from './footer-arbeidsflatevalg/FooterArbeidsflatevalg';
import FooterBottom from './footer-bottom/FooterBottom';
import './Footer.less';

const cls = BEMHelper('sitefooter');

const Footer = () => {
    return (
        <footer className={cls.className} id="footer" role="contentinfo">
            <div className={cls.element('innhold')}>
                <FooterTopp classname={cls.className} />
                <FooterArbeidsflatevalg classname={cls.className} />
                <FooterBottom classname={cls.className} />
            </div>
        </footer>
    );
};

export default Footer;
