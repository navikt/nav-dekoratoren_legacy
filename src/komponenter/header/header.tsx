import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './header.less';

class Header extends React.Component {
    render() {
        return (
            <header className="app-header">
                <div className="banner">
                    <Sidetittel className="header__tittel">
                        NAV HEADER
                    </Sidetittel>
                </div>
            </header>
        );
    }
}
export default Header;
