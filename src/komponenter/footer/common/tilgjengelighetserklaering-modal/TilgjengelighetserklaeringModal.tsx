import React from 'react';
import { useSelector } from 'react-redux';
import { BodyLong, Heading, Modal } from '@navikt/ds-react';
import { AppState } from 'store/reducers';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import './TilgjengelighetserklaeringModal.less';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

//setappelement?

const stateSelector = (state: AppState) => ({
    environment: state.environment,
});

const TilgjengelighetserklaeringsModal = (props: Props) => {
    const { environment } = useSelector(stateSelector);
    const { PARAMS } = environment;

    console.log(PARAMS);

    return (
        <Modal
            open={props.isOpen}
            // open={true}
            className={'decorator-wrapper tilgjengelighetserklaerings__modal'}
            aria-label={'Tilgjengelighetserklæring'}
            onClose={props.onClose}
        >
            <Modal.Content>
                <div>
                    <Heading spacing size="medium" level="2">
                        Universell utforming
                    </Heading>
                    <BodyLong>
                        Nav.no har mange målgrupper og brukere som skal ha like muligheter til tjenester og informasjon
                        på nettsidene, uavhengig av brukernes funksjonsevne.
                    </BodyLong>
                    <LenkeMedSporing href="test">Hvordan jobber NAV med Universell utforming</LenkeMedSporing>
                </div>
                <div>
                    <Heading spacing size="small" level="3">
                        Tilgjengelighetserklæringer:
                    </Heading>
                    {(() => {
                        if (PARAMS.ACCESSIBILITY_STATEMENT_URL) {
                            return (
                                <LenkeMedSporing href={PARAMS.ACCESSIBILITY_STATEMENT_URL}>
                                    Tilgjengelighetserklæring for den siden du er på nå
                                    {PARAMS.APP_NAME ? ` (${PARAMS.APP_NAME})` : ''}
                                </LenkeMedSporing>
                            );
                        }
                    })()}
                    <LenkeMedSporing href="test">Generell tilgjengelighetserklæring for hele nav.no</LenkeMedSporing>
                </div>
                <div>
                    <LenkeMedSporing href="test">Meld inn uu feil</LenkeMedSporing>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default TilgjengelighetserklaeringsModal;
