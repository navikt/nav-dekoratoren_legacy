import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../reducer/reducer';
import KnappBase from 'nav-frontend-knapper';
import Environment, { erNavDekoratoren } from '../../../../utils/Environment';
import Tekst from '../../../../tekster/finn-tekst';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import './Logg-inn-knapp.less';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';
import { Knapp } from 'nav-frontend-knapper';
import { Language } from '../../../../reducer/language-duck';
import { textTransformFirstLetterToUppercase } from '../ekspanderende-menyer/hovedmeny-mobil/HovedmenyMobil';

interface StateProps {
    erInnlogget: boolean;
    lang: Language;
}

export class LoggInnKnapp extends React.Component<StateProps, {}> {
    constructor(props: StateProps) {
        super(props);
    }

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
                    <Knapp
                        type="flat"
                        className="mobil-login-knapp"
                        onClick={this.handleButtonClick}
                    >
                        <Undertittel className="knappetekst">
                            {textTransformFirstLetterToUppercase(
                                knappetekst,
                                this.props.lang
                            )}
                        </Undertittel>
                    </Knapp>
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
    lang: state.language.language,
});

export default connect(mapStateToProps)(LoggInnKnapp);
