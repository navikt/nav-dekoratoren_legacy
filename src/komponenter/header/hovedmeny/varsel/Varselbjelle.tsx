import React, { createRef } from 'react';
import parse from 'html-react-parser';
import { AppState } from '../../../../reducer/reducer';
import { Dispatch } from '../../../../redux/dispatch-type';
import { connect } from 'react-redux';
import { settVarslerSomLest } from '../../../../reducer/varsel-lest-duck';
import VarselVisning from './Varsel-visning';
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

type VarselbjelleProps = StateProps & DispatchProps;

class Varselbjelle extends React.Component<VarselbjelleProps, State> {
    private varselbjelleRef = createRef<HTMLDivElement>();

    constructor(props: VarselbjelleProps) {
        super(props);
        this.state = {
            clicked: false,
            classname:
                this.props.antallUlesteVarsler > 0
                    ? 'toggle-varsler-container har-nye-varsler'
                    : 'toggle-varsler-container',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    handleClick = () => {
        if (!this.state.clicked) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener(
                'click',
                this.handleOutsideClick,
                false
            );
        }

        this.setState({
            clicked: !this.state.clicked,
        });

        if (this.props.antallUlesteVarsler > 0) {
            this.setState({ classname: 'toggle-varsler-container' });
            this.props.doSettVarslerSomLest(this.props.nyesteId);
        }
    };

    handleOutsideClick: { (event: MouseEvent): void } = (e: MouseEvent) => {
        const node = this.varselbjelleRef.current;
        if (node && node.contains(e.target as HTMLElement)) {
            return;
        }
        this.handleClick();
    };

    render() {
        const {
            erInnlogget,
            varsler,
            antallVarsler,
            antallUlesteVarsler,
        } = this.props;
        const html = parse(varsler);

        return (
            <div ref={this.varselbjelleRef} className="varselbjelle">
                {erInnlogget ? (
                    <div
                        id="toggle-varsler-container"
                        className={this.state.classname}
                    >
                        <button
                            onClick={this.handleClick}
                            className="toggle-varsler"
                            title="Varsler"
                            aria-label="Varsler"
                            aria-haspopup="true"
                            aria-controls="varsler-display"
                            aria-expanded={this.state.clicked}
                        />
                    </div>
                ) : null}
                {erInnlogget && this.state.clicked && (
                    <VarselVisning
                        html={html}
                        antallVarsler={antallVarsler}
                        antallUlesteVarsler={antallUlesteVarsler}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    varsler: state.varsler.data.varsler,
    antallVarsler: state.varsler.data.antall,
    antallUlesteVarsler: state.varsler.data.uleste,
    erInnlogget:
        state.innloggingsstatus.data.authenticated === true &&
        state.innloggingsstatus.data.securityLevel === '4',
    nyesteId: state.varsler.data.nyesteId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettVarslerSomLest: (nyesteId: number) =>
        settVarslerSomLest(nyesteId)(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Varselbjelle);
