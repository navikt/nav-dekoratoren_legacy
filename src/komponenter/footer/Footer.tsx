import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './footer.less';

class Footer extends React.Component {
    render() {
        return (
            <div id="footer-withmenu">
                <div className="hodefot">
                    <footer className="sitefooter blokk-m" role="contentinfo">
                        <div className="footernavsection innhold-container">
                            <ul>
                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Telefon</Normaltekst>
                                    </Lenke>
                                </li>
                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Chat med oss</Normaltekst>
                                    </Lenke>
                                </li>
                                <li className="x">
                                    <Lenke href="#">
                                        <Normaltekst>
                                            Finn ditt NAV-kontor
                                        </Normaltekst>
                                    </Lenke>
                                </li>

                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Chat med oss</Normaltekst>
                                    </Lenke>
                                </li>
                                <li className="x">
                                    <Lenke href="#">
                                        <Normaltekst>
                                            Finn ditt NAV-kontor
                                        </Normaltekst>
                                    </Lenke>
                                </li>

                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>
                                            NAV og samfunn
                                        </Normaltekst>
                                    </Lenke>
                                </li>
                                <li className="x">
                                    <Lenke href="#">
                                        <Normaltekst>
                                            NAV på sosiale medier
                                        </Normaltekst>
                                    </Lenke>
                                </li>

                                <li className="x">
                                    <Lenke href="#">
                                        <Normaltekst>
                                            Nav på sosiale medier
                                        </Normaltekst>
                                    </Lenke>
                                </li>

                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Lovdata</Normaltekst>
                                    </Lenke>
                                </li>
                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Folketrygden</Normaltekst>
                                    </Lenke>
                                </li>
                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Rundskriv</Normaltekst>
                                    </Lenke>
                                </li>
                                <li className="x">
                                    <Lenke href="#">
                                        <Normaltekst>Forskrifter</Normaltekst>
                                    </Lenke>
                                </li>

                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Folketrygden</Normaltekst>
                                    </Lenke>
                                </li>
                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Rundskriv</Normaltekst>
                                    </Lenke>
                                </li>
                                <li>
                                    <Lenke href="#">
                                        <Normaltekst>Forskrifter</Normaltekst>
                                    </Lenke>
                                </li>
                            </ul>
                            <div className="copyright">
                                <p>
                                    <Normaltekst>
                                        Arbeids- og velferdsetaten 2019
                                    </Normaltekst>
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}
export default Footer;
