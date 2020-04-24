import React, { createRef, ReactNode, useEffect, useState } from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { settVarslerSomLest } from 'store/reducers/varsel-lest-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import MenylinjeKnapp from '../ekspanderende-menyer/meny-knapper/MenylinjeKnapp';
import { VarselIkon } from '../ekspanderende-menyer/meny-knapper/ikoner/varsel-ikon/VarselIkon';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import VarselKnappMobil from './varselknapp/VarselKnappMobil';
import { toggleVarselVisning } from 'store/reducers/dropdown-toggle-duck';
import './Varselbjelle.less';

interface Props {
    tabindex: boolean;
    isMobil?: boolean;
}

interface FunctionProps {
    children: (clicked: boolean, handleClick?: () => void) => ReactNode;
}

type VarselbjelleProps = Props & FunctionProps;
const stateSelector = (state: AppState) => ({
    environment: state.environment,
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

const Varselbjelle = (props: VarselbjelleProps) => {
    const varselbjelleRef = createRef<HTMLDivElement>();
    const dispatch = useDispatch();
    const {
        environment,
        antallVarsler,
        antallUlesteVarsler,
        erInnlogget,
        nyesteId,
        arbeidsflate,
    } = useSelector(stateSelector);

    const [clicked, settClicked] = useState(false);
    const [classname, settClassname] = useState(
        antallUlesteVarsler > 0
            ? 'toggle-varsler-container har-nye-varsler'
            : 'toggle-varsler-container'
    );

    const toggleVarsel = () => {
        dispatch(toggleVarselVisning());
    };

    const ApneVarselEvent = () => {
        triggerGaEvent({
            context: arbeidsflate,
            category: GACategory.Header,
            action: clicked ? 'varsler-close' : 'varsler-open',
        });

        toggleVarsel();
        settClicked(!clicked);
        if (antallUlesteVarsler > 0) {
            settClassname('toggle-varsler-container');
            settVarslerSomLest(environment.APP_BASE_URL, nyesteId, dispatch);
        }
    };

    const varselClickEvent: { (event: MouseEvent): void } = (e: MouseEvent) => {
        const node = varselbjelleRef.current;
        if (node && node.contains(e.target as HTMLElement)) {
            return;
        }
        if (clicked) {
            triggerGaEvent({
                context: arbeidsflate,
                category: GACategory.Header,
                action: 'varsler-close',
            });
            settClicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', varselClickEvent, false);
        return () => {
            document.removeEventListener('click', varselClickEvent, false);
        };
    }, []);

    return (
        <div ref={varselbjelleRef} className="varselbjelle">
            {erInnlogget && arbeidsflate === MenuValue.PRIVATPERSON ? (
                <>
                    <VarselKnappMobil
                        triggerVarsel={ApneVarselEvent}
                        antallVarsel={antallVarsler}
                        varselIsOpen={clicked}
                        tabIndex={props.tabindex}
                        clsName={classname}
                    />
                    <div className="media-tablet-desktop">
                        <div id="toggle-varsler-container">
                            <MenylinjeKnapp
                                toggleMenu={ApneVarselEvent}
                                isOpen={clicked}
                                classname={classname}
                                id={'toggle-varsler-knapp-id'}
                                ariaLabel={`Varsler. Du har ${
                                    antallVarsler > 0 ? antallVarsler : 'ingen'
                                } varsler.`}
                            >
                                <VarselIkon isOpen={clicked} />
                                <Undertittel className={'varsler-tekst'}>
                                    <Tekst id={'varsler-tittel'} />
                                </Undertittel>
                            </MenylinjeKnapp>
                        </div>
                        <div className="min-varsel-wrapper">
                            {props.children(clicked, ApneVarselEvent)}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Varselbjelle;
