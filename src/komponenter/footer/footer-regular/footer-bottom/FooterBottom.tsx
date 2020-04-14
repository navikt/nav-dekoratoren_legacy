import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';

import { genererLenkerTilUrl } from 'utils/Environment';
import BEMHelper from 'utils/bem';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import NavLogoFooter from 'ikoner/meny/NavLogoFooter';
import DelSkjerm from 'ikoner/del-skjerm/DelSkjerm';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import LenkeMedIkon from 'komponenter/footer/lenke-med-ikon/LenkeMedIkon';
import DelSkjermModal from 'komponenter/footer/del-skjerm-modal/DelSkjermModal';

import { FooterLenke, lenkerBunn } from '../FooterLenker';

import './footerBottom.less';

const FooterBottom = () => {
    const cls = BEMHelper('footer-bottom-content');
    const [visDelSkjermModal, setVisDelSkjermModal] = useState(false);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const [lenker, setLenker] = useState<FooterLenke[]>(lenkerBunn);

    useEffect(() => {
        setLenker(genererLenkerTilUrl(XP_BASE_URL, lenkerBunn));
    }, []);

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
        <section className="menylinje-bottom">
            <div className={cls.className}>
                <NavLogoFooter
                    width="65"
                    height="65"
                    classname={cls.element('bottom-logo')}
                />
                <div className={cls.element('bottom-lenker')}>
                    <div>
                        <Normaltekst className="bottom-tekst">
                            <Tekst id="footer-arbeids-og-veldferdsetaten" />
                        </Normaltekst>
                        <ul>
                            {lenker.map(lenke => (
                                <li key={lenke.lenketekst}>
                                    <Normaltekst>
                                        <LenkeMedGA
                                            href={lenke.url}
                                            gaEventArgs={{
                                                category: GACategory.Footer,
                                                action: `bunn/${lenke.lenketekst}`,
                                                label: lenke.url,
                                            }}
                                        >
                                            {lenke.lenketekst}
                                        </LenkeMedGA>
                                    </Normaltekst>
                                </li>
                            ))}
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
            </div>
        </section>
    );
};

export default FooterBottom;
