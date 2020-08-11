import React from 'react';
import { AppState } from 'store/reducers';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import { VarslerParsed } from './VarslerParsed';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import AlleVarslerLenke from './AlleVarslerLenke';
import './Varselvisning.less';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    varslerAntall: state.varsler.data.antall,
    varslerUleste: state.varsler.data.uleste,
    language: state.language.language,
    varselInnboksUrl: state.environment.API_VARSELINNBOKS_URL,
    varslerIsOpen: state.dropdownToggles.varsler,
});

type Props = {
    setKbId?: boolean;
};

export const Varselvisning = ({ setKbId }: Props) => {
    const { language, varselInnboksUrl } = useSelector(stateSelector);
    const { varsler, varslerAntall, varslerUleste } = useSelector(
        stateSelector
    );

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
            {varslerAntall === 0 ? (
                <div className={cls.element('tom-liste')}>
                    <Tekst id={'varsler-tom-liste'} />
                </div>
            ) : (
                <VarslerParsed
                    varsler={varsler}
                    rowIndex={setKbId ? 0 : undefined}
                />
            )}
            {visAlleVarslerLenke && (
                <AlleVarslerLenke
                    nyeVarslerMsg={nyeVarslerMsg}
                    varselInnboksUrl={varselInnboksUrl}
                    rowIndex={setKbId ? 1 : undefined}
                />
            )}
        </div>
    );
};
