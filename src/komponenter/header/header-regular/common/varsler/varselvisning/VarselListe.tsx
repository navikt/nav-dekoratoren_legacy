import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { VarslerInnhold } from 'store/reducers/varselinnboks-duck';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/nb';

import alarmIkon from 'ikoner/varsler/alarm.svg';
import kalenderIkon from 'ikoner/varsler/calendar-3.svg';
import chatIkon from 'ikoner/varsler/bubble-chat-2.svg';
import dokumentIkon from 'ikoner/varsler/file-new-1.svg';
import plasterIkon from 'ikoner/varsler/first-aid-plaster.svg';
import { Heading } from '@navikt/ds-react';
import Beskjed from '../varsel-typer/beskjed/Beskjed';
import Oppgave from '../varsel-typer/oppgave/Oppgave';
import ArkiverbarBeskjed from '../varsel-typer/arkiverbar-beskjed/ArkiverbarBeskjed';
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
                                dato={formatDato(o.tidspunkt)}
                                href={o.isMasked ? getLoginUrl(environment, arbeidsflate, '4') : o.link}
                                isMasked={o.isMasked}
                            />
                        </li>
                    ))}
            </ul>
            <Heading level="3" size="small">
                Beskjeder
            </Heading>
            <ul>
                {varsler &&
                    varsler?.beskjeder?.map((b) =>
                        !hasNoHref(b.link) || b.isMasked ? (
                            <li key={b.eventId}>
                                <Beskjed
                                    eventId={b.eventId}
                                    tekst={b.tekst}
                                    dato={formatDato(b.tidspunkt)}
                                    href={b.isMasked ? getLoginUrl(environment, arbeidsflate, '4') : b.link}
                                    isMasked={b.isMasked}
                                />
                            </li>
                        ) : (
                            <li key={b.eventId}>
                                <ArkiverbarBeskjed
                                    eventId={b.eventId}
                                    tekst={b.tekst}
                                    dato={formatDato(b.tidspunkt)}
                                    isMasked={b.isMasked}
                                />
                            </li>
                        )
                    )}
                {varsler &&
                    varsler?.innbokser?.map((i) => (
                        <li key={i.eventId}>
                            <Beskjed
                                eventId={i.eventId}
                                tekst={i.tekst}
                                dato={formatDato(i.tidspunkt)}
                                href={i.isMasked ? getLoginUrl(environment, arbeidsflate, '4') : i.link}
                                isMasked={i.isMasked}
                            />
                        </li>
                    ))}
            </ul>
        </>
    );
};
