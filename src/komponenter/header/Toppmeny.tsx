import * as React from 'react';
import './toppmeny.less';
import logo from './hvit.svg';
// import { Undertittel, Sidetittel } from "nav-frontend-typografi";
import KnappBase from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';

class Toppmeny extends React.Component {
    render() {
        return (
            <nav className="toppmeny">
                <ul>
                    <li id="logo">
                        <Lenke href="#"><img src={logo}/></Lenke>
                    </li>
                    <li>
                        <Lenke href="#">PRIVAT</Lenke>
                    </li>
                    <li>
                        <Lenke href="#">BEDRIFT</Lenke>
                    </li>
                    <li>
                        <Lenke href="#">ANDRE</Lenke>
                    </li>
                    <li id="dropdown">
                        <Lenke href="javascript:void(0)" className="dropbtn">Språk</Lenke>
                        <ul className="dropdown-content">
                            <li><a href="#">Norsk Bokmål</a></li>
                            <li><a href="#">Norsk Sidemål</a></li>
                            <li><a href="#">English</a></li>
                            <li><a href="#">Samisk</a></li>
                        </ul>
                    </li>
                    <li>
                        <KnappBase type="standard">Logg inn</KnappBase>
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Toppmeny;
