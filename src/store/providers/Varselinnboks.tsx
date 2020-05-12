import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { hentVarsler } from '../reducers/varselinnboks-duck';
import Datalaster from '../../api/Datalaster';
import { Status } from '../../api/api';

interface Props {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

const VarselinnboksProvider = (props: Props) => {
    const dispatch = useDispatch();
    const varsler = useSelector((state: AppState) => state.varsler);
    const { APP_BASE_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const status = useSelector(
        (state: AppState) => state.innloggingsstatus.status
    );

    useEffect(() => {
        if (status === Status.IKKE_STARTET) {
            hentVarsler(APP_BASE_URL)(dispatch);
        }
    }, []);

    return <Datalaster avhengigheter={[varsler]}>{props.children}</Datalaster>;
};

export default VarselinnboksProvider;
