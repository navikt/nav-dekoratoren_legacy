import React from 'react';
import './MenyBakgrunn.less';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../reducer/reducer';
import { lukkAlleDropdowns } from '../../../../../reducer/dropdown-toggle-duck';

const MenyBakgrunn = () => {
    const dispatch = useDispatch();
    const toggles = useSelector((state: AppState) => state.dropdownToggles);
    const isActive = toggles.hovedmeny || toggles.minside || toggles.sok;
    const classname = 'meny-bakgrunn';
    const clsActive = ` ${classname}--active`;

    return (
        <div
            className={`${classname}${isActive ? clsActive : ''}`}
            onClick={() => dispatch(lukkAlleDropdowns())}
        />
    );
};

export default MenyBakgrunn;
