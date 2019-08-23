import * as React from 'react';
import Skiplinks from './skiplinks/Skiplinks';
import Toppmeny from './toppmeny/Toppmeny';
import Hovedmeny from './hovedmeny/Hovedmeny';
import './Header.less';

const HeaderContent = () => {
    return (
        <>
            <Skiplinks />
            <div id="header-withmenu">
                <div className="hodefot">
                    <header className="siteheader blokk-m">
                        <div className="innhold-container">
                            <Toppmeny />
                            <Hovedmeny />
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
};

export default HeaderContent;
