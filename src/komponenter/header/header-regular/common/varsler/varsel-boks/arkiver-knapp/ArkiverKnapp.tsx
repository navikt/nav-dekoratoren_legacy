import { postDone } from 'api/api';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fjernLestVarsel } from 'store/reducers/varselinnboks-duck';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import { Button } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';


type Props = {
    eventId: string;
    apiVarselinnboksUrl: string;
    setActivateScreenReaderText: (setActivateScreenReaderText: boolean) => void;
    id?: string;
};

const ArkiverKnapp = ({ eventId, apiVarselinnboksUrl, setActivateScreenReaderText, id }: Props) => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        postDone(apiVarselinnboksUrl, { eventId: eventId });
        setActivateScreenReaderText(false);
        setActivateScreenReaderText(true);
        dispatch(fjernLestVarsel(eventId));
        logAmplitudeEvent("arkivert-beskjed", { komponent: "varsler-beskjed-arkiverbar", kategori: "varsler" });
    };

    return (
        <Button
            variant='tertiary'
            size='xsmall'
            onClick={handleOnClick}
            id={id}
        >
            <Tekst id="arkiver" /> 
        </Button>
    );
};

export default ArkiverKnapp;
