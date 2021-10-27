import React, { FunctionComponent } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import BEMHelper from '../../../../utils/bem';
import { useSelector } from 'react-redux';
import { getLoginUrl, getLogOutUrl } from 'utils/login';
import { AppState } from 'store/reducers';
import { CookieName, cookieOptions } from '../../../../server/cookieSettings';
import { useCookies } from 'react-cookie';

interface Props {
    htmlUUDisable: boolean;
}

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    environment: state.environment,
});

const UtloggingsvarselValg: FunctionComponent<Props> = (props) => {
    const [,, removeCookie] = useCookies();
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
                    removeCookie(CookieName.SELVBETJENING_IDTOKEN, cookieOptions)
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
