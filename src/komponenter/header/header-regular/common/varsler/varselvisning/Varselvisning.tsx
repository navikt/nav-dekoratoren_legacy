import React from 'react';
import { AppState } from 'store/reducers';
import { Heading, BodyLong } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { useSelector } from 'react-redux';
import AlleVarslerLenke from './alle-varsler-lenke/AlleVarslerLenke';
import { VarselListe } from './varsel-liste/VarselListe';
import './Varselvisning.scss';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import ikon from 'src/ikoner/varsler/kattIngenVarsler.svg';

const stateSelector = (state: AppState) => ({
    varsler: state.varsler.data,
    minSideUrl: state.environment.MIN_SIDE_URL,
});

type Props = {
    setKbId?: boolean;
};

export const Varselvisning = ({ setKbId }: Props) => {
    const { varsler, minSideUrl } = useSelector(stateSelector);

    const antallVarsler = varsler ? varsler.oppgaver.length + varsler.beskjeder.length : 0;
    const isTomListe = antallVarsler === 0;

    return (
        <div className={isTomListe ? 'varsler-visning-tom' : 'varsler-visning'} data-hj-suppress={true}>
            {isTomListe ? (
                <>
                    <div className={'varsler-visning-tom-liste'}>
                        <Bilde altText={''} asset={ikon} ariaHidden={true} />
                        <Heading size="small" className="varsler-tom-hovedtekst">
                            <Tekst id={'varsler-tom-liste'} />
                        </Heading>
                        <BodyLong size="small" className="varsler-tom-ingress">
                            <Tekst id={'varsler-tom-liste-ingress'} />
                        </BodyLong>
                    </div>
                </>
            ) : (
                <VarselListe varsler={varsler} rowIndex={setKbId ? 0 : undefined} />
            )}
            <AlleVarslerLenke
                tidligereVarslerUrl={`${minSideUrl}tidligere-varsler`}
                rowIndex={setKbId ? 1 : undefined}
            />
        </div>
    );
};
