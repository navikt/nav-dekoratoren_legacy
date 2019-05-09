import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './header.less';

class Header extends React.Component {
    render() {
        return (
            <div className="hodefot">
                <header className="siteheader blokk-m">
                    <div className="banner">
                        <Sidetittel className="header__tittel">
                            NAV HEADER
                        </Sidetittel>
                    </div>
                </header>
            </div>
        );
    }
}
export default Header;
