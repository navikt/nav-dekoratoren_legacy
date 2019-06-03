import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../redux/dispatch-type';
import { hentInnloggingsstatus } from '../../ducks/innloggingsstatus';
import { AppState } from '../../redux/reducer';
import './header.less';
import Toppmeny from './Toppmeny';

interface StateProps {
    erInnlogget: boolean;
}

interface DispatchProps {
    doHentInnloggingsstatus: () => void;
}

type HeaderProps = StateProps & DispatchProps;

class Header extends React.Component<HeaderProps> {

    constructor(props: HeaderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentInnloggingsstatus();
    }

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

const mapStateToProps = (state: AppState): StateProps => ({
    erInnlogget: state.innloggingsstatus.data.authenticated,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentInnloggingsstatus: () => hentInnloggingsstatus()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);