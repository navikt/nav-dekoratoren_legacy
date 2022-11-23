import React, { useState } from 'react';
import { Next } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import { fjernLestVarsel } from 'store/reducers/varselinnboks-duck';
import { useDispatch } from 'react-redux';
import { postDone } from 'api/api';
import './Beskjed.scss';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import ArkiverKnapp from './arkiver-knapp/ArkiverKnapp';

type Props = {
    eventId: string;
    apiVarselinnboksUrl: string;
    tekst: string;
    dato: string;
    href: string;
    isMasked: boolean;
    id?: string;
    type: string;
    setActivateScreenReaderText: (setActivateScreenReaderText: boolean) => void;
};

const Beskjed = ({
    eventId,
    apiVarselinnboksUrl,
    tekst,
    dato,
    href,
    isMasked,
    id,
    type,
    setActivateScreenReaderText,
}: Props) => {
    //TODO: Legge inn stepup-tekst i alle språk.
    const [isHover, setIsHover] = useState(false);

    const dispatch = useDispatch();

    const hasNoHref = (href: string) => href === undefined || href === null || href === '';

    const handleOnClick = () => {
        if (type === 'BESKJED') {
            postDone(apiVarselinnboksUrl, { eventId: eventId });
            dispatch(fjernLestVarsel(eventId));
        }
        logAmplitudeEvent('navigere', { komponent: type });
    };

    return (
        <>
            {hasNoHref(href) ? (
                <div className={isHover ? 'arkiverbar-beskjed-hover' : 'arkiverbar-beskjed'}>
                    <div className="arkiverbar-beskjed__ikon"></div>
                    <div className="arkiverbar-beskjed__content-wrapper">
                        <div className="arkiverbar-beskjed__tittel">
                            {isMasked ? <Tekst id="beskjed.maskert.tekst" /> : tekst}
                        </div>
                        <div className="arkiverbar-beskjed__dato-og-knapp">
                            <div className="arkiverbar-beskjed__dato">{dato}</div>
                            <ArkiverKnapp
                                eventId={eventId}
                                apiVarselinnboksUrl={apiVarselinnboksUrl}
                                setIsHover={setIsHover}
                                setActivateScreenReaderText={setActivateScreenReaderText}
                                id={id}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <a className="beskjed" href={href} id={id} onClick={handleOnClick}>
                    <div className="beskjed__ikon"></div>
                    <div className="beskjed__content-wrapper">
                        <div className="beskjed__text-wrapper">
                            <div className="beskjed__tittel">
                                {isMasked ? <Tekst id="beskjed.maskert.tekst" /> : tekst}
                            </div>
                            <div className="beskjed__dato">{dato}</div>
                        </div>
                        <Next className="chevron" />
                    </div>
                </a>
            )}
        </>
    );
};

export default Beskjed;
