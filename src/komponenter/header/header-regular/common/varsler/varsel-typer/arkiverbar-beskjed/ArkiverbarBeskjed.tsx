import React, { useState } from 'react';
import ArkiverKnapp from './ArkiverKnapp';
import './ArkiverbarBeskjed.less';
import Tekst from 'tekster/finn-tekst';

type Props = {
    eventId: string;
    apiVarselinnboksUrl: string;
    tekst: string;
    dato: string;
    isMasked: boolean;
};

const ArkiverbarBeskjed = ({ eventId, apiVarselinnboksUrl, tekst, dato, isMasked }: Props) => {
    const [isHover, setIsHover] = useState(false);

    //TODO: Legge inn stepup-tekst i alle språk.
    return (
        <div className={isHover ? 'arkiverbar-beskjed-hover' : 'arkiverbar-beskjed'}>
            <div className="arkiverbar-beskjed__ikon"></div>
            <div className="arkiverbar-beskjed__content-wrapper">
                <div className="arkiverbar-beskjed__tittel">
                    {isMasked ? <Tekst id="beskjed.maskert.tekst" /> : tekst}
                </div>
                <div className="arkiverbar-beskjed__dato-og-knapp">
                    <div className="arkiverbar-beskjed__dato">{dato}</div>
                    <ArkiverKnapp eventId={eventId} apiVarselinnboksUrl={apiVarselinnboksUrl} setIsHover={setIsHover} />
                </div>
            </div>
        </div>
    );
};

export default ArkiverbarBeskjed;
