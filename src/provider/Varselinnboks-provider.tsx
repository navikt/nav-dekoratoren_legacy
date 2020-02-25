import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducer/reducer';
import { hentVarsler, settVarslerOK } from '../reducer/varselinnboks-duck';
import Datalaster from '../api/Datalaster';

interface Props {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

const VarselinnboksProvider = (props: Props) => {
    const dispatch = useDispatch();
    const varsler = useSelector((state: AppState) => state.varsler);
    const erInnlogget = useSelector(
        (state: AppState) => state.innloggingsstatus.data.authenticated === true
    );

    useEffect(() => {
        if (erInnlogget) {
            hentVarsler()(dispatch);
        } else {
            dispatch(settVarslerOK());
        }
    }, [erInnlogget]);

    return <Datalaster avhengigheter={[varsler]}>{props.children}</Datalaster>;
};

export default VarselinnboksProvider;
