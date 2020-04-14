import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'reducers/reducers';
import { Dispatch } from 'state/dispatch-type';
import { InnloggingsstatusState } from 'reducers/innloggingsstatus-duck';
import { hentInnloggingsstatus } from 'reducers/innloggingsstatus-duck';
import { EnvironmentState } from 'reducers/environment-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    environment: EnvironmentState;
    innloggingsstatus: InnloggingsstatusState;
}

interface DispatchProps {
    doHentInnloggingsstatus: (APP_BASE_URL: string) => void;
}

type InnloggingsstatusProviderProps = OwnProps & StateProps & DispatchProps;

const InnloggingsstatusProvider: React.FunctionComponent<InnloggingsstatusProviderProps> = props => {
    useEffect(() => {
        const { APP_BASE_URL } = props.environment;
        props.doHentInnloggingsstatus(APP_BASE_URL);
    }, []);

    return props.children;
};

const mapStateToProps = (state: AppState): StateProps => ({
    environment: state.environment,
    innloggingsstatus: state.innloggingsstatus,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentInnloggingsstatus: (APP_BASE_URL: string) =>
        hentInnloggingsstatus(APP_BASE_URL)(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InnloggingsstatusProvider);
