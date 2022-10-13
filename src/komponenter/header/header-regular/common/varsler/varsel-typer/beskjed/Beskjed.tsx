import React from 'react';
import { Next } from '@navikt/ds-icons';
import './Beskjed.less';
import Tekst from 'tekster/finn-tekst';
import { fjernLestVarsel } from 'store/reducers/varselinnboks-duck';
import { useDispatch } from 'react-redux';

type Props = {
    eventId: string;
    tekst: string;
    dato: string;
    href: string;
    isMasked: boolean;
};

const Beskjed = ({ eventId, tekst, dato, href, isMasked }: Props) => {
    //TODO: Legge inn stepup-tekst i alle språk.

    const dispatch = useDispatch();

    const handleOnClick = () => {
        //fjernLestVarsel(eventId)(dispatch)
    };

    return (
        <a className="beskjed" href={href} onClick={handleOnClick}>
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
