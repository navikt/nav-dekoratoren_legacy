import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Heading } from '@navikt/ds-react';
import { MenyNode } from 'store/reducers/menu-duck';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import { LinksLoader } from '../../../common/content-loaders/LinkLoader';
import FooterLenker from 'komponenter/footer/common/Lenker';
import { Locale } from 'store/reducers/language-duck';

type FooterToppKolonnerProps = {
    firstNode: number;
    numberOfNodes: number;
};

const FooterToppKolonner = (props: FooterToppKolonnerProps) => {
    const lastNode = props.firstNode + props.numberOfNodes;
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const context = useSelector((state: AppState) => state.arbeidsflate.status);
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

export default FooterToppKolonner;
