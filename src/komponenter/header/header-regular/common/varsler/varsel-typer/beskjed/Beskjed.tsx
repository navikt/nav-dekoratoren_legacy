import React from 'react';
import { Next } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import { fjernLestVarsel } from 'store/reducers/varselinnboks-duck';
import { useDispatch } from 'react-redux';
import { postDone } from 'api/api';
import './Beskjed.less';

type Props = {
    eventId: string;
    appUrl: string;
    tekst: string;
    dato: string;
    href: string;
    isMasked: boolean;
};

const Beskjed = ({ eventId, appUrl, tekst, dato, href, isMasked }: Props) => {
    //TODO: Legge inn stepup-tekst i alle språk.

    const dispatch = useDispatch();

    const handleOnClick = () => {
        postDone(appUrl, eventId);
        dispatch(fjernLestVarsel(eventId));
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
