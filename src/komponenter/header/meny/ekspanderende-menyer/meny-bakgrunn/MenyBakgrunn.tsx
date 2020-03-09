import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import './MenyBakgrunn.less';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../reducer/reducer';
import { lukkAlleDropdowns } from '../../../../../reducer/dropdown-toggle-duck';

const MenyBakgrunn = ({ className }: { className: string }) => {
    const cls = BEMHelper(className);
    const dispatch = useDispatch();
    const toggles = useSelector((state: AppState) => state.dropdownToggles);
    const isActive =
        toggles.hovedmeny ||
        toggles.minside ||
        toggles.sok ||
        toggles.undermeny ||
        toggles.varsel;

    return (
        <>
            {console.log('toggles varsel: ', toggles, 'isActive: ', isActive)}
            <div
                className={cls.element('bakgrunn', isActive ? 'active' : '')}
                onClick={() => dispatch(lukkAlleDropdowns())}
            />
        </>
    );
};

export default MenyBakgrunn;
