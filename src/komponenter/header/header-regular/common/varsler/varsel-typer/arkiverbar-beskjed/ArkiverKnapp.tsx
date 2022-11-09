import { postDone } from 'api/api';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fjernLestVarsel } from 'store/reducers/varselinnboks-duck';
import './ArkiverKnapp.scss';

type Props = {
    eventId: string;
    apiVarselinnboksUrl: string;
    setIsHover: (setIsHover: boolean) => void;
};

const ArkiverKnapp = ({ eventId, apiVarselinnboksUrl, setIsHover }: Props) => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        postDone(apiVarselinnboksUrl, { eventId: eventId });
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
