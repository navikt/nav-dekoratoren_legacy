import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../reducer/reducer';
import KnappBase from 'nav-frontend-knapper';
import AlertStripe from 'nav-frontend-alertstriper';
import Lukknapp from 'nav-frontend-lukknapp';
import Environment, {
    erNavDekoratoren,
    verifyWindowObj,
} from '../../../../utils/Environment';
import LogginnIkon from '../../../../ikoner/mobilmeny/LogginnIkon';
import Tekst from '../../../../tekster/finn-tekst';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import './Logg-inn-knapp.less';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';

interface StateProps {
    erInnlogget: boolean;
}

interface State {
    informasjonboks: Object;
}

export class LoggInnKnapp extends React.Component<StateProps, State> {
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

    informasjon = () => {
        return (
            <div>
                <AlertStripe type={'advarsel'}>
                    I localhost fungerer ikke innloggingslinjen. Og har blitt
                    erstattet med mock-api{' '}
                    <Lukknapp onClick={this.lukkdialogBoks} />
                </AlertStripe>
            </div>
        );
    };

    handleButtonClick = () => {
        const { erInnlogget } = this.props;
        const appUrl = location.origin + location.pathname;
        const LOGIN_URL = `${
            Environment.REDIRECT_TO_APP || erNavDekoratoren
                ? `${Environment.LOGIN_URL}/login?redirect=${appUrl}`
                : `${Environment.LOGIN_URL}/login?redirect=${Environment.DITT_NAV_URL}`
        }&level=${Environment.LEVEL}`;

        triggerGaEvent({
            category: GACategory.Header,
            action: erInnlogget ? 'logg-ut' : 'logg-inn',
        });

        return erInnlogget
            ? (window.location.href = Environment.LOGOUT_URL)
            : (window.location.href = LOGIN_URL);
    };

    render() {
        const { erInnlogget } = this.props;
        const knappetekst = erInnlogget ? 'logg-ut-knapp' : 'logg-inn-knapp';

        return (
            <div className="login-container">
                <div className="media-sm-mobil login-mobil">
                    <button
                        className="mobil-login-knapp"
                        onClick={this.handleButtonClick}
                    >
                        <LogginnIkon />
                        <Undertittel className="knappetekst">
                            <Tekst id={knappetekst} />
                        </Undertittel>
                    </button>
                </div>
                <div className="media-tablet-desktop login-tablet-desktop">
                    <KnappBase
                        className="login-knapp"
                        type="standard"
                        onClick={this.handleButtonClick}
                    >
                        <Tekst id={knappetekst} />
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
