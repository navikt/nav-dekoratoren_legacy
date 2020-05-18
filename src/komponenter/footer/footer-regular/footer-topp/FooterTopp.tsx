import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import PilOppHvit from 'ikoner/meny/PilOppHvit';
import LenkeMedIkon from 'komponenter/footer/common/lenke-med-ikon/LenkeMedIkon';
import { AppState } from 'store/reducers';
import { MenyNode } from 'store/reducers/menu-duck';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import BEMHelper from 'utils/bem';
import FooterArbeidsflatevalg from './footer-arbeidsflatevalg/FooterArbeidsflatevalg';
import { LinksLoader } from '../../../common/content-loaders/LinkLoader';
import FooterLenker from '../../Lenker';
import { Language } from 'store/reducers/language-duck';
import './FooterTopp.less';

const FooterTopp = () => {
    const cls = BEMHelper('menylinje-topp');
    const { language } = useSelector((state: AppState) => state.language);
    const context = useSelector((state: AppState) => state.arbeidsflate.status);
    const { data } = useSelector((state: AppState) => state.menypunkt);

    const [columnsNode, settColumnsNode] = useState<MenyNode>();
    useEffect(() => {
        const languageNode = getLanguageNode(language, data);
        if (languageNode) {
            const footerNode = findNode(languageNode, 'Footer');
            if (footerNode) {
                const columnsNode = findNode(footerNode, 'Columns');
                if (columnsNode) {
                    if (language === Language.NORSK) {
                        settColumnsNode(findNode(columnsNode, context));
                    } else {
                        settColumnsNode(columnsNode);
                    }
                }
            }
        }
    }, [context, data, settColumnsNode]);

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
        <section className={cls.className}>
            <div className="topp-kolonner">
                <div className="menylenker-seksjon til-toppen">
                    <div className="til-toppen-innhold">
                        <LenkeMedIkon
                            href=""
                            onClick={scrollToTop}
                            tekst={<Tekst id="footer-til-toppen" />}
                            ikon={
                                <PilOppHvit
                                    style={{ height: '18px', width: '18px' }}
                                />
                            }
                            venstrestiltIkon={true}
                        />
                    </div>
                </div>
                {columnsNode
                    ? columnsNode.children.map((columnNode, i) => (
                          <div
                              key={i}
                              className={`menylenker-seksjon ${
                                  !i ? 'venstre' : i === 2 ? 'hoyre' : 'midt'
                              }`}
                          >
                              <Undertittel
                                  className="menylenker-overskrift"
                                  id="venstrelenker-overskrift"
                              >
                                  {columnNode.displayName}
                              </Undertittel>
                              <ul aria-labelledby="venstrelenker-overskrift">
                                  <FooterLenker node={columnNode} />
                              </ul>
                          </div>
                      ))
                    : [...Array(3)].map((_, index) => (
                          <div
                              className={`menylenker-seksjon ${
                                  !index
                                      ? 'venstre'
                                      : index === 2
                                      ? 'hoyre'
                                      : 'midt'
                              }`}
                              key={index}
                          >
                              <ul aria-labelledby="hoyrelenker-overskrift">
                                  <LinksLoader id="kontakt-loader" />
                              </ul>
                          </div>
                      ))}
                <FooterArbeidsflatevalg />
            </div>
        </section>
    );
};

export default FooterTopp;
