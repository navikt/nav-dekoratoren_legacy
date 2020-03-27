import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../reducer/reducers';
import { erNavDekoratoren } from '../../../../utils/Environment';
import Tekst from '../../../../tekster/finn-tekst';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import './Logg-inn-knapp.less';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';

import { Language } from '../../../../reducer/language-duck';
import { TextTransformFirstLetterToUppercase } from '../ekspanderende-menyer/hovedmeny-mobil/HovedmenyMobil';
import KnappBase from 'nav-frontend-knapper';
import { EnvironmentState } from '../../../../reducer/environment-duck';

interface StateProps {
    environment: EnvironmentState;
    erInnlogget: boolean;
    lang: Language;
}

export class LoggInnKnapp extends React.Component<StateProps, {}> {
    constructor(props: StateProps) {
        super(props);
    }

    handleButtonClick = () => {
        const { erInnlogget, environment } = this.props;
        const { PARAMS, LOGIN_URL, DITT_NAV_URL, LOGOUT_URL } = environment;
        const appUrl = location.origin + location.pathname;
        const loginUrl = `${
            PARAMS.REDIRECT_TO_APP || erNavDekoratoren()
                ? `${LOGIN_URL}/login?redirect=${appUrl}`
                : `${LOGIN_URL}/login?redirect=${DITT_NAV_URL}`
        }&level=${PARAMS.LEVEL}`;

        triggerGaEvent({
            category: GACategory.Header,
            action: erInnlogget ? 'logg-ut' : 'logg-inn',
        });

        return erInnlogget
            ? (window.location.href = LOGOUT_URL)
            : (window.location.href = loginUrl);
    };

    render() {
        const { erInnlogget } = this.props;
        const knappetekst = erInnlogget ? 'logg-ut-knapp' : 'logg-inn-knapp';

        return (
            <div className="login-container">
                <div className="media-sm-mobil login-mobil">
                    <KnappBase
                        type="flat"
                        className="mobil-login-knapp"
                        onClick={this.handleButtonClick}
                    >
                        <Undertittel className="knappetekst">
                            <TextTransformFirstLetterToUppercase
                                text={knappetekst}
                                lang={this.props.lang}
                            />
                        </Undertittel>
                    </KnappBase>
                </div>
                <div className="media-tablet-desktop login-tablet-desktop">
                    <KnappBase
                        type="standard"
                        className="login-knapp"
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
    environment: state.environment,
    erInnlogget: state.innloggingsstatus.data.authenticated,
    lang: state.language.language,
});

export default connect(mapStateToProps)(LoggInnKnapp);
