import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducers/reducers';
import { hentVarsler, settVarslerOK } from '../reducers/varselinnboks-duck';
import Datalaster from '../api/Datalaster';

interface Props {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

const VarselinnboksProvider = (props: Props) => {
    const dispatch = useDispatch();
    const varsler = useSelector((state: AppState) => state.varsler);
    const { APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const erInnlogget = useSelector(
        (state: AppState) => state.innloggingsstatus.data.authenticated === true
    );

    useEffect(() => {
        if (erInnlogget) {
            hentVarsler(APP_BASE_URL)(dispatch);
        } else {
            dispatch(settVarslerOK());
        }
    }, [erInnlogget]);

    return <Datalaster avhengigheter={[varsler]}>{props.children}</Datalaster>;
};

export default VarselinnboksProvider;
