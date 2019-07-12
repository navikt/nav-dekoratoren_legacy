import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import {
    hentVarsler,
    settVarslerOK,
    VarselinnboksState,
} from '../redux/varselinnboks-duck';
import { AppState } from '../redux/reducer';
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

class VarselinnboksProvider extends React.Component<VarselinnboksProviderProps> {
    constructor(props: VarselinnboksProviderProps) {
        super(props);
    }

    componentDidMount() {
        if (this.props.erInnlogget) {
            this.props.doHentVarselinnboks();
        } else {
            this.props.doSettVarselinnboksOK();
        }
    }

    render() {
        return (
            <Datalaster avhengigheter={[this.props.varsler]}>
                {this.props.children}
            </Datalaster>
        );
    }
}

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
