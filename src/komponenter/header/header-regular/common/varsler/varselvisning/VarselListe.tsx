import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { NyesteVarslerData } from 'store/reducers/varselinnboks-duck';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/nb';
import { Bell } from '@navikt/ds-icons';
import { BodyShort, Detail } from '@navikt/ds-react';
import style from './VarselListe.module.scss';

dayjs.extend(localizedFormat);

type Props = {
    varsler: NyesteVarslerData[];
    rowIndex?: number;
};

const formatDato = (datoString: string) => {
    const unixtime = Number(datoString);
    if (!unixtime || isNaN(unixtime)) {
        return '';
    }

    return dayjs(unixtime).locale('nb').format('LLL');
};

export const VarselListe = ({ varsler, rowIndex }: Props) => {
    const arbeidsflate = useSelector((state: AppState) => state.arbeidsflate.status);

    return (
        <ul>
            {varsler.map((varsel: NyesteVarslerData, subIndex) => {
                return (
                    <li key={varsel.varselId} className={style.varselContainer}>
                        <div className={style.varsel}>
                            <div className={style.ikonContainer}>
                                <Bell />
                            </div>
                            <div>
                                <Detail className={style.varselDato}>{formatDato(varsel.datoOpprettet)}</Detail>
                                <BodyShort className={style.infotekst}>{varsel.varseltekst}</BodyShort>
                                <LenkeMedSporing
                                    href={varsel.url || ''}
                                    id={
                                        rowIndex !== undefined && subIndex !== undefined
                                            ? getKbId(KbNavGroup.Varsler, {
                                                  col: 0,
                                                  row: rowIndex,
                                                  sub: subIndex,
                                              })
                                            : undefined
                                    }
                                    analyticsEventArgs={{
                                        context: arbeidsflate,
                                        category: AnalyticsCategory.Header,
                                        action: 'varsel-lenke',
                                        label: varsel.url,
                                    }}
                                >
                                    Se varsler
                                </LenkeMedSporing>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
