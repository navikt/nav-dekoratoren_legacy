import React, { useState } from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { VarslerData } from 'store/reducers/varselinnboks-duck';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/nb';

import { Heading } from '@navikt/ds-react';
import Beskjed from '../../varsel-typer/beskjed/Beskjed';
import Oppgave from '../../varsel-typer/oppgave/Oppgave';
import ArkiverbarBeskjed from '../../varsel-typer/arkiverbar-beskjed/ArkiverbarBeskjed';
import { getLoginUrl } from 'utils/login';
import Tekst from 'tekster/finn-tekst';
import InnboksBeskjed from '../../varsel-typer/innboks-beskjed/InnboksBeskjed';
import { Bell } from '@navikt/ds-icons';
import { BodyShort, Detail } from '@navikt/ds-react';
import { sortByEventTidspunkt } from 'utils/sorter';
import style from './VarselListe.module.scss';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);

type Props = {
    varsler: VarslerData;
    rowIndex?: number;
};

const formatDato = (datoString: string) => {
    if (dayjs(datoString).isToday()) {
        return 'I dag, kl. ' + dayjs(datoString).locale('nb').format('HH.mm');
    }

    return dayjs(datoString).locale('nb').format('LL HH.mm');
};

export const VarselListe = ({ varsler, rowIndex }: Props) => {
    const [activateScreenReaderText, setActivateScreenReaderText] = useState(false);
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);
    const environment = useSelector((state: AppState) => state.environment);
    const { API_DEKORATOREN_URL } = environment;

    const hasNoHref = (href: string) => href === undefined || href === null || href === '';

    const hasNoOppgaver = varsler?.oppgaver.length === 0;
    const hasNoBeskjeder = varsler?.beskjeder.length === 0;
    const screenReaderText = activateScreenReaderText ? <Tekst id={'varsler-arkiver-skjermleser'} /> : null;

    return (
        <div className="varselliste-wrapper">
            {hasNoOppgaver ? null : (
                <>
                    <Heading level="3" size="small">
                        <Tekst id={'varsler-oppgaver-tittel'} />
                    </Heading>
                    <ul>
                        {varsler &&
                            varsler?.oppgaver?.sort(sortByEventTidspunkt).map((o) => (
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
                </>
            )}
            {hasNoBeskjeder ? null : (
                <>
                    <Heading level="3" size="small">
                        <Tekst id={'varsler-beskjeder-tittel'} />
                    </Heading>
                    <ul>
                        {varsler &&
                            varsler?.beskjeder?.sort(sortByEventTidspunkt).map((b) =>
                                b.type === 'INNBOKS' ? (
                                    <li key={b.eventId}>
                                        <InnboksBeskjed
                                            eventId={b.eventId}
                                            tekst={b.tekst}
                                            dato={formatDato(b.tidspunkt)}
                                            href={b.isMasked ? getLoginUrl(environment, arbeidsflate, '4') : b.link}
                                            isMasked={b.isMasked}
                                        />
                                    </li>
                                ) : !hasNoHref(b.link) || b.isMasked ? (
                                    <li key={b.eventId}>
                                        <Beskjed
                                            eventId={b.eventId}
                                            apiVarselinnboksUrl={API_DEKORATOREN_URL}
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
                                            apiVarselinnboksUrl={API_DEKORATOREN_URL}
                                            tekst={b.tekst}
                                            dato={formatDato(b.tidspunkt)}
                                            isMasked={b.isMasked}
                                            setActivateScreenReaderText={setActivateScreenReaderText}
                                        />
                                    </li>
                                )
                            )}
                    </ul>
                </>
            )}
            <span aria-live="polite" className={style.ariaTextContainer}>
                {screenReaderText}
            </span>
        </div>
    );
};
