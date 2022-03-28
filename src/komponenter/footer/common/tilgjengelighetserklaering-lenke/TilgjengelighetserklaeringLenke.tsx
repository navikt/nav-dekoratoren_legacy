import React, { useState } from 'react';
import { BodyShort, Link } from '@navikt/ds-react';
import TilgjengelighetserklaeringsModal from '../tilgjengelighetserklaering-modal/TilgjengelighetserklaeringModal';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics';

export const TilgjengelighetserklaeringsLenke = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        analyticsEvent({
            category: AnalyticsCategory.Footer,
            action: `tilgjengelighetserklaering-open`,
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        analyticsEvent({
            category: AnalyticsCategory.Footer,
            action: `tilgjengelighetserklaering-close`,
        });
        setIsOpen(false);
    };

    return (
        <>
            <li>
                <BodyShort>
                    <Link onClick={openModal} role="button">
                        <span>Tilgjengelighetserklæring</span>
                    </Link>
                </BodyShort>
            </li>
            <TilgjengelighetserklaeringsModal isOpen={isOpen} onClose={closeModal} />
        </>
    );
};
