import React from 'react';
import { Next } from '@navikt/ds-icons';
import './Oppgave.scss';
import Tekst from 'tekster/finn-tekst';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';

type Props = {
    tekst: string;
    dato: string;
    href: string;
    isMasked: boolean;
    id?: string;
};

const Oppgave = ({ tekst, dato, href, isMasked, id }: Props) => {
    //TODO: Legge inn stepup-tekst i alle språk.

    return (
        <a
            className="oppgave"
            href={href}
            id={id}
            onClick={() => logAmplitudeEvent('navigere', { komponent: 'Oppgave' })}
        >
            <div className="oppgave__ikon"></div>
            <div className="oppgave__content-wrapper">
                <div className="oppgave__text-wrapper">
                    <div className="oppgave__tittel">{isMasked ? <Tekst id="beskjed.maskert.tekst" /> : tekst}</div>
                    <div className="oppgave__dato">{dato}</div>
                </div>
                <Next className="chevron" />
            </div>
        </a>
    );
};

export default Oppgave;
