import React, { useState } from 'react';
import { Next } from '@navikt/ds-icons';
import './ArkiverbarBeskjed.less';
import ArkiverKnapp from './ArkiverKnapp';

const ArkiverbarBeskjed = () => {
    const [isHover, setIsHover] = useState(false);
    const dato = '22.02.2022';
    const tekst = 'Test av arkiverbar-beskjed';

    return (
        <div className={isHover ? 'arkiverbar-beskjed-hover' : 'arkiverbar-beskjed'}>
            <div className="arkiverbar-beskjed__ikon"></div>
            <div className="arkiverbar-beskjed__content-wrapper">
                <div className="arkiverbar-beskjed__tittel">{tekst}</div>
                <div className="arkiverbar-beskjed__dato-og-knapp">
                    <div className="arkiverbar-beskjed__dato">{dato}</div>
                    <ArkiverKnapp setIsHover={setIsHover} />
                </div>
            </div>
        </div>
    );
};

export default ArkiverbarBeskjed;
