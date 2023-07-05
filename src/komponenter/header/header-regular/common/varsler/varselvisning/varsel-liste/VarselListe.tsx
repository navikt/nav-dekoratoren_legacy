import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { VarslerData } from 'store/reducers/varselinnboks-duck';
import { BodyShort } from '@navikt/ds-react';
import { getLoginUrl } from 'utils/login';
import { sortByEventTidspunkt } from 'utils/sorter';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import VarselBoks from '../../varsel-boks/VarselBoks';
import Tekst from 'tekster/finn-tekst';
import 'dayjs/locale/nb';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';

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
    const { VARSEL_API_URL } = environment;

    const hasNoOppgaver = varsler?.oppgaver.length === 0;
    const hasNoBeskjeder = varsler?.beskjeder.length === 0;
    const screenReaderText = activateScreenReaderText ? <Tekst id={'varsler-arkiver-skjermleser'} /> : '';

    return (
        <div>
            {hasNoOppgaver ? null : (
                <>
                    <BodyShort size="medium">
                        <Tekst id={'varsler-oppgaver-tittel'} />
                    </BodyShort>
                    <ul>
                        {varsler?.oppgaver?.sort(sortByEventTidspunkt).map((o, subIndex) => (
                            <li key={o.eventId}>
                                <VarselBoks
                                    eventId={o.eventId}
                                    VARSEL_API_URL={VARSEL_API_URL}
                                    tekst={o.tekst}
                                    dato={formatDato(o.tidspunkt)}
                                    href={o.isMasked ? getLoginUrl(environment, arbeidsflate, 'Level4') : o.link}
                                    isMasked={o.isMasked}
                                    id={
                                        rowIndex !== undefined && subIndex !== undefined
                                            ? getKbId(KbNavGroup.Varsler, {
                                                  col: 0,
                                                  row: rowIndex,
                                                  sub: subIndex,
                                              })
                                            : undefined
                                    }
                                    setActivateScreenReaderText={setActivateScreenReaderText}
                                    type={o.type}
                                    eksternVarslingKanaler={o.eksternVarslingKanaler}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {hasNoBeskjeder ? null : (
                <>
                    <BodyShort size="medium">
                        <Tekst id={'varsler-beskjeder-tittel'} />
                    </BodyShort>
                    <ul>
                        {varsler?.beskjeder?.sort(sortByEventTidspunkt).map((b, subIndex) => (
                            <li key={b.eventId}>
                                <VarselBoks
                                    eventId={b.eventId}
                                    VARSEL_API_URL={VARSEL_API_URL}
                                    tekst={b.tekst}
                                    dato={formatDato(b.tidspunkt)}
                                    href={b.isMasked ? getLoginUrl(environment, arbeidsflate, 'Level4') : b.link}
                                    isMasked={b.isMasked}
                                    id={
                                        rowIndex !== undefined && subIndex !== undefined
                                            ? getKbId(KbNavGroup.Varsler, {
                                                  col: 0,
                                                  row: rowIndex,
                                                  sub: subIndex + varsler.oppgaver.length,
                                              })
                                            : undefined
                                    }
                                    setActivateScreenReaderText={setActivateScreenReaderText}
                                    type={b.type}
                                    eksternVarslingKanaler={b.eksternVarslingKanaler}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <span aria-live="polite" className={style.ariaTextContainer}>
                {screenReaderText}
            </span>
        </div>
    );
};
