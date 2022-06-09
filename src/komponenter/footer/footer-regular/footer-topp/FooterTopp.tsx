import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Heading } from '@navikt/ds-react';
import Tekst from 'tekster/finn-tekst';
import { Up } from '@navikt/ds-icons';
import LenkeMedIkon from 'komponenter/footer/common/lenke-med-ikon/LenkeMedIkon';
import { AppState } from 'store/reducers';
import { MenyNode } from 'store/reducers/menu-duck';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import BEMHelper from 'utils/bem';
import Arbeidsflatevalg from './arbeidsflatevalg/Arbeidsflatevalg';
import { LinksLoader } from '../../../common/content-loaders/LinkLoader';
import FooterLenker from 'komponenter/footer/common/Lenker';
import { Locale } from 'store/reducers/language-duck';
import './FooterTopp.less';

const FooterTopp = () => {
    const cls = BEMHelper('menylinje-topp');
    const { language } = useSelector((state: AppState) => state.language);
    const context = useSelector((state: AppState) => state.arbeidsflate.status);
    const { data } = useSelector((state: AppState) => state.menypunkt);

    const [columnsNode, settColumnsNode] = useState<MenyNode>();
    useEffect(() => {
        const languageNode = getLanguageNode(language, data);
        const isLanguageNorwegian = language === Locale.BOKMAL || language === Locale.NYNORSK;

        if (languageNode) {
            const footerNode = findNode(languageNode, 'Footer');
            if (footerNode) {
                const columnsNode = findNode(footerNode, 'Columns');
                if (columnsNode) {
                    if (isLanguageNorwegian) {
                        settColumnsNode(findNode(columnsNode, context));
                    } else {
                        settColumnsNode(columnsNode);
                    }
                }
            }
        }
    }, [language, context, data, settColumnsNode]);

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
            <div className="topp-kolonner">
                <div className="menylenker-seksjon til-toppen">
                    <div className="til-toppen-innhold">
                        <LenkeMedIkon
                            onClick={scrollToTop}
                            tekst={<Tekst id="footer-til-toppen" />}
                            ikon={<Up />}
                            venstrestiltIkon={true}
                            id="footer-til-toppen"
                        />
                    </div>
                </div>
                {columnsNode
                    ? columnsNode.children.map((columnNode, i) => (
                          <div key={i} className={`menylenker-seksjon ${!i ? 'venstre' : i === 2 ? 'hoyre' : 'midt'}`}>
                              <Heading level="2" size="small" className="menylenker-overskrift">
                                  {columnNode.displayName}
                              </Heading>
                              <ul>
                                  <FooterLenker node={columnNode} />
                              </ul>
                          </div>
                      ))
                    : [...Array(3)].map((_, index) => (
                          <div
                              className={`menylenker-seksjon ${!index ? 'venstre' : index === 2 ? 'hoyre' : 'midt'}`}
                              key={index}
                          >
                              <LinksLoader id={`footer-link-loader-${index}`} />
                          </div>
                      ))}
                <Arbeidsflatevalg />
            </div>
        </div>
    );
};

export default FooterTopp;
