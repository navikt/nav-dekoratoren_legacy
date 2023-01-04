import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import SimpleFooter from './footer-simple/FooterSimple';
import FooterRegular from './footer-regular/FooterRegular';

const Footer = () => {
    const { PARAMS } = useSelector((state: AppState) => state.environment);
    return (
        <div id="decorator-footer-inner" className="decorator-wrapper">
            <footer className="sitefooter">
                {PARAMS.SIMPLE || PARAMS.SIMPLE_FOOTER ? <SimpleFooter /> : <FooterRegular />}
            </footer>
        </div>
    );
};

export default Footer;
