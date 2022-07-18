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
import { LinksLoader } from '../../../common/content-loaders/LinkLoader';
import FooterLenker from 'komponenter/footer/common/Lenker';
import { Locale } from 'store/reducers/language-duck';
import { DelSkjermLenke } from 'komponenter/footer/common/del-skjerm-lenke/DelSkjermLenke';
import './FooterTopp.less';

const FooterTopp = () => {
    const cls = BEMHelper('menylinje-topp');
    const { language } = useSelector((state: AppState) => state.language);
    const context = useSelector((state: AppState) => state.arbeidsflate.status);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const [columnsNode, settColumnsNode] = useState<MenyNode>();
    const [personvernNode, settPersonvernNode] = useState<MenyNode>();
    const { PARAMS } = useSelector((state: AppState) => state.environment);

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

    type FooterToppKolonnerProps = {
        firstNode: number;
        numberOfNodes: number;
    };

    const FooterToppKolonner = (props: FooterToppKolonnerProps) => {
        const lastNode = props.firstNode + props.numberOfNodes;

        return (
            <>
                {columnsNode
                    ? columnsNode.children.slice(props.firstNode, lastNode).map((columnNode, i) => (
                          <div key={i} className={'menylenker-seksjon'}>
                              <Heading level="2" size="small" className="menylenker-overskrift">
                                  {columnNode.displayName}
                              </Heading>
                              <ul>
                                  <FooterLenker node={columnNode} />
                              </ul>
                          </div>
                      ))
                    : [...Array(props.numberOfNodes)].map((_, index) => (
                          <div className={'menylenker-seksjon'} key={index}>
                              <LinksLoader id={`footer-link-loader-${index}`} />
                          </div>
                      ))}
            </>
        );
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
