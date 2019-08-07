import * as React from 'react';
import parse from 'html-react-parser';
import { AppState } from '../../../redux/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
import { connect } from 'react-redux';
import { settVarslerSomLest } from '../../../redux/varsel-lest-duck';
import VarselVisning from '../../../komponenter/header/nedtrekksmeny/Varsel-visning';
import './Varselbjelle.less';

interface StateProps {
    varsler: string;
    antallVarsler: number;
    antallUlesteVarsler: number;
    erInnlogget: boolean;
    nyesteId: number;
}

interface DispatchProps {
    doSettVarslerSomLest: (nyesteId: number) => void;
}

interface State {
    clicked: boolean;
    classname: string;
}

type VarselinnboksProps = StateProps & DispatchProps;

class Varselbjelle extends React.Component<VarselinnboksProps, State> {
    constructor(props: VarselinnboksProps) {
        super(props);
        this.state = {
            clicked: false,
            classname: this.props.antallUlesteVarsler > 0 ? 'toggle-varsler-container har-nye-varsler' : 'toggle-varsler-container'
        };
    }

    setStateAndDispatch = () => {
        this.setState({
            clicked: !this.state.clicked
        });
        if (this.props.antallUlesteVarsler > 0) {
            this.setState({classname: 'toggle-varsler-container'});
            this.props.doSettVarslerSomLest(this.props.nyesteId);
        }
    }

    render() {
        const { erInnlogget, varsler, antallVarsler, antallUlesteVarsler } = this.props;
        const html = parse(varsler);

        return (
            <>
                {erInnlogget
                    ? (<div id="toggle-varsler-container" className={this.state.classname}>
                            <button
                                type="button"
                                onClick={this.setStateAndDispatch}
                                id="toggle-varsler"
                                className="toggle-varsler"
                                aria-haspopup="true"
                                aria-controls="varsler-display"
                                aria-label="Varsler"
                                title="Varsler"
                                aria-expanded={this.state.clicked}
                            />
                       </div>)
                    : null
                }
                { erInnlogget && this.state.clicked &&
                    <VarselVisning
                        html={html}
                        antallVarsler={antallVarsler}
                        antallUlesteVarsler={antallUlesteVarsler}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    varsler: state.varsler.data.varsler,
    antallVarsler: state.varsler.data.antall,
    antallUlesteVarsler: state.varsler.data.uleste,
    erInnlogget: state.innloggingsstatus.data.authenticated === true && state.innloggingsstatus.data.securityLevel === '4',
    nyesteId: state.varsler.data.nyesteId
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettVarslerSomLest: (nyesteId: number) => settVarslerSomLest(nyesteId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Varselbjelle);