import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { VarslerData, VarslerInnhold } from 'store/reducers/varselinnboks-duck';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import varselConfig from './config.json'; // Kopiert fra: https://github.com/navikt/varselinnboks/blob/master/src/main/resources/config.json
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/nb';

import alarmIkon from 'ikoner/varsler/alarm.svg';
import kalenderIkon from 'ikoner/varsler/calendar-3.svg';
import chatIkon from 'ikoner/varsler/bubble-chat-2.svg';
import dokumentIkon from 'ikoner/varsler/file-new-1.svg';
import plasterIkon from 'ikoner/varsler/first-aid-plaster.svg';
import { BodyShort, Detail, Heading } from '@navikt/ds-react';
import Beskjed from '../varsel-typer/beskjed/Beskjed';
import Oppgave from '../varsel-typer/oppgave/Oppgave';
import ArkiverbarBeskjed from '../varsel-typer/arkiverbar-beskjed/ArkiverbarBeskjed';
import isMasked from 'utils/isMasked';
import { getLoginUrl } from 'utils/login';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);

const ikoner: { [str: string]: string } = {
    'alarm-ikon': alarmIkon,
    'kalender-ikon': kalenderIkon,
    'snakkeboble-ikon': chatIkon,
    'dokument-ikon': dokumentIkon,
    'plaster-ikon': plasterIkon,
};

type Props = {
    varsler: VarslerInnhold;
    rowIndex?: number;
};

interface VarselConfig {
    ikontekst: string;
    varselType: string;
    stylingklasse: string;
    lenketekst: string;
}

const defaultConfig = {
    ikontekst: 'alarm-ikon',
    varselType: '',
    stylingklasse: '',
    lenketekst: 'Se varsler',
};

const getVarselTypeConfig = (varselType: string) => {
    const data: VarselConfig[] = varselConfig;
    const config = data.find((item: VarselConfig) => item.varselType === varselType);
    return config ? config : defaultConfig;
};

const formatDato = (datoString: string) => {
    if (dayjs(datoString).isToday()) {
        return 'I dag, kl. ' + dayjs(datoString).locale('nb').format('HH.mm');
    }

    return dayjs(datoString).locale('nb').format('LL HH.mm');
};

export const VarselListe = ({ varsler, rowIndex }: Props) => {
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);
    const environment = useSelector((state: AppState) => state.environment);

    const hasNoHref = (href: string) => href === undefined || href === null || href === '';

    return (
        <>
            <Heading level="3" size="small">
                Oppgaver
            </Heading>
            <ul>
                {varsler &&
                    varsler?.oppgaver?.map((o) => (
                        <li key={o.eventId}>
                            <Oppgave
                                tekst={o.tekst}
                                dato={formatDato(o.forstBehandlet)}
                                href={isMasked(o.tekst) ? getLoginUrl(environment, arbeidsflate, '4') : o.link}
                                isMasked={isMasked(o.tekst)}
                            />
                        </li>
                    ))}
            </ul>
            <Heading level="3" size="small">
                Beskjeder
            </Heading>
            <ul>
                {varsler &&
                    varsler?.beskjed?.map((b) =>
                        !hasNoHref(b.link) || isMasked(b.tekst) ? (
                            <li key={b.eventId}>
                                <Beskjed
                                    tekst={b.tekst}
                                    dato={formatDato(b.forstBehandlet)}
                                    href={isMasked(b.tekst) ? getLoginUrl(environment, arbeidsflate, '4') : b.link}
                                    isMasked={isMasked(b.tekst)}
                                />
                            </li>
                        ) : (
                            <li key={b.eventId}>
                                <ArkiverbarBeskjed
                                    tekst={b.tekst}
                                    dato={formatDato(b.forstBehandlet)}
                                    isMasked={isMasked(b.tekst)}
                                />
                            </li>
                        )
                    )}
                {varsler &&
                    varsler?.innboks?.map((i) => (
                        <li key={i.eventId}>
                            <Beskjed
                                tekst={i.tekst}
                                dato={formatDato(i.forstBehandlet)}
                                href={isMasked(i.tekst) ? getLoginUrl(environment, arbeidsflate, '4') : i.link}
                                isMasked={isMasked(i.tekst)}
                            />
                        </li>
                    ))}
            </ul>
        </>
    );
};
