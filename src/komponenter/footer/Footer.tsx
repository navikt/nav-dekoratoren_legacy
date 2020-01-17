import * as React from 'react';
import BEMHelper from '../../utils/bem';
import FooterTopp from './footer-topp/FooterTopp';
import FooterBottom from './footer-bottom/FooterBottom';
import './Footer.less';

const cls = BEMHelper('footer');

const Footer = () => {
    return (
        <div className="navno-dekorator">
            <div className={cls.className}>
                <div className="hodefot">
                    <footer className="sitefooter" role="contentinfo">
                        <div className={cls.element('innhold')}>
                            <FooterTopp classname={cls.className} />
                            <FooterBottom classname={cls.className} />
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};
export default Footer;
