import React, { createRef, ReactNode, useEffect, useState } from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { settVarslerSomLest } from 'store/reducers/varsel-lest-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import VarselKnappMobil from './varselknapp/VarselKnappMobil';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';
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
    isOpen: state.dropdownToggles.varsler,
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
        isOpen,
        arbeidsflate,
    } = useSelector(stateSelector);

    const classname =
        antallUlesteVarsler > 0
            ? 'varsler-toggle-container har-nye-varsler'
            : 'varsler-toggle-container';

    const apneVarselEvent = () => {
        triggerGaEvent({
            context: arbeidsflate,
            category: GACategory.Header,
            action: isOpen ? 'varsler-close' : 'varsler-open',
        });

        dispatch(toggleVarsler());
        if (antallUlesteVarsler > 0) {
            settVarslerSomLest(environment.APP_BASE_URL, nyesteId, dispatch);
        }
    };

    const varselClickEvent: { (event: MouseEvent): void } = (e: MouseEvent) => {
        const node = varselbjelleRef.current;
        if (node && node.contains(e.target as HTMLElement)) {
            return;
        }
        if (isOpen) {
            triggerGaEvent({
                context: arbeidsflate,
                category: GACategory.Header,
                action: 'varsler-close',
            });
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
                <VarselKnappMobil
                    triggerVarsel={apneVarselEvent}
                    antallVarsel={antallVarsler}
                    varselIsOpen={isOpen}
                    tabIndex={props.tabindex}
                    clsName={classname}
                />
            ) : null}
        </div>
    );
};

export default Varselbjelle;
