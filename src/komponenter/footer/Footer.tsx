import * as React from 'react';
import { AppState } from '../../reducer/reducer';
import { connect } from 'react-redux';
import BEMHelper from '../../utils/bem';
import { Language } from '../../reducer/language-duck';
import FooterLenkeMeny from './FooterLenkeMeny';
import './Footer.less';
import LanguageProvider from '../../provider/Language-provider';

const cls = BEMHelper('footer');

interface StateProps {
    language: Language;
}

const Footer = ({ language }: StateProps) => {
    return (
        <LanguageProvider>
            <div id="footer-withmenu">
                <div className={cls.className}>
                    <div className="hodefot">
                        <FooterLenkeMeny
                            className={cls.className}
                            language={language}
                        />
                    </div>
                </div>
            </div>
        </LanguageProvider>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Footer);
