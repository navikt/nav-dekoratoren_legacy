import React from 'react';
import Menyknapp from '../ekspanderende-menyer/meny-knapp/Menyknapp';
import { AppState } from '../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSok } from '../../../../reducer/dropdown-toggle-duck';
import { EkspanderbarMeny } from '../ekspanderende-menyer/ekspanderbar-meny/EkspanderbarMeny';
import Sok from './Sok';
import SokIkon from '../../../../ikoner/mobilmeny/SokIkon';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../../tekster/finn-tekst';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.sok,
});

const classname = 'sok-dropdown';

export const SokDropdown = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(stateSelector);

    // TODO: analytics
    const knapp = (
        <Menyknapp
            toggleMenu={() => dispatch(toggleSok())}
            clicked={isOpen}
            classname={classname}
            ariaControlsId={classname}
        >
            <SokIkon />
            <Undertittel>
                <Tekst id={'sok-knapp'} />
            </Undertittel>
        </Menyknapp>
    );

    return (
        <EkspanderbarMeny
            id={classname}
            isOpen={isOpen}
            menyKnapp={knapp}
        >
            <Sok />
        </EkspanderbarMeny>
    );
};
