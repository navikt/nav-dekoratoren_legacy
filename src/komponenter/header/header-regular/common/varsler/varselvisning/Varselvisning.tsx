import React from 'react';
import { AppState } from 'store/reducers';
import { Heading } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import AlleVarslerLenke from './alle-varsler-lenke/AlleVarslerLenke';
import { VarselListe } from './varsel-liste/VarselListe';
import style from './Varselvisning.module.scss';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data.varsler,
    minSideUrl: state.environment.MIN_SIDE_URL,
});

type Props = {
    setKbId?: boolean;
};

export const Varselvisning = ({ setKbId }: Props) => {
    const { varsler, minSideUrl } = useSelector(stateSelector);

    const varslerAntall = varsler.nyesteVarsler?.length;

    return (
        <div className={style.varslerVisning}>
            <Heading level="2" size="medium" className={style.tittel}>
                <Tekst id={'varsler-tittel'} />
            </Heading>
            {varslerAntall === 0 ? (
                <div className={style.tomListe}>
                    <Tekst id={'varsler-tom-liste'} />
                </div>
            ) : (
                <VarselListe varsler={varsler.nyesteVarsler.slice(0, 5)} rowIndex={setKbId ? 0 : undefined} />
            )}
            <AlleVarslerLenke varselInnboksUrl={`${minSideUrl}varslinger`} rowIndex={setKbId ? 1 : undefined} />
        </div>
    );
};
