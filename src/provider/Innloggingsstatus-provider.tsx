import * as React from 'react';
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

class InnloggingsstatusProvider extends React.Component<
    InnloggingsstatusProviderProps
> {
    constructor(props: InnloggingsstatusProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentInnloggingsstatus();
    }

    render() {
        return (
            <Datalaster avhengigheter={[this.props.innloggingsstatus]}>
                {this.props.children}
            </Datalaster>
        );
    }
}

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
