import React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import { toppmenyLenker } from './toppmeny-lenker';
import {
    hentStatus,
    MenuValue,
    NAVHEADER,
} from '../../../provider/Storage-provider';
import './Toppmeny.less';

interface State {
    toppmeny: MenuValue;
}

class Toppmeny extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            toppmeny: hentStatus(),
        };
    }

    render() {
        const cls = BEMHelper('toppmeny');

        return (
            <nav className="toppmeny">
                <ul className={cls.element('topp-liste-rad')} role="tablist">
                    {toppmenyLenker.map(
                        (lenke: {
                            tittel: string;
                            url: string;
                            key: MenuValue;
                        }) => {
                            return (
                                <li
                                    role="tab"
                                    aria-selected={this.state.toppmeny === lenke.tittel ? 'true' : 'false'}
                                    className={cls.element('list-element')}
                                    key={lenke.tittel}
                                >
                                    <a
                                        className={cls.element('lenke')}
                                        href={lenke.url}
                                        onClick={event =>
                                            this.setMenuStorage(
                                                event,
                                                lenke.key,
                                                lenke.url
                                            )
                                        }
                                    >
                                        <div className={cls.element('inner', this.state.toppmeny === lenke.tittel ? 'active' : '')}>
                                            <EtikettLiten>
                                                {lenke.tittel}
                                            </EtikettLiten>
                                        </div>
                                    </a>
                                </li>
                            );
                        }
                    )}
                </ul>
            </nav>
        );
    }

    private setMenuStorage = (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
        valgVerdi: MenuValue,
        url: string
    ): void => {
        e.preventDefault();
        const headervalg = sessionStorage.getItem(NAVHEADER);
        if (headervalg && headervalg === valgVerdi) {
            return;
        }
        sessionStorage.setItem(NAVHEADER, valgVerdi);
        this.setState({
                          toppmeny: valgVerdi,
                      });
        window.location.href = url;
    };
}
export default Toppmeny;