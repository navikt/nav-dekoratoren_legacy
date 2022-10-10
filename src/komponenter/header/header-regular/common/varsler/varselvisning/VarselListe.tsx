import React from 'react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { NyesteVarslerData } from 'store/reducers/varselinnboks-duck';
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
import { BodyShort, Detail } from '@navikt/ds-react';
import Beskjed from '../varsel-typer/beskjed/Beskjed';
import Oppgave from '../varsel-typer/oppgave/Oppgave';
import ArkiverbarBeskjed from '../varsel-typer/arkiverbar-beskjed/ArkiverbarBeskjed';

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
    varsler: NyesteVarslerData[];
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

    return (
        <>
            <h3>Oppgaver</h3>
            <ul>
                <li className="dekorator-varsel-container">
                    <Oppgave test={formatDato('2022-10-07T08:53:24.636Z')} />
                </li>
                <li className="dekorator-varsel-container">
                    <Oppgave test={formatDato('2022-11-05T08:53:24.636Z')} />
                </li>
                <li className="dekorator-varsel-container">
                    <Oppgave test={formatDato('2020-03-13T08:53:24.636Z')} />
                </li>
            </ul>
            <h3>Beskjeder</h3>
            <ul>
                <li className="dekorator-varsel-container">
                    <Beskjed />
                </li>
                <li className="dekorator-varsel-container">
                    <ArkiverbarBeskjed />
                </li>
                <li className="dekorator-varsel-container">
                    <Beskjed />
                </li>
            </ul>
        </>
    );
};
