import React from 'react';
import { AppState } from 'store/reducers';
import { GACategory } from 'utils/google-analytics';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { useSelector } from 'react-redux';
import { VarslerParsed } from './VarslerParsed';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import './Varselvisning.less';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    varslerAntall: state.varsler.data.antall,
    varslerUleste: state.varsler.data.uleste,
    language: state.language.language,
    varselInnboksUrl: state.environment.API_VARSELINNBOKS_URL,
});

const alleVarslerLenke = (
    nyeVarslerMsg: string,
    varselInnboksUrl: string,
    rowIndex?: number
) => {
    return (
        <div className="dekorator-vis-alle-lenke">
            <LenkeMedGA
                href={varselInnboksUrl}
                id={
                    rowIndex !== undefined
                        ? getKbId(KbNavGroup.Varsler, {
                              col: 0,
                              row: rowIndex,
                              sub: 0,
                          })
                        : undefined
                }
                gaEventArgs={{
                    category: GACategory.Header,
                    action: 'varsler/visalle',
                    label: varselInnboksUrl,
                }}
            >
                <Tekst id={'varsler-visalle'} />
                {nyeVarslerMsg}
            </LenkeMedGA>
        </div>
    );
};

type Props = { setKbId?: boolean };

export const Varselvisning = ({ setKbId }: Props) => {
    const {
        varsler,
        varslerAntall,
        varslerUleste,
        language,
        varselInnboksUrl,
    } = useSelector(stateSelector);

    const cls = BEMHelper('varsler-visning');

    const nyeVarslerMsg =
        varslerUleste > 0
            ? ` (${varslerUleste} ${finnTekst('varsler-nye', language)})`
            : '';
    const visAlleVarslerLenke = varslerAntall > 5;

    return (
        <div className={cls.className}>
            <Systemtittel className={cls.element('tittel')}>
                <Tekst id={'varsler-tittel'} />
            </Systemtittel>
            <VarslerParsed
                varsler={varsler}
                rowIndex={setKbId ? 0 : undefined}
            />
            {visAlleVarslerLenke &&
                alleVarslerLenke(
                    nyeVarslerMsg,
                    varselInnboksUrl,
                    setKbId ? 1 : undefined
                )}
        </div>
    );
};

export default Varselvisning;
