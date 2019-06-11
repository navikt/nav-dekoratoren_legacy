import * as React from 'react';
import './Header.less';
import Toppmeny from './toppmeny/Toppmeny';
import NedtrekksMeny from './nedtrekksmeny/NedtrekksMeny';

class Header extends React.Component {

   render() {
        return (
            <div id="header-withmenu">
                <div className="hodefot">
                    <header className="siteheader blokk-m">
                        <div className="innhold-container">
                            <Toppmeny />
                            <NedtrekksMeny />
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}
export default Header;