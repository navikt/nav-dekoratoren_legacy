import React from 'react';
import { Dispatch } from '../../redux/dispatch-type';
import { connect } from 'react-redux';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import Toppmeny from './toppmeny/Toppmeny';
import Hovedmeny from './hovedmeny/Hovedmeny';
import './Header.less';

interface DispatchProps {
    hentMenypunkter: () => Promise<void>;
}

const Header = ({ hentMenypunkter }: DispatchProps) => {
    React.useEffect(() => {
        hentMenypunkter();
    }, []);

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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentMenypunkter: () => fetchMenypunkter()(dispatch),
});

export default connect(
    null,
    mapDispatchToProps
)(Header);
