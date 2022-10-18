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
    varsler: state.varsler.data,
    minSideUrl: state.environment.MIN_SIDE_URL,
});

type Props = {
    setKbId?: boolean;
};

export const Varselvisning = ({ setKbId }: Props) => {
    const { varsler, minSideUrl } = useSelector(stateSelector);

    const antallVarsler = varsler?.oppgaver.length + varsler?.beskjeder.length + varsler?.innbokser.length;

    const cls = BEMHelper('varsler-visning');

    return (
        <div className={cls.className}>
            <Heading level="2" size="medium" className={cls.element('tittel')}>
                <Tekst id={'varsler-tittel'} />
            </Heading>
            {varsler && antallVarsler === 0 ? (
                <div className={cls.element('tom-liste')}>
                    <Tekst id={'varsler-tom-liste'} />
                </div>
            ) : (
                <VarselListe varsler={varsler} rowIndex={setKbId ? 0 : undefined} />
            )}
            <AlleVarslerLenke varselInnboksUrl={`${minSideUrl}varslinger`} rowIndex={setKbId ? 1 : undefined} />
        </div>
    );
};
