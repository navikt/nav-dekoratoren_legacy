import React from 'react';
import SimpleFooter from './FooterSimple';
import RegularFooter from './FooterRegular';
import BEMHelper from '../../utils/bem';
import './Footer.less';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducers';

const cls = BEMHelper('sitefooter');
const Footer = () => {
    const { PARAMS } = useSelector((state: AppState) => state.environment);
    return (
        <footer className={cls.className} role="contentinfo">
            {PARAMS.SIMPLE ? (
                <SimpleFooter className={cls.className} />
            ) : (
                <RegularFooter className={cls.className} />
            )}
        </footer>
    );
};

export default Footer;
