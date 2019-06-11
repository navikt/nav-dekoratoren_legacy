import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import './toppmeny.less';

import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import Navlogo from './../Navlogo';
import BEMHelper from '../../../utils/bem';
import Cheveron from 'nav-frontend-chevron';

const cls = BEMHelper('toppmeny');

class Toppmeny extends React.Component {
    render() {
        return (
            <nav className="toppmeny">
                <div className={cls.element('venstreMeny')}>
                    <Lenke className="navbar-brand" href="javascript:void(0)">
                        <Navlogo />
                    </Lenke>

                    <ul>
                        <li>
                            <Lenke
                                className={cls.element('hoved', 'active')}
                                href="#"
                            >
                                <EtikettLiten tag="h3">
                                    PRIVATPERSON
                                </EtikettLiten>
                            </Lenke>
                        </li>

                        <li>
                            <Lenke className={cls.element('hoved')} href="#">
                                <EtikettLiten tag="h3">BEDRIFT</EtikettLiten>
                            </Lenke>
                        </li>

                        <li>
                            <Lenke className={cls.element('hoved')} href="#">
                                <EtikettLiten tag="h3">ANDRE</EtikettLiten>
                            </Lenke>
                        </li>
                    </ul>
                </div>
                <div className={cls.element('hoyreMeny')}>
                    <div>
                        <ul>
                            <li className="dropdown">
                                <a
                                    href="javascript:void(0)"
                                    className="dropbtn"
                                >
                                    <Normaltekst>
                                        språk/Languages
                                        <Cheveron type="ned" />
                                    </Normaltekst>
                                </a>
                                <div className="dropdown-content">
                                    <a className="dropvalg" href="#">
                                        Bokmål
                                    </a>
                                    <a className="dropvalg" href="#">
                                        Nynorsk
                                    </a>
                                    <a className="dropvalg" href="#">
                                        English
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Toppmeny;
