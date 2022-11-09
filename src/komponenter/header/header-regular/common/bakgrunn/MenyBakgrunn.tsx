import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import style from './MenyBakgrunn.module.scss';

const MenyBakgrunn = () => {
    const dispatch = useDispatch();
    const toggles = useSelector((state: AppState) => state.dropdownToggles);
    const isActive = toggles.hovedmeny || toggles.minside || toggles.sok || toggles.undermeny || toggles.varsler;

    return (
        <div
            className={`${style.menyBakgrunn} ${isActive ? style.active : ''}`}
            onClick={() => dispatch(lukkAlleDropdowns())}
        />
    );
};

export default MenyBakgrunn;
