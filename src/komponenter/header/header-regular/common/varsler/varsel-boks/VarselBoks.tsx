import React from 'react';
import { Next } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import { fjernLestVarsel } from 'store/reducers/varselinnboks-duck';
import { useDispatch } from 'react-redux';
import { postDone } from 'api/api';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import ArkiverKnapp from './arkiver-knapp/ArkiverKnapp';
import beskjedIkon from '../../../../../../ikoner/varsler/beskjedIkon.svg';
import oppgaveIkon from '../../../../../../ikoner/varsler/oppgaveIkon.svg';
import classNames from 'classnames';

import style from './VarselBoks.module.scss';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import { Tag } from '@navikt/ds-react';

const getEksternvarslingStatus = (kanaler: string[]) => {
    if (kanaler?.includes("SMS") && kanaler?.includes("EPOST")) {
        return <Tekst id="varslet-epost-og-sms" />
    } else if (kanaler?.includes("SMS")) {
        return <Tekst id="varslet-sms" />
    } else if (kanaler?.includes("EPOST")) {
        return <Tekst id="varslet-epost" />
    }
};

type Props = {
    eventId: string;
    apiVarselinnboksUrl: string;
    tekst: string;
    dato: string;
    href: string;
    isMasked: boolean;
    id?: string;
    type: string;
    setActivateScreenReaderText: (setActivateScreenReaderText: boolean) => void;
    eksternVarslingKanaler: string[];
};

const Beskjed = ({
    eventId,
    apiVarselinnboksUrl,
    tekst,
    dato,
    href,
    isMasked,
    id,
    type,
    setActivateScreenReaderText,
    eksternVarslingKanaler,
}: Props) => {
    //TODO: Legge inn stepup-tekst i alle språk.

    const dispatch = useDispatch();

    const isOppgave = type.toLowerCase() === 'oppgave';
    const isArkiverbar = !href && !isOppgave;
    const eksternVarslingStatus = getEksternvarslingStatus(eksternVarslingKanaler);

    const handleOnClick = () => {
        if (type.toLowerCase() === 'beskjed' && !isMasked) {
            postDone(apiVarselinnboksUrl, { eventId: eventId });
            dispatch(fjernLestVarsel(eventId));
        }
        logAmplitudeEvent('navigere', { komponent: type.toLowerCase() == "beskjed" ? "varsel-beskjed" : "varsel-oppgave", kategori: "varselbjelle", destinasjon: href });
    };

    return isArkiverbar ? (
        <div className={classNames(style.beskjed, style.arkiverbar)}>
            <div className={style.contentWrapper}>
                <div className={style.tittel}>{isMasked ? <Tekst id="beskjed.maskert.tekst" /> : tekst}</div>
                <div className={style.dato}>{dato}</div>
                <div className={style.metadataOgKnapp}>
                    <div className={style.ikonOgTag}>
                        {isOppgave ? <Bilde altText={''} asset={oppgaveIkon} ariaHidden={true} /> : <Bilde altText={''} asset={beskjedIkon} ariaHidden={true} />}
                        {eksternVarslingStatus && (
                            <Tag variant="neutral" size="xsmall" className={style.varselTag}>
                                {eksternVarslingStatus}
                            </Tag>
                        )}
                    </div>
                    <ArkiverKnapp
                        eventId={eventId}
                        apiVarselinnboksUrl={apiVarselinnboksUrl}
                        setActivateScreenReaderText={setActivateScreenReaderText}
                        id={id}
                    />
                </div>
            </div>
        </div>
    ) : (
        <a
            className={classNames(style.beskjed, style.ikkeArkiverbar, isOppgave ? style.oppgave : null)}
            href={href}
            id={id}
            onClick={handleOnClick}
        >
            <div className={style.contentWrapper}>
                <div className={style.tittelOgDato}>
                    <div className={style.tittel}>{isMasked ? <Tekst id="beskjed.maskert.tekst" /> : tekst}</div>
                    <div className={style.dato}>{dato}</div>
                </div>
                <div className={style.metadataOgKnapp}>
                    <div className={style.ikonOgTag}>
                        {isOppgave ? <Bilde altText={''} asset={oppgaveIkon} ariaHidden={true} /> : <Bilde altText={''} asset={beskjedIkon} ariaHidden={true} />}
                        {eksternVarslingStatus && (
                        <Tag variant="neutral" size="xsmall" className={style.varselTag}>
                            {eksternVarslingStatus}
                        </Tag>
                        )}
                    </div>
                    <Next className={style.chevron} onResize={undefined} onResizeCapture={undefined} />
                </div>
            </div>
        </a>
    );
};

export default Beskjed;
