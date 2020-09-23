import React from 'react';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import AlleVarslerLenke from './AlleVarslerLenke';
import './Varselvisning.less';
import { VarselListe } from './VarselListe';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    varslerUleste: state.varsler.data.varsler.totaltAntallUleste,
    language: state.language.language,
    varselInnboksUrl: state.environment.API_VARSELINNBOKS_URL,
    varslerIsOpen: state.dropdownToggles.varsler,
});

type Props = {
    setKbId?: boolean;
};

export const Varselvisning = ({ setKbId }: Props) => {
    const { varselInnboksUrl } = useSelector(stateSelector);
    const { varsler } = useSelector(
        stateSelector
    );

    const varslerAntall = varsler.nyesteVarsler?.length;

    const cls = BEMHelper('varsler-visning');

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
                <VarselListe
                    varsler={varsler.nyesteVarsler.slice(0, 5)}
                    rowIndex={setKbId ? 0 : undefined}
                />
            )}
            {visAlleVarslerLenke && (
                <AlleVarslerLenke
                    varselInnboksUrl={varselInnboksUrl}
                    rowIndex={setKbId ? 1 : undefined}
                />
            )}
        </div>
    );
};
