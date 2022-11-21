import React, { useState } from 'react';
import ArkiverKnapp from './ArkiverKnapp';
import './ArkiverbarBeskjed.scss';
import Tekst from 'tekster/finn-tekst';

type Props = {
    eventId: string;
    apiVarselinnboksUrl: string;
    tekst: string;
    dato: string;
    isMasked: boolean;
    setActivateScreenReaderText: (setActivateScreenReaderText: boolean) => void;
    id?: string;
};

const ArkiverbarBeskjed = ({
    eventId,
    apiVarselinnboksUrl,
    tekst,
    dato,
    isMasked,
    setActivateScreenReaderText,
    id,
}: Props) => {
    const [isHover, setIsHover] = useState(false);

    //TODO: Legge inn stepup-tekst i alle språk.
    return (
        <div className={isHover ? 'arkiverbar-beskjed-hover' : 'arkiverbar-beskjed'} id={id}>
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
                    />
                </div>
            </div>
        </div>
    );
};

export default ArkiverbarBeskjed;
