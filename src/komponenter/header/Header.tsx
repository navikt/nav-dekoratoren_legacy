import * as React from 'react';
import './Header.less';
import Toppmeny from './toppmeny/Toppmeny';
import NedtrekksMeny from './nedtrekksmeny/NedtrekksMeny';
import {
    chooseMenubase,
    getMenuStorage,
    MenyVal,
    NAVHEADER,
} from './nedtrekksmeny/StorageProvider';
import HovedSeksjon from './nedtrekksmeny/HovedSeksjon';
import MinsideSeksjon from './nedtrekksmeny/MinsideSeksjon';
import { toppMenyLenker } from './menyLenker/ToppMenyLenker';

interface State {
    valgtmeny: MenyVal;
    clicked: boolean;
    menyLenker: Object;
}

class Header extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            valgtmeny: getMenuStorage(),
            clicked: false,
            menyLenker: chooseMenubase(),
        };
    }

    dropDownExpand = () => {
        this.setState({
            clicked: !this.state.clicked,
        });
    };

    private setMenuStorage = (
        e: React.MouseEvent<HTMLAnchorElement>,
        valgVerdi: MenyVal,
        url: string
    ): any => {
        e.preventDefault();
        const headervalg = sessionStorage.getItem(NAVHEADER);
        if (headervalg && headervalg == valgVerdi) {
            return null;
        }
        sessionStorage.setItem(NAVHEADER, valgVerdi);
        this.setState({
            valgtmeny: valgVerdi,
            menyLenker: chooseMenubase(),
        });
        window.location.href = url;
    };

    render() {
        return (
            <div id="header-withmenu">
                <div className="hodefot">
                    <header className="siteheader blokk-m">
                        <div className="innhold-container">
                            <Toppmeny
                                lenker={toppMenyLenker}
                                menyValg={this.state.valgtmeny}
                                callMenuStorage={this.setMenuStorage}
                            />
                            <NedtrekksMeny
                                dropDownExpand={this.dropDownExpand}
                                clicked={this.state.clicked}
                            >
                                <HovedSeksjon
                                    classname="nedtrekksmeny"
                                    menyLenker={this.state.menyLenker}
                                />
                                <MinsideSeksjon className="nedtrekksmeny" />
                            </NedtrekksMeny>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}
export default Header;
