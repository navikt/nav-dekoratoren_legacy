import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import {
    hentInnloggingsstatus,
    InnloggingsstatusState,
} from '../redux/innloggingsstatus';
import { AppState } from '../redux/reducer';
import Datalaster from '../api/Datalaster';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    innloggingsstatus: InnloggingsstatusState;
}

interface DispatchProps {
    doHentInnloggingsstatus: () => void;
}

type InnloggingsstatusProviderProps = OwnProps & StateProps & DispatchProps;

const InnloggingsstatusProvider: React.FunctionComponent<InnloggingsstatusProviderProps> = props => {

    useEffect(
        () => {
            props.doHentInnloggingsstatus();
        },
        []
    );

    return (
        <Datalaster avhengigheter={[props.innloggingsstatus]}>
            {props.children}
        </Datalaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    innloggingsstatus: state.innloggingsstatus,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentInnloggingsstatus: () => hentInnloggingsstatus()(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InnloggingsstatusProvider);
