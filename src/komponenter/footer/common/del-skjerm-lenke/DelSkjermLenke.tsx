import { BodyShort } from '@navikt/ds-react';
import LenkeMedIkon from '../lenke-med-ikon/LenkeMedIkon';
import Tekst from 'tekster/finn-tekst';
import { Monitor } from '@navikt/ds-icons';
import React, { useState } from 'react';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';
import BEMHelper from 'utils/bem';

import './DelSkjermLenke.less';

export const DelSkjermLenke = () => {
    const cls = BEMHelper('del-skjerm-lenke');

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
            <li className={cls.className}>
                <BodyShort>
                    <LenkeMedIkon
                        onClick={openModal}
                        tekst={<Tekst id="footer-del-skjerm" />}
                        ikon={<Monitor className={cls.element('ikon')} />}
                        className="lenke"
                    />
                </BodyShort>
            </li>
            {isOpen && <DelSkjermModal isOpen={isOpen} onClose={closeModal} />}
        </>
    );
};
