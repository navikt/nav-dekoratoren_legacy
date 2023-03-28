import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tekst from 'tekster/finn-tekst';
import { Link } from '@navikt/ds-react';
import { Up } from '@navikt/ds-icons';
import { AppState } from 'store/reducers';
import { MenyNode } from 'store/reducers/menu-duck';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import FooterLenker from 'komponenter/footer/common/Lenker';
import { DelSkjermLenke } from 'komponenter/footer/common/del-skjerm-lenke/DelSkjermLenke';
import FooterToppKolonner from './FooterToppKolonner';

import style from './FooterTopp.module.scss';

const FooterTopp = () => {
    const { language } = useSelector((state: AppState) => state.language);
    const context = useSelector((state: AppState) => state.arbeidsflate.status);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const [personvernNode, settPersonvernNode] = useState<MenyNode>();
    const { PARAMS } = useSelector((state: AppState) => state.environment);

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !personvernNode) {
            settPersonvernNode(findNode(noder, 'Personvern'));
        }
    }, [language, data, personvernNode]);

    const scrollToTop = (event: React.MouseEvent) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        (document.getElementById('top-element') as HTMLElement)?.focus();
    };

    const twoNodesInMiddle = language === 'nb' && context === 'privatperson';

    return (
        <div className={style.menylinjeTopp}>
            <div className={style.toppKontainer}>
                <div className={style.tilToppen}>
                    <Link onClick={scrollToTop} className="globalLenkeFooter" href="#" id="footer-til-toppen">
                        <Up title="pil-opp-ikon" titleId="footer-til-toppen-ikon" aria-hidden />
                        <Tekst id="footer-til-toppen" />
                    </Link>
                </div>
                <div className={style.toppKolonner}>
                    <div>
                        <FooterToppKolonner firstNode={0} numberOfNodes={1} />
                    </div>
                    <div>
                        <FooterToppKolonner firstNode={1} numberOfNodes={twoNodesInMiddle ? 2 : 1} />
                    </div>
                    <div>
                        <FooterToppKolonner firstNode={twoNodesInMiddle ? 3 : 2} numberOfNodes={1} />
                        <FooterLenker nodes={personvernNode} />
                        {PARAMS.SHARE_SCREEN && <DelSkjermLenke />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterTopp;
