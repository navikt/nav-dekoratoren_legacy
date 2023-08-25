import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import SimpleFooter from './footer-simple/FooterSimple';
import FooterRegular from './footer-regular/FooterRegular';
import { mapToClosestTranslatedLanguage } from 'utils/language';
import { LogoutWarning } from 'komponenter/header/logoutWarning/LogoutWarning';

const Footer = () => {
    const { PARAMS, ENV } = useSelector((state: AppState) => state.environment);
    const { language } = useSelector((state: AppState) => state.language);

    return (
        <>
            <div
                id="decorator-footer-inner"
                className="decorator-wrapper"
                lang={mapToClosestTranslatedLanguage(language, 'footer')}
            >
                <footer className="sitefooter">
                    {PARAMS.SIMPLE || PARAMS.SIMPLE_FOOTER ? <SimpleFooter /> : <FooterRegular />}
                </footer>
                {(PARAMS.LOGOUT_WARNING || ENV === 'prod') && <LogoutWarning />}
                <div id="logout-warning" />
            </div>
        </>
    );
};

export default Footer;
