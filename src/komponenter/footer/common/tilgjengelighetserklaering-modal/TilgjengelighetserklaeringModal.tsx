import React, { useEffect, useState } from 'react';
import { BodyLong, Heading, Modal, Panel } from '@navikt/ds-react';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import style from './TilgjengelighetserklaeringModal.module.scss';
import { AnalyticsCategory } from 'utils/analytics/analytics';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const TilgjengelighetserklaeringsModal = (props: Props) => {
    const [parent, setParent] = useState<HTMLElement>();

    useEffect(() => {
        const parent = document.getElementById('decorator-footer-inner') as HTMLElement;
        setParent(parent);
    }, []);

    return (
        <Modal
            open={props.isOpen}
            className={style.modal}
            overlayClassName="decorator-wrapper"
            aria-labelledby="tilgjengelighet-modal-heading"
            onClose={props.onClose}
            style={{ overlay: { backgroundColor: 'rgba(50, 65, 79, 0.8)' } }}
            parentSelector={parent ? () => parent : undefined}
        >
            <Modal.Content>
                <Panel>
                    <Heading spacing size="medium" level="2" id="tilgjengelighet-modal-heading">
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
