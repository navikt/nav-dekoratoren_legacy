import React from 'react';
import { Next } from '@navikt/ds-icons';
import './Oppgave.less';

type Props = {
    test: String;
};

const Oppgave = ({ test }: Props) => {
    const dato = '22.02.2022';
    const tekst = 'Test av oppgave';

    return (
        <div className="oppgave">
            <div className="oppgave__ikon"></div>
            <div className="oppgave__content-wrapper">
                <div className="oppgave__text-wrapper">
                    <div className="oppgave__tittel">{tekst}</div>
                    <div className="oppgave__dato">{test}</div>
                </div>
                <Next className="chevron" />
            </div>
        </div>
    );
};

export default Oppgave;
