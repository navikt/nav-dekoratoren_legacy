import React from 'react';
import { Next } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import './InnboksBeskjed.scss';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';

type Props = {
    eventId: string;
    tekst: string;
    dato: string;
    href: string;
    isMasked: boolean;
    id?: string;
};

const InnboksBeskjed = ({ tekst, dato, href, isMasked, id }: Props) => {
    //TODO: Legge inn stepup-tekst i alle språk.

    return (
        <a
            className="beskjed"
            href={href}
            id={id}
            onClick={() => logAmplitudeEvent('navigere', { komponent: 'Beskjed - Innboks' })}
        >
            <div className="beskjed__ikon"></div>
            <div className="beskjed__content-wrapper">
                <div className="beskjed__text-wrapper">
                    <div className="beskjed__tittel">{isMasked ? <Tekst id="beskjed.maskert.tekst" /> : tekst}</div>
                    <div className="beskjed__dato">{dato}</div>
                </div>
                <Next className="chevron" />
            </div>
        </a>
    );
};

export default InnboksBeskjed;
