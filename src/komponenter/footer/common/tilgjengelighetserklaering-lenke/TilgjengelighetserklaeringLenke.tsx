import React, { useState } from 'react';
import { BodyShort, Link } from '@navikt/ds-react';
import TilgjengelighetserklaeringModal from '../tilgjengelighetserklaering-modal/TilgjengelighetserklaeringModal';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics';

export const TilgjengelighetserklaeringLenke = () => {
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
                    <Link href="#!" onClick={openModal} role="button">
                        <span>Tilgjengelighetserklæring</span>
                    </Link>
                </BodyShort>
            </li>
            <TilgjengelighetserklaeringModal isOpen={isOpen} onClose={closeModal} />
        </>
    );
};
