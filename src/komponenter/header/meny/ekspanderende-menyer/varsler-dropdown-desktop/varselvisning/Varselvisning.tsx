import React from 'react';
import { AppState } from '../../../../../../reducer/reducers';
import './Varselvisning.less';
import { GACategory } from '../../../../../../utils/google-analytics';
import Tekst, { finnTekst } from '../../../../../../tekster/finn-tekst';
import { LenkeMedGA } from '../../../../../LenkeMedGA';
import { useSelector } from 'react-redux';
import { VarslerParsed } from './VarslerParsed';
import { Undertittel } from 'nav-frontend-typografi';
import {
    getKbId,
    NodeGroup,
} from '../../../../../../utils/keyboard-navigation/kb-navigation';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    varslerAntall: state.varsler.data.antall,
    varslerUleste: state.varsler.data.uleste,
    language: state.language.language,
});

const classname = 'varsler-display-desktop';

const alleVarslerLenke = (index: number, nyeVarslerMsg: string) => {
    const { API_VARSELINNBOKS_URL } = useSelector(
        (state: AppState) => state.environment
    );
    return (
        <div className="dekorator-vis-alle-lenke">
            <LenkeMedGA
                href={API_VARSELINNBOKS_URL}
                id={getKbId(NodeGroup.Varsler, { col: 0, row: index, sub: 0 })}
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
                <Tekst id={'varsler'} />
            </Undertittel>
            {visAlleVarslerLenke && alleVarslerLenke(0, nyeVarslerMsg)}
            <VarslerParsed varsler={varsler} rowIndex={1} />
            {visAlleVarslerLenke && alleVarslerLenke(2, nyeVarslerMsg)}
        </div>
    );
};
