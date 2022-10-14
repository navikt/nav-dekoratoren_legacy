import React from 'react';
import { useDispatch } from 'react-redux';
import { fjernLestVarsel } from 'store/reducers/varselinnboks-duck';
import './ArkiverKnapp.less';

type Props = {
    eventId: string;
    setIsHover: (setIsHover: boolean) => void;
};

const ArkiverKnapp = ({ eventId, setIsHover }: Props) => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(fjernLestVarsel(eventId));
    };

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <button
            className="arkiver-btn"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}
        >
            Arkiver
        </button>
    );
};

export default ArkiverKnapp;
