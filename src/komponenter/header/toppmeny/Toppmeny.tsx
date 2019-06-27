import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import Cheveron from 'nav-frontend-chevron';
import Navlogo from './Navlogo';
import './Toppmeny.less';
import { MenyVal } from '../nedtrekksmeny/StorageProvider';

const cls = BEMHelper('toppmeny');

interface Props {
    menyValg: any;
    callMenuStorage: (
        e: React.MouseEvent<HTMLAnchorElement>,
        valgVerdi: MenyVal,
        url: string
    ) => void;
    lenker: any;
}

const Toppmeny = (props: Props) => {
    return (
        <nav className="toppmeny">
            <div className={cls.element('venstreMeny')}>
                <Lenke className="navbar-brand" href="javascript:void(0)">
                    <Navlogo />
                </Lenke>
                <ul>
                    {console.log(props.menyValg)}
                    {props.lenker.map((lenke: any) => {
                        return (
                            <li key={lenke.tittel}>
                                <a
                                    className={cls.element(
                                        'hoved',
                                        props.menyValg == lenke.tittel
                                            ? 'active'
                                            : ''
                                    )}
                                    href={lenke.url}
                                    onClick={event =>
                                        props.callMenuStorage(
                                            event,
                                            lenke.key,
                                            lenke.url
                                        )
                                    }
                                >
                                    <EtikettLiten tag="h3">
                                        {lenke.tittel}
                                    </EtikettLiten>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={cls.element('hoyreMeny')}>
                <div>
                    <ul>
                        <li className="dropdown">
                            <a href="javascript:void(0)" className="dropbtn">
                                <Normaltekst>
                                    Språk/Languages
                                    <Cheveron type="ned" />
                                </Normaltekst>
                            </a>
                            <div className="dropdown-content">
                                <a className="his," href="#">
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
};

export default Toppmeny;
