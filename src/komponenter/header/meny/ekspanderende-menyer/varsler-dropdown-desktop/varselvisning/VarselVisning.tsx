import React, { useEffect, useState } from 'react';
import { AppState } from '../../../../../../reducer/reducer';
import Environment from '../../../../../../utils/Environment';
import './VarselVisning.less';
import { GACategory } from '../../../../../../utils/google-analytics';
import Tekst, { finnTekst } from '../../../../../../tekster/finn-tekst';
import { LenkeMedGA } from '../../../../../LenkeMedGA';
import { useSelector } from 'react-redux';
import { VarslerParsed } from './VarslerParsed';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import {
    getKbId,
    NodeGroup,
} from '../../../../../../utils/keyboard-navigation/kb-navigation';
import { KbNavigationWrapper } from '../../../../../../utils/keyboard-navigation/KbNavigationWrapper';
import {
    configForNodeGroup,
    KbNavConfig,
} from '../../../../../../utils/keyboard-navigation/kb-navigation-setup';

type Props = {
    isOpen: boolean;
};

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    varslerAntall: state.varsler.data.antall,
    varslerUleste: state.varsler.data.uleste,
    language: state.language.language,
});

const classname = 'varsler-display-desktop';
const nodeGroup = NodeGroup.Varsler;

const alleVarslerLenke = (index: number, nyeVarslerMsg: string) => (
    <div className="vis-alle-lenke">
        <LenkeMedGA
            href={Environment.API_VARSELINNBOKS_URL}
            id={getKbId(NodeGroup.Varsler, { col: 0, row: index, sub: 0 })}
            tabIndex={0}
            gaEventArgs={{
                category: GACategory.Header,
                action: 'varsler/visalle',
                label: Environment.API_VARSELINNBOKS_URL,
            }}
        >
            <Tekst id={'varsler-visalle'} />
            {nyeVarslerMsg}
        </LenkeMedGA>
    </div>
);

export const VarselVisning = ({ isOpen }: Props) => {
    const { varsler, varslerAntall, varslerUleste, language } = useSelector(
        stateSelector
    );
    const [kbNavConfig, setKbNavConfig] = useState<KbNavConfig>();

    useEffect(() => {
        setKbNavConfig({
            ...configForNodeGroup[nodeGroup],
            maxColsPerRow: visAlleVarslerLenke ? [1, 1, 1] : [1],
        });
    }, []);

    if (varslerAntall === 0) {
        return (
            <div className={classname}>
                <Normaltekst>
                    <Tekst id={'varsler-ingen'} />
                </Normaltekst>
            </div>
        );
    }

    const nyeVarslerMsg =
        varslerUleste > 0
            ? ` (${varslerUleste} ${finnTekst('varsler-nye', language)})`
            : '';
    const visAlleVarslerLenke = varslerAntall > 5;
    let rowIndex = 0;

    return (
        <KbNavigationWrapper
            config={kbNavConfig || configForNodeGroup[nodeGroup]}
            isEnabled={isOpen}
        >
            <div className={classname}>
                <Undertittel>
                    <Tekst id={'varsler'} />
                </Undertittel>
                {visAlleVarslerLenke &&
                    alleVarslerLenke(rowIndex++, nyeVarslerMsg)}
                <VarslerParsed varsler={varsler} rowIndex={rowIndex++} />
                {visAlleVarslerLenke &&
                    alleVarslerLenke(rowIndex, nyeVarslerMsg)}
            </div>
        </KbNavigationWrapper>
    );
};
