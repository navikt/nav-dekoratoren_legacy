import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { LinkLoader } from 'komponenter/common/content-loaders/LinkLoader';
import LenkeListe from 'komponenter/common/lenke-liste/LenkeListe';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import { MenyNode } from 'store/reducers/menu-duck';
import DelSkjerm from 'ikoner/del-skjerm/DelSkjerm';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import BEMHelper from 'utils/bem';

import LenkeMedIkon from '../lenke-med-ikon/LenkeMedIkon';
import FooterLenker from '../FooterLenker';
import DelSkjermModal from '../del-skjerm-modal/DelSkjermModal';

import './FooterSimple.less';

const cls = BEMHelper('simple-footer');

const FooterSimple = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useSelector((state: AppState) => state.language);
    const { data } = useSelector((state: AppState) => state.menypunkt);
    const [personvernNode, settPersonvernNode] = useState<MenyNode>();

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
        setIsOpen(true);
    };

    const closeModal = () => {
        triggerGaEvent({
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setIsOpen(false);
    };

    return (
        <Fragment>
            <div className={cls.element('container')}>
                <div className={cls.element('content')}>
                    <LenkeListe
                        data={
                            personvernNode ? personvernNode.children : undefined
                        }
                        listElement={(props) => <FooterLenker {...props} />}
                        linkLoader={<LinkLoader id="personvern-loader" />}
                    />
                    <LenkeMedIkon
                        className={cls.element('del-skjerm')}
                        onClick={openModal}
                        tekst={<Tekst id="footer-del-skjerm" />}
                        ikon={<DelSkjerm height={20} width={20} />}
                    />
                    {isOpen && (
                        <DelSkjermModal isOpen={isOpen} onClose={closeModal} />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default FooterSimple;
