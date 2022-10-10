import React from 'react';
import { Next } from '@navikt/ds-icons';
import './Beskjed.less';

const Beskjed = () => {
    const dato = '22.02.2022';
    const tekst = 'Test av beskjed';

    return (
        <div className="beskjed">
            <div className="beskjed__ikon"></div>
            <div className="beskjed__content-wrapper">
                <div className="beskjed__text-wrapper">
                    <div className="beskjed__tittel">{tekst}</div>
                    <div className="beskjed__dato">{dato}</div>
                </div>
                <Next className="chevron" />
            </div>
        </div>
    );
};

export default Beskjed;
