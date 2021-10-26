import React, { FunctionComponent } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import BEMHelper from '../../../../utils/bem';
import { useSelector } from 'react-redux';
import { getLoginUrl, getLogOutUrl } from 'utils/login';
import { AppState } from 'store/reducers';

interface Props {
    htmlUUDisable: boolean;
}

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    environment: state.environment,
});

const UtloggingsvarselValg: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('utloggingsvarsel');
    const { htmlUUDisable } = props;

    const { arbeidsflate, environment } = useSelector(stateSelector);
    const LOGIN_URL = getLoginUrl(environment, arbeidsflate);

    return (
        <div className={cls.element('valg')}>
            <Knapp
                type="hoved"
                tabIndex={htmlUUDisable ? -1 : 0}
                onClick={() => {
                    document.cookie = 'selvbetjening-idtoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    window.location.href = LOGIN_URL;
                }}
            >
                Logg inn på nytt
            </Knapp>
            <Knapp
                type="hoved"
                tabIndex={htmlUUDisable ? -1 : 0}
                onClick={() => {
                    window.location.href = getLogOutUrl(environment);
                }}
            >
                logg ut
            </Knapp>
        </div>
    );
};
export default UtloggingsvarselValg;
