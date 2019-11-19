import React, { createRef, DetailedReactHTMLElement, ReactNode } from 'react';
import parse from 'html-react-parser';
import { AppState } from '../../../../reducer/reducer';
import { Dispatch } from '../../../../redux/dispatch-type';
import { connect } from 'react-redux';
import { settVarslerSomLest } from '../../../../reducer/varsel-lest-duck';
import './Varselbjelle.less';
import { MenuValue } from '../../../../utils/meny-storage-utils';

interface StateProps {
    varsler: string;
    antallVarsler: number;
    antallUlesteVarsler: number;
    erInnlogget: boolean;
    nyesteId: number;
    arbeidsflate: MenuValue;
}

interface FunctionProps {
    children: (
        antallVarsler: number,
        antallUlesteVarsler: number,
        html:
            | string
            | DetailedReactHTMLElement<{}, HTMLElement>
            | DetailedReactHTMLElement<{}, HTMLElement>[],
        clicked: boolean,
        handleClick?: () => void
    ) => ReactNode;
}

interface DispatchProps {
    doSettVarslerSomLest: (nyesteId: number) => void;
}

interface State {
    clicked: boolean;
    classname: string;
}

type VarselbjelleProps = StateProps & DispatchProps & FunctionProps;

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
            arbeidsflate,
        } = this.props;
        const html = parse(varsler);
        console.log(typeof html);

        return (
            <div ref={this.varselbjelleRef} className="varselbjelle">
                {erInnlogget && arbeidsflate === MenuValue.PRIVATPERSON ? (
                    <div
                        id="toggle-varsler-container"
                        className={this.state.classname}
                    >
                        <button
                            onClick={this.handleClick}
                            className="toggle-varsler"
                            title="Varsler"
                            aria-label={`Varsler. Du har ${
                                antallVarsler > 0 ? antallVarsler : 'ingen'
                            } varsler.`}
                            aria-pressed={this.state.clicked}
                            aria-haspopup="true"
                            aria-controls="varsler-display"
                            aria-expanded={this.state.clicked}
                        />
                    </div>
                ) : null}
                {erInnlogget && (
                    <>
                        {console.log(
                            'this.state.clicked in Varselbjelle: ',
                            this.state.clicked
                        )}
                        <div className="min-varsel-wrapper">
                            {this.props.children(
                                antallUlesteVarsler,
                                antallVarsler,
                                html,
                                this.state.clicked,
                                this.handleClick
                            )}
                        </div>
                    </>
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
    arbeidsflate: state.arbeidsflate.status,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettVarslerSomLest: (nyesteId: number) =>
        settVarslerSomLest(nyesteId)(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Varselbjelle);
