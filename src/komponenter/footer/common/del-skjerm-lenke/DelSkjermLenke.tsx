import { BodyShort } from '@navikt/ds-react';

import LenkeMedIkon from '../lenke-med-ikon/LenkeMedIkon';
import Tekst from 'tekster/finn-tekst';
import DelSkjerm from 'ikoner/del-skjerm/DelSkjerm';
import React, { useState } from 'react';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';

export const DelSkjermLenke = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        analyticsEvent({
            eventName: 'Modal åpnet',
            category: AnalyticsCategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        analyticsEvent({
            eventName: 'Modal lukket',
            category: AnalyticsCategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setIsOpen(false);
    };

    return (
        <>
            <li>
                <BodyShort>
                    <LenkeMedIkon
                        onClick={openModal}
                        tekst={<Tekst id="footer-del-skjerm" />}
                        ikon={<DelSkjerm style={{ height: '24px', width: '24px', stroke: '#0067c5' }} />}
                    />
                </BodyShort>
            </li>
            {isOpen && <DelSkjermModal isOpen={isOpen} onClose={closeModal} />}
        </>
    );
};
