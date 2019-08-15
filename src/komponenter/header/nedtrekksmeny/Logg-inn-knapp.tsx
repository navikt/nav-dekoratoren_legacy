import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import KnappBase from 'nav-frontend-knapper';
import Environments from '../../../utils/Environments';
import AlertStripe from 'nav-frontend-alertstriper';
import Lukknapp from 'nav-frontend-lukknapp';

const { baseUrl, logoutUrl, loginUrl } = Environments();
const path =
    window.location.pathname.split('/')[3] !== undefined
        ? '/person/nav-dekoratoren/' + window.location.pathname.split('/')[3]
        : '/person';

const login = `${loginUrl}/login?redirect=${baseUrl}${path}`;

interface StateProps {
    erInnlogget: boolean;
    navn: string;
}

interface State {
    informasjonboks: Object;
}

class LoggInnKnapp extends React.Component<StateProps, State> {
    constructor(props: StateProps) {
        super(props);
        this.state = {
            informasjonboks: <div />,
        };
    }

    lukkdialogBoks = () => {
        this.setState({
            informasjonboks: <div />,
        });
    };

    informasjon = (
        <div>
            <AlertStripe type={'advarsel'}>
                I locahost fungerer ikke innloggingslinjen. Og har blitt
                erstattet med mock-api{' '}
                <Lukknapp onClick={this.lukkdialogBoks} />
            </AlertStripe>
        </div>
    );

    handleButtonClick = () => {
        if (process.env.NODE_ENV === 'production') {
            return this.props.erInnlogget
                ? (window.location.href = logoutUrl)
                : (window.location.href = login);
        } else {
            this.setState({
                informasjonboks: this.informasjon,
            });
        }
    };

    render() {
        const { erInnlogget, navn } = this.props;
        const knappetekst = erInnlogget ? 'Logg ut' : 'Logg inn';
        const navnLC = erInnlogget && navn ? navn.toLowerCase() : '';
        return (
            <div className="login-container">
                <div className="login-knapp btn">
                    <KnappBase type="standard" onClick={this.handleButtonClick}>
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
