import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import { genererLenkerTilUrl } from 'utils/Environment';
import BEMHelper from 'utils/bem';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import NavLogoFooter from 'ikoner/meny/NavLogoFooter';
import DelSkjerm from 'ikoner/del-skjerm/DelSkjerm';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import { MenyNode } from 'store/reducers/menu-duck';
import FooterLenker from '../../Lenker';
import LenkeMedIkon from 'komponenter/footer/lenke-med-ikon/LenkeMedIkon';
import DelSkjermModal from 'komponenter/footer/del-skjerm-modal/DelSkjermModal';

import { FooterLenke, lenkerBunn } from '../FooterLenker';
import './FooterBottom.less';

import './footerBottom.less';

const FooterBottom = () => {
    const cls = BEMHelper('menylinje-bottom');
    const [visDelSkjermModal, setVisDelSkjermModal] = useState(false);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [lenker, setLenker] = useState<FooterLenke[]>(lenkerBunn);

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !personvernNode) {
            settPersonvernNode(findNode(noder, 'Personvern'));
        }
    }, [data, personvernNode]);

    const openModal = () => {
        triggerGaEvent({
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });
        setVisDelSkjermModal(true);
    };

    const closeModal = () => {
        triggerGaEvent({
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setVisDelSkjermModal(false);
    };

    return (
        <section className={cls.className}>
            <div className="bottom-logo">
                <NavLogoFooter
                    width="65"
                    height="65"
                    classname={cls.element('svg')}
                />
            </div>
            <div className="bottom-lenker">
                <div>
                    <Normaltekst className="bottom-tekst">
                        <Tekst id="footer-arbeids-og-veldferdsetaten" />
                    </Normaltekst>
                    <ul className="bottom-lenke">
                        <FooterLenker node={personvernNode} />
                    </ul>
                </div>
                <LenkeMedIkon
                    className={cls.element('del-skjerm')}
                    onClick={openModal}
                    tekst={<Tekst id="footer-del-skjerm" />}
                    ikon={<DelSkjerm height={24} width={24} />}
                />
            </div>
            {visDelSkjermModal && (
                <DelSkjermModal
                    isOpen={visDelSkjermModal}
                    onClose={closeModal}
                />
            )}
        </section>
    );
};

export default FooterBottom;
