import { postDone } from 'api/api';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fjernLestVarsel } from 'store/reducers/varselinnboks-duck';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import './ArkiverKnapp.scss';

type Props = {
    eventId: string;
    apiVarselinnboksUrl: string;
    setIsHover: (setIsHover: boolean) => void;
    setActivateScreenReaderText: (setActivateScreenReaderText: boolean) => void;
};

const ArkiverKnapp = ({ eventId, apiVarselinnboksUrl, setIsHover, setActivateScreenReaderText }: Props) => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        postDone(apiVarselinnboksUrl, { eventId: eventId });
        setActivateScreenReaderText(false);
        setActivateScreenReaderText(true);
        dispatch(fjernLestVarsel(eventId));
        logAmplitudeEvent('navigere', { komponent: 'Arkivert beskjed' });
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
