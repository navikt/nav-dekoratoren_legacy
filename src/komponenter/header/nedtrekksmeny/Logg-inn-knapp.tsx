import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import KnappBase from 'nav-frontend-knapper';
import Environments from '../../../utils/Environments';

const { baseUrl, logoutUrl } = Environments();
const loginUrl = `${baseUrl}/person/dittnav`;

interface StateProps {
    erInnlogget: boolean;
    navn: string;
}

class LoggInnKnapp extends React.Component<StateProps> {
    constructor(props: StateProps) {
        super(props);
    }

    handleButtonClick = () => {
        if (this.props.erInnlogget) {
            window.location.href = logoutUrl;
        } else {
            window.location.href = loginUrl;
        }
    };

    render() {
        const { erInnlogget, navn } = this.props;
        const knappetekst = erInnlogget ? 'Logg ut' : 'Logg inn';
        const navnLC = erInnlogget && navn ? navn.toLowerCase() : '';
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
    navn: state.innloggingsstatus.data.name,
});

export default connect(mapStateToProps)(LoggInnKnapp);
