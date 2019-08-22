import * as React from 'react';
import {
    hentStatus,
    MenuValue,
    NAVHEADER,
} from '../../provider/Storage-provider';
import Skiplinks from './skiplinks/Skiplinks';
import Toppmeny from './toppmeny/Toppmeny';
import Hovedmeny from './hovedmeny/Hovedmeny';
import './Header.less';

interface State {
    toppmeny: MenuValue;
}

class HeaderContent extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            toppmeny: hentStatus(),
        };
    }

    render() {
        return (
            <>
                <Skiplinks />
                <div id="header-withmenu">
                    <div className="hodefot">
                        <header className="siteheader blokk-m">
                            <div className="innhold-container">
                                <Toppmeny
                                    menyValg={this.state.toppmeny}
                                    callMenuStorage={this.setMenuStorage}
                                />
                                <Hovedmeny />
                            </div>
                        </header>
                    </div>
                </div>
            </>
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
    }
}
export default HeaderContent;
