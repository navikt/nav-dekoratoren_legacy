import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MenyNode } from 'store/reducers/menu-duck';
import { AppState } from 'store/reducers';
import { findNode, getLanguageNode } from 'utils/meny-storage-utils';
import FooterLenker from 'komponenter/footer/common/Lenker';
import { ChatbotWrapper } from 'komponenter/footer/chatbot/ChatbotWrapper';
import { TilgjengelighetserklaeringLenke } from 'komponenter/footer/common/tilgjengelighetserklaering-lenke/TilgjengelighetserklaeringLenke';
import { DelSkjermLenke } from '../common/del-skjerm-lenke/DelSkjermLenke';
import style from './FooterSimple.module.scss';

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
        <>
            <div className={style.container}>
                <ChatbotWrapper />
                <div className={style.content}>
                    <ul className={style.personvernLenker}>
                        <FooterLenker node={personvernNode} />
                        <TilgjengelighetserklaeringLenke />
                        {PARAMS.SHARE_SCREEN && <DelSkjermLenke />}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default FooterSimple;
