import * as React from 'react';
import './Header.less';
import Toppmeny from './toppmeny/Toppmeny';
import {
    hentStatus,
    MenuValue,
    NAVHEADER,
    setMenuView,
} from './nedtrekksmeny/StorageProvider';
import MinsideSeksjon from './nedtrekksmeny/MinsideSeksjon';
import { toppMenyLenker } from './menyLenker/ToppMenyLenker';
import { Data, MenyPunkter } from '../../redux/menuReducer';
import DropDownSeksjon from './nedtrekksmeny/DropDownSeksjon';
import HovedMeny from './nedtrekksmeny/HovedMeny';

interface State {
    clicked: boolean;
    toppmeny: MenuValue;
    meny: {
        children: {}[];
        displayName: string;
        hasChildren: boolean;
        path: string;
    };
}

interface MenuProps {
    meny: MenyPunkter;
}

class HeaderContent extends React.Component<MenuProps, State> {
    constructor(props: MenuProps) {
        super(props);
        this.state = {
            clicked: false,
            meny: {
                children: [{}],
                displayName: '',
                hasChildren: false,
                path: '',
            },
            toppmeny: hentStatus(),
        };
    }

    dropDownExpand = () => {
        this.setState({
            clicked: !this.state.clicked,
        });
    };

    componentWillReceiveProps(
        nextProps: Readonly<MenuProps>,
        nextContext: any
    ): void {
        if (this.props.meny !== nextProps.meny) {
            this.setState({
                meny: setMenuView(nextProps.meny.data),
            });
        }
    }

    private setMenuStorage = (
        e: React.MouseEvent<HTMLAnchorElement>,
        valgVerdi: MenuValue,
        url: string
    ): void => {
        e.preventDefault();
        const headervalg = sessionStorage.getItem(NAVHEADER);
        if (headervalg && headervalg == valgVerdi) {
            return;
        }
        sessionStorage.setItem(NAVHEADER, valgVerdi);
        this.setState({
            toppmeny: valgVerdi,
        });
        window.location.href = url;
    };

    render() {
        return (
            <>
                <div id="header-withmenu">
                    <div className="hodefot">
                        <header className="siteheader blokk-m">
                            <div className="innhold-container">
                                <Toppmeny
                                    lenker={toppMenyLenker}
                                    menyValg={this.state.toppmeny}
                                    callMenuStorage={this.setMenuStorage}
                                />
                                <HovedMeny
                                    dropDownExpand={this.dropDownExpand}
                                    clicked={this.state.clicked}
                                >
                                    <DropDownSeksjon
                                        classname="nedtrekksmeny"
                                        menyLenker={this.state.meny}
                                        status={this.props.meny.status}
                                    />
                                    <MinsideSeksjon className="nedtrekksmeny" />
                                </HovedMeny>
                            </div>
                        </header>
                    </div>
                </div>
            </>
        );
    }
}
export default HeaderContent;
