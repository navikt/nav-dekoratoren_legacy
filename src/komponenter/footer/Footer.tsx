import * as React from 'react';
import BEMHelper from '../../utils/bem';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import './Footer.less';

const cls = BEMHelper('sitefooter');

const Footer = () => {
    return (
        <div className="navno-dekorator">
            <footer className={cls.className} role="contentinfo">
                <div className={cls.element('innhold')}>
                    <FooterTopp classname={cls.className} />
                    <FooterBottom classname={cls.className} />
                </div>
            </footer>
        </div>
    );
};
export default Footer;
