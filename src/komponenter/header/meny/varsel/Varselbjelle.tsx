import React, { createRef, ReactNode } from 'react';
import { AppState } from '../../../../reducer/reducer';
import { Dispatch } from '../../../../redux/dispatch-type';
import { connect } from 'react-redux';
import { settVarslerSomLest } from '../../../../reducer/varsel-lest-duck';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import './Varselbjelle.less';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';
import MenylinjeKnapp from '../ekspanderende-menyer/meny-knapper/MenylinjeKnapp';
import VarselIkon from '../ekspanderende-menyer/meny-knapper/ikoner/varsel-ikon/VarselIkon';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../../tekster/finn-tekst';
import {
    toggleHovedOgUndermenyVisning,
    toggleUndermenyVisning,
    toggleVarselVisning,
} from '../../../../reducer/dropdown-toggle-duck';
import VarselKnappMobil from './varselknapp/VarselKnappMobil';

interface Props {
    tabindex: boolean;
    isMobil?: boolean;
}

interface FunctionProps {
    children: (clicked: boolean, handleClick?: () => void) => ReactNode;
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

interface DispatchProps {
    settVarselLest: (nyesteId: number) => void;
    togglevisvarsel: () => void;
    togglemeny: () => void;
    togglemenyer: () => void;
}

interface State {
    clicked: boolean;
    classname: string;
}

type VarselbjelleProps = StateProps & DispatchProps & Props & FunctionProps;

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

        this.ApneVarselEvent = this.ApneVarselEvent.bind(this);
        this.varselClickEvent = this.varselClickEvent.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.varselClickEvent, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.varselClickEvent, false);
    }

    toggleVarsel = () => {
        this.props.togglevisvarsel();
        if (this.props.underMenyAapen) {
            this.props.hovedMenyAapen
                ? this.props.togglemenyer()
                : this.props.togglemeny();
        }
    };

    ApneVarselEvent = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: this.state.clicked ? 'varsler-close' : 'varsler-open',
        });

        this.toggleVarsel();
        this.setState({ clicked: !this.state.clicked });
        if (this.props.antallUlesteVarsler > 0) {
            this.setState({ classname: 'toggle-varsler-container' });
            this.props.settVarselLest(this.props.nyesteId);
        }
    };

    varselClickEvent: { (event: MouseEvent): void } = (e: MouseEvent) => {
        const node = this.varselbjelleRef.current;
        if (node && node.contains(e.target as HTMLElement)) {
            return;
        }
        if (this.state.clicked) {
            triggerGaEvent({
                category: GACategory.Header,
                action: 'varsler-close',
            });
            this.setState({ clicked: false });
        }
    };

    render() {
        const {
            erInnlogget,
            antallVarsler,
            arbeidsflate,
            tabindex,
            visVarsel,
            children,
        } = this.props;
        const { clicked, classname } = this.state;
        return (
            <div ref={this.varselbjelleRef} className="varselbjelle">
                {erInnlogget && arbeidsflate === MenuValue.PRIVATPERSON ? (
                    <>
                        <VarselKnappMobil
                            triggerVarsel={this.ApneVarselEvent}
                            antallVarsel={antallVarsler}
                            varselIsOpen={this.state.clicked}
                            tabIndex={tabindex}
                            clsName={classname}
                        />
                        <div className="media-tablet-desktop">
                            <div id="toggle-varsler-container">
                                <MenylinjeKnapp
                                    toggleMenu={this.ApneVarselEvent}
                                    isOpen={clicked}
                                    classname={classname}
                                    id={'toggle-varsler-knapp-id'}
                                    ariaLabel={`Varsler. Du har ${
                                        antallVarsler > 0
                                            ? antallVarsler
                                            : 'ingen'
                                    } varsler.`}
                                >
                                    <VarselIkon isOpen={clicked} />
                                    <Undertittel className={'varsler-tekst'}>
                                        <Tekst id={'varsler'} />
                                    </Undertittel>
                                </MenylinjeKnapp>
                            </div>
                            <div className="min-varsel-wrapper">
                                {children(clicked, this.ApneVarselEvent)}
                            </div>
                        </div>
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
    settVarselLest: (nyesteId: number) =>
        settVarslerSomLest(nyesteId)(dispatch),
    togglevisvarsel: () => dispatch(toggleVarselVisning()),
    togglemeny: () => dispatch(toggleUndermenyVisning()),
    togglemenyer: () => dispatch(toggleHovedOgUndermenyVisning()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Varselbjelle);
