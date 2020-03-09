import React, { createRef, ReactNode } from 'react';
import { AppState } from '../../../../reducer/reducer';
import { Dispatch } from '../../../../redux/dispatch-type';
import { connect } from 'react-redux';
import { settVarslerSomLest } from '../../../../reducer/varsel-lest-duck';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import './Varselbjelle.less';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';
import {
    lukkAlleDropdowns,
    toggleHovedmeny,
    toggleHovedOgUndermenyVisning,
    toggleUndermenyVisning,
    toggleVarselVisning,
} from '../../../../reducer/dropdown-toggle-duck';
import { Normaltekst } from 'nav-frontend-typografi';
import Tekst from '../../../../tekster/finn-tekst';
import { Flatknapp } from 'nav-frontend-knapper';

interface Props {
    tabindex: boolean;
}

interface StateProps {
    antallVarsler: number;
    antallUlesteVarsler: number;
    erInnlogget: boolean;
    nyesteId: number;
    arbeidsflate: MenuValue;
    visVarsel: boolean;
    hovedMenyAapen: boolean;
    underMenyAapen: boolean;
}

interface FunctionProps {
    // children: (clicked: boolean, handleClick?: () => void) => ReactNode;
}

interface DispatchProps {
    doSettVarslerSomLest: (nyesteId: number) => void;
    togglevisvarsel: () => void;
    togglemeny: () => void;
    togglemenyer: () => void;
}

interface State {
    clicked: boolean;
    classname: string;
}

type VarselbjelleProps = StateProps & DispatchProps & Props;

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

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    handleClick = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: this.state.clicked ? 'varsler-close' : 'varsler-open',
        });
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
        if (node && !node.contains(e.target as HTMLElement)) {
            return;
        }

        this.props.togglevisvarsel();
        if (this.props.underMenyAapen) {
            this.props.hovedMenyAapen
                ? this.props.togglemenyer()
                : this.props.togglemeny();
        }

        if (this.state.clicked) {
            triggerGaEvent({
                category: GACategory.Header,
                action: 'varsler-close',
            });
        }

        this.setState({ clicked: false });
    };

    render() {
        const {
            erInnlogget,
            antallVarsler,
            arbeidsflate,
            tabindex,
            children,
            visVarsel,
        } = this.props;
        const { clicked, classname } = this.state;
        return (
            <div ref={this.varselbjelleRef} className="varselbjelle">
                {erInnlogget && arbeidsflate === MenuValue.PRIVATPERSON ? (
                    <>
                        <div className="media-sm-mobil mobil-meny">
                            <div
                                id="toggle-varsler-container"
                                className={classname}
                            >
                                <Flatknapp
                                    onClick={this.handleClick}
                                    className="varselknapp-mobil"
                                >
                                    <div
                                        className="toggle-varsler"
                                        tabIndex={tabindex ? 0 : -1}
                                        title="Varsler"
                                        aria-label={`Varsler. Du har ${
                                            antallVarsler > 0
                                                ? antallVarsler
                                                : 'ingen'
                                        } varsler.`}
                                        aria-pressed={clicked}
                                        aria-haspopup="true"
                                        aria-controls="varsler-display"
                                        aria-expanded={clicked}
                                    />
                                    <span className="word-wrapper">
                                        <Normaltekst
                                            className={
                                                !visVarsel
                                                    ? 'er-synlig'
                                                    : 'er-usynlig'
                                            }
                                        >
                                            <Tekst id="varsler-mobil" />
                                        </Normaltekst>
                                        <Normaltekst
                                            className={
                                                visVarsel
                                                    ? 'er-synlig'
                                                    : 'er-usynlig'
                                            }
                                        >
                                            <Tekst id="varsler-mobil-lukk" />
                                        </Normaltekst>
                                    </span>
                                </Flatknapp>
                            </div>
                            {/*
                            <button
                                onClick={this.handleClick}
                                className="toggle-varsler"
                                tabIndex={tabindex ? 0 : -1}
                                title="Varsler"
                                aria-label={`Varsler. Du har ${
                                    antallVarsler > 0 ? antallVarsler : 'ingen'
                                } varsler.`}
                                aria-pressed={clicked}
                                aria-haspopup="true"
                                aria-controls="varsler-display"
                                aria-expanded={clicked}
                            >
                                <div className="media-sm-mobil mobil-meny">
                                    <Normaltekst>
                                        <Tekst id="varsler-mobil" />
                                    </Normaltekst>
                                </div>
                            </button>
                            */}
                        </div>
                        <div className="min-varsel-wrapper"></div>
                    </>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    antallVarsler: state.varsler.data.antall,
    antallUlesteVarsler: state.varsler.data.uleste,
    erInnlogget:
        state.innloggingsstatus.data.authenticated &&
        (state.innloggingsstatus.data.securityLevel === '3' ||
            state.innloggingsstatus.data.securityLevel === '4'),
    nyesteId: state.varsler.data.nyesteId,
    arbeidsflate: state.arbeidsflate.status,
    visVarsel: state.dropdownToggles.varsel,
    hovedMenyAapen: state.dropdownToggles.hovedmeny,
    underMenyAapen: state.dropdownToggles.undermeny,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettVarslerSomLest: (nyesteId: number) =>
        settVarslerSomLest(nyesteId)(dispatch),
    togglevisvarsel: () => dispatch(toggleVarselVisning()),
    togglemeny: () => dispatch(toggleUndermenyVisning()),
    togglemenyer: () => dispatch(toggleHovedOgUndermenyVisning()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Varselbjelle);
