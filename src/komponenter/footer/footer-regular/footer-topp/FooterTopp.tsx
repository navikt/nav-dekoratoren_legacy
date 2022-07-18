import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tekst from 'tekster/finn-tekst';
import { Up } from '@navikt/ds-icons';
import LenkeMedIkon from 'komponenter/footer/common/lenke-med-ikon/LenkeMedIkon';
import { AppState } from 'store/reducers';
import { MenyNode } from 'store/reducers/menu-duck';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import BEMHelper from 'utils/bem';
import FooterLenker from 'komponenter/footer/common/Lenker';
import { DelSkjermLenke } from 'komponenter/footer/common/del-skjerm-lenke/DelSkjermLenke';
import FooterToppKolonner from './FooterToppKolonner';
import './FooterTopp.less';

const FooterTopp = () => {
    const cls = BEMHelper('menylinje-topp');
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const [personvernNode, settPersonvernNode] = useState<MenyNode>();
    const { PARAMS } = useSelector((state: AppState) => state.environment);

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !personvernNode) {
            settPersonvernNode(findNode(noder, 'Personvern'));
        }
    }, [data, personvernNode]);

    const scrollToTop = (event: React.MouseEvent) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        (document.getElementById('top-element') as HTMLElement)?.focus();
    };

    return (
        <div className={cls.className}>
            <div className="topp-kontainer">
                <div className="menylenker-seksjon til-toppen">
                    <LenkeMedIkon
                        onClick={scrollToTop}
                        tekst={<Tekst id="footer-til-toppen" />}
                        ikon={<Up />}
                        venstrestiltIkon={true}
                        id="footer-til-toppen"
                    />
                </div>
                <div className="topp-kolonner">
                    <div className="venstre">
                        <FooterToppKolonner firstNode={0} numberOfNodes={1} />
                    </div>
                    <div className="midt">
                        <FooterToppKolonner firstNode={1} numberOfNodes={2} />
                    </div>
                    <div className="høyre">
                        <FooterToppKolonner firstNode={3} numberOfNodes={1} />
                        <ul className={cls.element('personvern-lenker')}>
                            <FooterLenker node={personvernNode} />
                            {PARAMS.SHARE_SCREEN && <DelSkjermLenke />}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterTopp;
