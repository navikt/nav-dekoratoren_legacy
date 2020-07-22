import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { MenyNode } from 'store/reducers/menu-duck';
import { AppState } from 'store/reducers';
import Tekst from 'tekster/finn-tekst';
import DelSkjerm from 'ikoner/del-skjerm/DelSkjerm';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import BEMHelper from 'utils/bem';

import DelSkjermModal from '../common/del-skjerm-modal/DelSkjermModal';
import LenkeMedIkon from '../common/lenke-med-ikon/LenkeMedIkon';
import FooterLenker from 'komponenter/footer/common/Lenker';

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
        gaEvent({
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-open`,
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        gaEvent({
            category: GACategory.Footer,
            action: `kontakt/del-skjerm-close`,
        });
        setIsOpen(false);
    };

    return (
        <Fragment>
            <div className={cls.element('container')}>
                <div className={cls.element('content')}>
                    <ul className={cls.element('personvern-lenker')}>
                        <FooterLenker node={personvernNode} />
                    </ul>
                    <div className={cls.element('right-col')}>
                        <LenkeMedIkon
                            className={cls.element('del-skjerm')}
                            onClick={openModal}
                            tekst={<Tekst id="footer-del-skjerm" />}
                            ikon={
                                <DelSkjerm
                                    style={{ height: '24px', width: '24px' }}
                                />
                            }
                        />
                        <div id={'chatbot-dock'} />
                    </div>
                    {isOpen && (
                        <DelSkjermModal isOpen={isOpen} onClose={closeModal} />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default FooterSimple;
