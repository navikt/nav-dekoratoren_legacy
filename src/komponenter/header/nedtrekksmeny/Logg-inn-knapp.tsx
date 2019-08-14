import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import KnappBase from 'nav-frontend-knapper';
import Environments from '../../../utils/Environments';

const { baseUrl, logoutUrl, loginUrl } = Environments();
const path =
    window.location.pathname.split('/')[3] !== undefined
        ? '/person/nav-dekoratoren/' + window.location.pathname.split('/')[3]
        : '/person';

const login = `${loginUrl}/login?redirect=${baseUrl}${path}`;

interface StateProps {
    erInnlogget: boolean;
}

class LoggInnKnapp extends React.Component<StateProps> {
    constructor(props: StateProps) {
        super(props);
    }

    handleButtonClick = () => {
        if (this.props.erInnlogget) {
            window.location.href = logoutUrl;
        } else {
            window.location.href = login;
        }
    }

    render() {
        const { erInnlogget } = this.props;
        const knappetekst = erInnlogget ? 'Logg ut' : 'Logg inn';

        return (
            <div className="login-container">
                <div className="login-knapp btn">
                    <KnappBase type="hoved" onClick={this.handleButtonClick}>
                        {knappetekst}
                    </KnappBase>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: AppState): StateProps => ({
    erInnlogget: state.innloggingsstatus.data.authenticated,
});

export default connect(mapStateToProps)(LoggInnKnapp);
