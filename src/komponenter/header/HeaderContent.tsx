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
import { Data, DataInitState, MenyPunkter } from '../../reducer/menu-duck';
import DropdownVenstreSeksjon from './hovedmeny/dropdown-meny/DropdownVenstreSeksjon';
import Hovedmeny from './hovedmeny/Hovedmeny';
import Skiplinks from './skiplinks/Skiplinks';
import { Status } from '../../api/api';

interface State {
    clicked: boolean;
    toppmeny: MenuValue;
    meny: Data;
    minside: Data;
    menyStatus: Status;
}

interface MenuProps {
    meny: MenyPunkter;
}

class HeaderContent extends React.Component<MenuProps, State> {

    static minside<T, K extends keyof T>(meny: T, key: K): T[K] {
        return meny[key];
    }

    constructor(props: MenuProps) {
        super(props);
        this.state = {
            clicked: false,
            meny: DataInitState,
            minside: DataInitState,
            menyStatus: Status.IKKE_STARTET,
            toppmeny: hentStatus(),
        };
    }

    componentDidUpdate(prevProps: MenuProps, prevState: State) {
        if (
            prevProps.meny.status !== this.props.meny.status &&
            this.props.meny.status === Status.OK
        ) {
            this.setState({
                meny: setMenuView(this.props.meny.data),
                minside: HeaderContent.minside(this.props.meny.data, 3),
                menyStatus: Status.OK,
            });
        }
    }

    dropDownExpand = () => {
        this.setState({
            clicked: !this.state.clicked,
        });
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
                                        classname="hovedmeny"
                                        menyLenker={this.state.meny}
                                        status={this.state.menyStatus}
                                    />
                                    <DropdownHoyreSeksjon
                                        minsideMenyView={this.state.minside}
                                        className="hovedmeny"
                                    />
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
    }
}
export default HeaderContent;
