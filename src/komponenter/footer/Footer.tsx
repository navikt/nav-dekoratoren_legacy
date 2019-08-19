import * as React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '../../utils/bem';
import FooterLenkeMeny from './komponenter/FooterLenkeMeny';
import './Footer.less';

const cls = BEMHelper('footer');

class Footer extends React.Component {
    render() {
        return (
            <div id="footer-withmenu" className={cls.className}>
                <div className="hodefot">
                    <div className={cls.element('topp')}>
                        <div className={cls.element('topp', 'left')}>
                            <Element>Var denne informasjonen nyttig?</Element>
                            <Lenke href="#">
                                <Normaltekst>Ja</Normaltekst>
                            </Lenke>
                            <Lenke href="#">
                                <Normaltekst>Nei</Normaltekst>
                            </Lenke>
                        </div>
                        <div className={cls.element('topp', 'right')}>
                            <Lenke href="#">
                                <Normaltekst>
                                    Er det noe galt med denne siden?
                                </Normaltekst>
                            </Lenke>
                        </div>
                    </div>
                    <footer className="sitefooter" role="contentinfo">
                        <FooterLenkeMeny className={cls.className} />
                    </footer>
                </div>
            </div>
        );
    }
}
export default Footer;
