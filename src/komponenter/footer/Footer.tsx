import * as React from 'react';
import { AppState } from '../../reducer/reducer';
import { connect } from 'react-redux';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../utils/bem';
import { Language } from '../../reducer/language-duck';
import FooterLenkeMeny from './komponenter/FooterLenkeMeny';
import './Footer.less';

const cls = BEMHelper('footer');

interface StateProps {
    language: Language;
}

const Footer = ({ language }: StateProps) => {
    return (
        <div id="footer-withmenu" className={cls.className}>
            <div className="hodefot">
                <NyttigInfo />
                <FooterLenkeMeny
                    className={cls.className}
                    language={language}
                />
            </div>
        </div>
    );
};

const NyttigInfo = () => {
    return (
        <div className={cls.element('topp', 'left')}>
            <Element>Var denne informasjonen nyttig?</Element>
            <Lenke href="#">
                <Normaltekst>Ja</Normaltekst>
            </Lenke>
            <Lenke href="#">
                <Normaltekst>Nei</Normaltekst>
            </Lenke>
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Footer);
