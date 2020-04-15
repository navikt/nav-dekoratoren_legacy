import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'utils/bem';
import NavLogoFooter from 'ikoner/meny/NavLogoFooter';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import { MenyNode } from 'store/reducers/menu-duck';
import FooterLenker from '../../Lenker';
import './FooterBottom.less';

const FooterBottom = () => {
    const cls = BEMHelper('menylinje-bottom');
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const [personvernNode, settPersonvernNode] = useState<MenyNode>();

    useEffect(() => {
        const noder = getLanguageNode(language, data);
        if (noder && !personvernNode) {
            settPersonvernNode(findNode(noder, 'Personvern'));
        }
    }, [data, personvernNode]);

    return (
        <section className={cls.className}>
            <div className="bottom-innhold">
                <div className="bottom-logo">
                    <NavLogoFooter
                        width="65"
                        height="65"
                        classname={cls.element('svg')}
                    />
                </div>
                <div className="bottom-lenker">
                    <Normaltekst className="bottom-tekst">
                        <Tekst id="footer-arbeids-og-veldferdsetaten" />
                    </Normaltekst>
                    <ul className="bottom-lenke">
                        <FooterLenker node={personvernNode} />
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FooterBottom;
