import React from 'react';
import BEMHelper from '../../utils/bem';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import './Footer.less';

const cls = BEMHelper('sitefooter');

const Footer = () => {
    return (
        <footer className={cls.className} role="contentinfo">
            <FooterTopp classname={cls.className} />
            <FooterBottom classname={cls.className} />
        </footer>
    );
};

export default Footer;
