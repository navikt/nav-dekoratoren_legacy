import * as React from 'react';
import './header.less';
import Toppmeny from './Toppmeny';

class Header extends React.Component {

   render() {
        return (
            <div id="header-withmenu">
                <div className="hodefot">
                    <header className="siteheader blokk-m">
                        <div className="innhold-container">
                            <Toppmeny/>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}
export default Header;