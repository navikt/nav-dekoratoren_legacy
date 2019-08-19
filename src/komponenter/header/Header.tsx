import React from 'react';
import { AppState } from '../../reducer/reducer';
import { Dispatch } from '../../redux/dispatch-type';
import { fetchMenypunkter, MenyPunkter } from '../../reducer/menu-duck';
import { connect } from 'react-redux';
import HeaderContent from './HeaderContent';

interface StateProps {
    meny: MenyPunkter;
}

interface DispatchProps {
    hentMenypunkter: () => Promise<void>;
}

type MenuProps = StateProps & DispatchProps;

const Header = ({ meny, hentMenypunkter }: MenuProps) => {
    React.useEffect(() => {
        hentMenypunkter();
        },
                    []
    );

    return (
        <div>
            <HeaderContent meny={meny} />
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    meny: state.menypunkt,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentMenypunkter: () => fetchMenypunkter()(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
