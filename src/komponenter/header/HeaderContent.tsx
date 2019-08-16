import * as React from 'react';
import './Header.less';
import Toppmeny from './toppmeny/Toppmeny';
import {
    hentStatus,
    MenuValue,
    NAVHEADER,
    setMenuView,
} from '../../provider/Storage-provider';
import DropdownHoyreSeksjon from './hovedmeny/dropdown-meny/DropdownHoyreSeksjon';
import { toppmenyLenker } from './toppmeny/Toppmeny-lenker';
import { MenyPunkter } from '../../reducer/menu-duck';
import DropdownVenstreSeksjon from './hovedmeny/dropdown-meny/DropdownVenstreSeksjon';
import Hovedmeny from './hovedmeny/Hovedmeny';
import Skiplinks from './skiplinks/Skiplinks';

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

    render() {
        return (
            <>
                <Skiplinks />
                <div id="header-withmenu">
                    <div className="hodefot">
                        <header className="siteheader blokk-m">
                            <div className="innhold-container">
                                <Toppmeny
                                    lenker={toppmenyLenker}
                                    menyValg={this.state.toppmeny}
                                    callMenuStorage={this.setMenuStorage}
                                />
                                <Hovedmeny
                                    dropDownExpand={this.dropDownExpand}
                                    clicked={this.state.clicked}
                                >
                                    <DropdownVenstreSeksjon
                                        classname="nedtrekksmeny"
                                        menyLenker={this.state.meny}
                                        status={this.props.meny.status}
                                    />
                                    <DropdownHoyreSeksjon className="nedtrekksmeny" />
                                </Hovedmeny>
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
    };
}
export default HeaderContent;
