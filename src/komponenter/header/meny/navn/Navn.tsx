import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../reducer/reducers';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './Navn.less';
import Tekst from '../../../../tekster/finn-tekst';

export const Navn = () => {
    const { authenticated, name } = useSelector(
        (state: AppState) => state.innloggingsstatus.data
    );
    return authenticated ? (
        <>
            <Normaltekst>
                <b>
                    <Tekst id="logget-inn-som" />
                </b>
                {` `}
                {name}
            </Normaltekst>
        </>
    ) : null;
};

export default Navn;
