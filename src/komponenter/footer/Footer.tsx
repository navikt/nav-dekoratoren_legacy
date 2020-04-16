import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import SimpleFooter from './footer-simple/FooterSimple';
import FooterRegular from './footer-regular/FooterRegular';
import './Footer.less';

const Footer = () => {
    const { PARAMS } = useSelector((state: AppState) => state.environment);
    return (
        <footer className="sitefooter" role="contentinfo">
            {PARAMS.SIMPLE || PARAMS.SIMPLE_FOOTER ? (
                <SimpleFooter />
            ) : (
                <FooterRegular />
            )}
        </footer>
    );
};

export default Footer;
