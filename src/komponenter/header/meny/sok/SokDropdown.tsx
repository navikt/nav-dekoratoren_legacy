import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { useSelector } from 'react-redux';
import { EkspanderbarMeny } from '../ekspanderende-menyer/ekspanderbar-meny/EkspanderbarMeny';
import Sok from './Sok';
import SokMenyKnapp from '../meny-knapper/SokMenyKnapp';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.sok,
});

export const SokDropdown = () => {
    const { isOpen } = useSelector(stateSelector);

    return (
        <EkspanderbarMeny
            classname={'desktop-dropdown'}
            id={'sok-dropdown'}
            isOpen={isOpen}
            menyKnapp={<SokMenyKnapp isOpen={isOpen} />}
        >
            <Sok />
        </EkspanderbarMeny>
    );
};
