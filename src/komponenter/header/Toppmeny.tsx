import * as React from 'react';
import './toppmeny.less';
import logo from './logo.png';
// import { Undertittel, Sidetittel } from "nav-frontend-typografi";
// import Lenke from 'nav-frontend-lenker';

class Toppmeny extends React.Component {
    render() {
        return (
            <nav className="toppmeny">
                <ul>
                    <li id="logo">
                        <a href="#"><img src={logo}/></a>
                    </li>
                    <li>
                        <a href="#">PRIVAT</a>
                    </li>
                    <li>
                        <a href="#">BEDRIFT</a>
                    </li>
                    <li>
                        <a href="#">ANDRE</a>
                    </li>
                    <li id="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Språk</a>
                        <ul className="dropdown-content">
                            <li><a href="#">Norsk Bokmål</a></li>
                            <li><a href="#">Norsk Sidemål</a></li>
                            <li><a href="#">English</a></li>
                            <li><a href="#">Samisk</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Toppmeny;
