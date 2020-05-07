import React from 'react';
import { AppState } from 'store/reducers';
import { GACategory } from 'utils/google-analytics';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import { useSelector } from 'react-redux';
import { VarslerParsed } from './VarslerParsed';
import { Undertittel } from 'nav-frontend-typografi';
import { getKbId, KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import './Varselvisning.less';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    varslerAntall: state.varsler.data.antall,
    varslerUleste: state.varsler.data.uleste,
    language: state.language.language,
});

const classname = 'varsler-display-desktop';

const alleVarslerLenke = (rowIndex: number, nyeVarslerMsg: string) => {
    const { API_VARSELINNBOKS_URL } = useSelector(
        (state: AppState) => state.environment
    );
    return (
        <div className="dekorator-vis-alle-lenke">
            <LenkeMedGA
                href={API_VARSELINNBOKS_URL}
                id={getKbId(KbNavGroup.Varsler, {
                    col: 0,
                    row: rowIndex,
                    sub: 0,
                })}
                tabIndex={0}
                gaEventArgs={{
                    category: GACategory.Header,
                    action: 'varsler/visalle',
                    label: API_VARSELINNBOKS_URL,
                }}
            >
                <Tekst id={'varsler-visalle'} />
                {nyeVarslerMsg}
            </LenkeMedGA>
        </div>
    );
};

export const Varselvisning = () => {
    const { varsler, varslerAntall, varslerUleste, language } = useSelector(
        stateSelector
    );

    const nyeVarslerMsg =
        varslerUleste > 0
            ? ` (${varslerUleste} ${finnTekst('varsler-nye', language)})`
            : '';
    const visAlleVarslerLenke = varslerAntall > 5;

    return (
        <div className={classname}>
            <Undertittel>
                <Tekst id={'varsler-tittel'} />
            </Undertittel>
            {visAlleVarslerLenke && alleVarslerLenke(0, nyeVarslerMsg)}
            <VarslerParsed
                varsler={varsler}
                rowIndex={visAlleVarslerLenke ? 1 : 0}
            />
            {visAlleVarslerLenke && alleVarslerLenke(2, nyeVarslerMsg)}
        </div>
    );
};
