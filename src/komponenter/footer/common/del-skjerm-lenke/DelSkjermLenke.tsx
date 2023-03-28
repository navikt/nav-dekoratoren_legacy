import React, { useId, useState } from 'react';
import classNames from "classnames";
import { Link } from '@navikt/ds-react';
import { Monitor } from '@navikt/ds-icons';
import Tekst from 'tekster/finn-tekst';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';
import { AnalyticsCategory, analyticsEvent } from 'utils/analytics/analytics';

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
            <Link
                onClick={openModal}
                className={classNames(style.delSkjermLenke, "globalLenkeFooter")}
                href="#"
            >
                <Tekst id="footer-del-skjerm" />
                <Monitor title="monitor-ikon" titleId={`decorator-${useId()}`} aria-hidden />
            </Link>
            {isOpen && <DelSkjermModal isOpen={isOpen} onClose={closeModal} />}
        </>
    );
};
