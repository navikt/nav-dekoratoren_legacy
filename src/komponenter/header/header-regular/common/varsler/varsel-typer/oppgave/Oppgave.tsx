import React from 'react';
import { Next } from '@navikt/ds-icons';
import './Oppgave.less';
import { Varsler } from 'store/reducers/varselinnboks-duck';
import Tekst from 'tekster/finn-tekst';
import { getLoginUrl } from 'utils/login';

type Props = {
    tekst: string;
    dato: string;
    href: string;
    isMasked: boolean;
};

const Oppgave = ({ tekst, dato, href, isMasked }: Props) => {
    //TODO: Legge inn stepup-tekst i alle språk.
    return (
        <a className="oppgave" href={href}>
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
