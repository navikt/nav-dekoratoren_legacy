import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';

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
            window.location.href = 'https://loginservice-q.nav.no/slo';
        } else {
            window.location.href = 'https://tjenester-q0.nav.no/dittnav/oversikt';
        }
    }

    render() {
        const { erInnlogget, navn } = this.props;
        const knappetekst = erInnlogget ? 'Logg ut' : 'Logg inn';
        const navnLC = navn.toLowerCase();
        return (
            <div className="login-container">
                {erInnlogget
                    ? <span className="login-details-name"><Normaltekst>{navnLC}</Normaltekst></span>
                    : null
                }
                <div className="login-knapp">
                    <KnappBase type="standard" onClick={this.handleButtonClick}>{knappetekst}</KnappBase>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: AppState): StateProps => ({
    erInnlogget: state.innloggingsstatus.data.authenticated,
    navn: state.innloggingsstatus.data.name
});

export default connect(mapStateToProps)(LoggInnKnapp);
