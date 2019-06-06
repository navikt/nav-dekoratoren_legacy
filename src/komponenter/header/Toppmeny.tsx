import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import LoggInnKnapp from './Logg-inn-knapp';
import logo from './nav-logo.svg';
import './Toppmeny.less';

class Toppmeny extends React.Component {
    render() {
        return (
            <nav className="toppmeny">
                <ul>
                    <li id="logo">
                        <Lenke href="#">
                            <img src={logo} />
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="#">
                            <Undertittel tag="h3">PRIVAT</Undertittel>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="#">
                            <Undertittel tag="h3">BEDRIFT</Undertittel>
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="#">
                            <Undertittel tag="h3">ANDRE</Undertittel>
                        </Lenke>
                    </li>
                    <li id="dropdown">
                        <Lenke href="javascript:void(0)" className="dropbtn">
                            <Undertittel tag="h3">Språk</Undertittel>
                        </Lenke>
                        <ul className="dropdown-content">
                            <li>
                                <a href="#">
                                    <Normaltekst>Norsk Bokmål</Normaltekst>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Normaltekst>Norsk Sidemål</Normaltekst>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Normaltekst>English</Normaltekst>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Normaltekst>Samisk</Normaltekst>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <LoggInnKnapp />
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Toppmeny;
