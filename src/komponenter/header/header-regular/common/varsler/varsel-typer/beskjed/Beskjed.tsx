import React from 'react';
import { Next } from '@navikt/ds-icons';
import './Beskjed.less';
import Tekst from 'tekster/finn-tekst';

type Props = {
    tekst: string;
    dato: string;
    href: string;
    isMasked: boolean;
};

const Beskjed = ({ tekst, dato, href, isMasked }: Props) => {
    //TODO: Legge inn stepup-tekst i alle språk.
    return (
        <a className="beskjed" href={href}>
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

export default Beskjed;
