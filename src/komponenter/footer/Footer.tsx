import React from 'react';
import Environment from '../../utils/Environment';
import SimpleFooter from './FooterSimple';
import RegularFooter from './FooterRegular';
import BEMHelper from '../../utils/bem';
import './Footer.less';

const cls = BEMHelper('sitefooter');

const Footer = () => (
    <footer className={cls.className} role="contentinfo">
        {Environment.SIMPLE ? (
            <SimpleFooter className={cls.className} />
        ) : (
            <RegularFooter className={cls.className} />
        )}
    </footer>
);

export default Footer;
