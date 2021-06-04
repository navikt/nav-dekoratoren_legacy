import React, { FunctionComponent } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import BEMHelper from '../../../../utils/bem';
import { useSelector } from 'react-redux';
import { getLoginUrl } from '../../../../utils/login';
import { AppState } from '../../../../store/reducers';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    environment: state.environment,
});

const UtloggingsvarselValg: FunctionComponent = () => {
    const cls = BEMHelper('utloggingsvarsel');

    const { arbeidsflate, environment } = useSelector(stateSelector);
    const { LOGOUT_URL } = environment;
    const LOGIN_URL = getLoginUrl(environment, arbeidsflate);

    return (
        <div className={cls.element('valg')}>
            <Knapp
                type="hoved"
                onClick={() => {
                    window.location.href = LOGIN_URL;
                }}
            >
                Logg inn på nytt
            </Knapp>
            <Knapp
                type="hoved"
                onClick={() => {
                    window.location.href = LOGOUT_URL;
                }}
            >
                logg ut
            </Knapp>
        </div>
    );
};
export default UtloggingsvarselValg;
