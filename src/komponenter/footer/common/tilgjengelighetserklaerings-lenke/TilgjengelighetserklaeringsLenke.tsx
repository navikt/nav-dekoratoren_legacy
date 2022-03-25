import React, { useState } from 'react';
import { BodyShort, Link } from '@navikt/ds-react';
import TilgjengelighetserklaeringsModal from '../tilgjengelighetserklaerings-modal/TilgjengelighetserklaeringsModal';

export const TilgjengelighetserklaeringsLenke = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        // analyticsEvent({
        //     category: AnalyticsCategory.Footer,
        //     action: `kontakt/del-skjerm-open`,
        // });
        setIsOpen(true);
    };

    const closeModal = () => {
        // analyticsEvent({
        //     category: AnalyticsCategory.Footer,
        //     action: `kontakt/del-skjerm-close`,
        // });
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
