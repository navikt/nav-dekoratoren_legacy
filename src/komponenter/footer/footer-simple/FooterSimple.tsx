import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MenyNode } from 'store/reducers/menu-duck';
import { AppState } from 'store/reducers';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import BEMHelper from 'utils/bem';
import FooterLenker from 'komponenter/footer/common/Lenker';
import { ChatbotWrapper } from 'komponenter/footer/chatbot/ChatbotWrapper';
import { TilgjengelighetserklaeringsLenke } from 'komponenter/footer/common/tilgjengelighetserklaerings-lenke/TilgjengelighetserklaeringsLenke';
import { DelSkjermLenke } from '../common/del-skjerm-lenke/DelSkjermLenke';

import './FooterSimple.less';

const cls = BEMHelper('simple-footer');

const FooterSimple = () => {
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

    return (
        <Fragment>
            <div className={cls.element('container')}>
                <ChatbotWrapper />
                <div className={cls.element('content')}>
                    <ul className={cls.element('personvern-lenker')}>
                        <FooterLenker node={personvernNode} />
                        <TilgjengelighetserklaeringsLenke />
                        {PARAMS.SHARE_SCREEN && <DelSkjermLenke />}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default FooterSimple;
