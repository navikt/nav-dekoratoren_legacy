import React from 'react';
import { AppState } from 'store/reducers';
import { GACategory } from 'utils/google-analytics';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import { useSelector } from 'react-redux';
import { VarslerParsed } from './VarslerParsed';
import { Undertittel } from 'nav-frontend-typografi';
import { getKbId, NodeGroup } from 'utils/keyboard-navigation/kb-navigation';
import { KbNavigationWrapper } from 'utils/keyboard-navigation/KbNavigationWrapper';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import './Varselvisning.less';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    varslerAntall: state.varsler.data.antall,
    varslerUleste: state.varsler.data.uleste,
    language: state.language.language,
});

type Props = {
    isOpen: boolean;
};

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

export const Varselvisning = ({ isOpen }: Props) => {
    const { varsler, varslerAntall, varslerUleste, language } = useSelector(
        stateSelector
    );

    const nyeVarslerMsg =
        varslerUleste > 0
            ? ` (${varslerUleste} ${finnTekst('varsler-nye', language)})`
            : '';
    const visAlleVarslerLenke = varslerAntall > 5;

    return (
        <KbNavigationWrapper
            config={configForNodeGroup[NodeGroup.Varsler]}
            isEnabled={isOpen}
        >
            <div className={classname}>
                <Undertittel>
                    <Tekst id={'varsler-tittel'} />
                </Undertittel>
                {visAlleVarslerLenke && alleVarslerLenke(0, nyeVarslerMsg)}
                <VarslerParsed varsler={varsler} rowIndex={1} />
                {visAlleVarslerLenke && alleVarslerLenke(2, nyeVarslerMsg)}
            </div>
        </KbNavigationWrapper>
    );
};
