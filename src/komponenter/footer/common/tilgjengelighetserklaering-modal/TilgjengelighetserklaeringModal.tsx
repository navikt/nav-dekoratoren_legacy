import React from 'react';
import { BodyLong, Heading, Modal, Panel } from '@navikt/ds-react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import './TilgjengelighetserklaeringModal.less';
import { AnalyticsCategory } from 'utils/analytics/analytics';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const TilgjengelighetserklaeringsModal = (props: Props) => {
    return (
        <Modal
            open={props.isOpen}
            className={'decorator-wrapper tilgjengelighetserklaering__modal'}
            aria-label={'Tilgjengelighet'}
            onClose={props.onClose}
            style={{ overlay: { backgroundColor: 'rgba(50, 65, 79, 0.8)' } }}
        >
            <Modal.Content>
                <Panel>
                    <Heading spacing size="medium" level="2">
                        Tilgjengelighet
                    </Heading>
                    <BodyLong spacing>
                        Nav.no har mange målgrupper og brukere som skal ha like muligheter til tjenester og informasjon
                        på nettsidene, uavhengig av brukernes funksjonsevne.
                    </BodyLong>
                    <LenkeMedSporing
                        analyticsEventArgs={{ category: AnalyticsCategory.Footer, action: 'TODO: endre action' }}
                        href="TODO: legg inn riktig lenke"
                    >
                        Hvordan jobber NAV med Universell utforming
                    </LenkeMedSporing>
                </Panel>
                <Panel>
                    <Heading spacing size="small" level="3">
                        Tilgjengelighetserklæringer:
                    </Heading>
                    <BodyLong spacing>
                        <LenkeMedSporing
                            analyticsEventArgs={{ category: AnalyticsCategory.Footer, action: 'TODO: endre action' }}
                            href="https://uustatus.no/nn"
                        >
                            Generell tilgjengelighetserklæring for hele nav.no
                        </LenkeMedSporing>
                    </BodyLong>

                    <LenkeMedSporing
                        analyticsEventArgs={{ category: AnalyticsCategory.Footer, action: 'TODO: endre action' }}
                        href="TODO: legg inn riktig lenke"
                    >
                        Meld inn uu feil
                    </LenkeMedSporing>
                </Panel>
            </Modal.Content>
        </Modal>
    );
};

export default TilgjengelighetserklaeringsModal;
