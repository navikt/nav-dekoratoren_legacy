import { BodyShort } from '@navikt/ds-react';
import { Link } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { Monitor } from '@navikt/ds-icons';
import React, { useState } from 'react';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';

// @ts-ignore
import style from './DelSkjermLenke.module.scss';

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
            <li className={style.delSkjermLenke}>
                <BodyShort>
                    <Link onClick={openModal} className="globalLenkeFooter" href="#">
                        <Tekst id="footer-del-skjerm" />
                        <Monitor />
                    </Link>
                </BodyShort>
            </li>
            {isOpen && <DelSkjermModal isOpen={isOpen} onClose={closeModal} />}
        </>
    );
};
