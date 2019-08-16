import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import {
    hentVarsler,
    settVarslerOK,
    VarselinnboksState,
} from '../reducer/varselinnboks-duck';
import { AppState } from '../reducer/reducer';
import Datalaster from '../api/Datalaster';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    varsler: VarselinnboksState;
    erInnlogget: boolean;
}

interface DispatchProps {
    doHentVarselinnboks: () => void;
    doSettVarselinnboksOK: () => void;
}

type VarselinnboksProviderProps = OwnProps & StateProps & DispatchProps;

const VarselinnboksProvider: React.FunctionComponent<VarselinnboksProviderProps> = props => {

    useEffect(
        () => {
            if (props.erInnlogget) {
                props.doHentVarselinnboks();
            } else {
                props.doSettVarselinnboksOK();
            }
        },
        []
    );

    return (
        <Datalaster avhengigheter={[props.varsler]}>
            {props.children}
        </Datalaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    varsler: state.varsler,
    erInnlogget: state.innloggingsstatus.data.authenticated === true && state.innloggingsstatus.data.securityLevel === '4'
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentVarselinnboks: () => hentVarsler()(dispatch),
    doSettVarselinnboksOK: () => dispatch(settVarslerOK()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VarselinnboksProvider);
