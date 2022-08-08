import React from 'react';
import { AppState } from 'store/reducers';
import { Heading } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import BEMHelper from 'utils/bem';
import AlleVarslerLenke from './AlleVarslerLenke';
import { VarselListe } from './VarselListe';
import './Varselvisning.less';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    dittNavUrl: state.environment.DITT_NAV_URL,
    varslerUleste: state.varsler.data.varsler.totaltAntallUleste,
    language: state.language.language,
    varslerIsOpen: state.dropdownToggles.varsler,
});

type Props = {
    setKbId?: boolean;
};

export const Varselvisning = ({ setKbId }: Props) => {
    const { varsler, dittNavUrl } = useSelector(stateSelector);

    const varslerAntall = varsler.nyesteVarsler?.length;

    const cls = BEMHelper('varsler-visning');

    return (
        <div className={cls.className}>
            <Heading level="2" size="medium" className={cls.element('tittel')}>
                <Tekst id={'varsler-tittel'} />
            </Heading>
            {varslerAntall === 0 ? (
                <div className={cls.element('tom-liste')}>
                    <Tekst id={'varsler-tom-liste'} />
                </div>
            ) : (
                <VarselListe varsler={varsler.nyesteVarsler.slice(0, 5)} rowIndex={setKbId ? 0 : undefined} />
            )}
            <AlleVarslerLenke varselInnboksUrl={`${dittNavUrl}varslinger`} rowIndex={setKbId ? 1 : undefined} />
        </div>
    );
};
