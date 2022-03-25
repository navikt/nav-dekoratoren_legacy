import React from 'react';
import { BodyLong, Heading, Modal } from '@navikt/ds-react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import './TilgjengelighetserklaeringsModal.less';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

//setappelement?

const TilgjengelighetserklaeringsModal = (props: Props) => {
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
                    <LenkeMedSporing href="test">
                        Tilgjengelighetserklæring for den siden du er på nå. (Sykepenger)
                    </LenkeMedSporing>
                    <LenkeMedSporing href="test">Generel tilgjengelighetserklæring for hele nav.no</LenkeMedSporing>
                    <LenkeMedSporing href="test">Meld inn uu feil</LenkeMedSporing>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default TilgjengelighetserklaeringsModal;
