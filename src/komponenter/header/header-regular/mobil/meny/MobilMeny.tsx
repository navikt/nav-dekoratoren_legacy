import React, { useState } from 'react';
import BEMHelper from 'utils/bem';
import Undermeny from './innhold/Undermeny';
import Hovedmeny from './innhold/Hovedmeny';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import { dataInitState } from 'store/reducers/menu-duck';
import './MobilMeny.less';

interface Props {
    classname: string;
}

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
});

const MobilMeny = (props: Props) => {
    const { meny, language, arbeidsflate } = useSelector(stateSelector);
    const initLenker = getHovedmenyNode(meny.data, language, arbeidsflate) || dataInitState;
    const [lenker, settLenker] = useState(initLenker.children[0]);
    const { classname } = props;
    const menyClass = BEMHelper(classname);

    return (
        <>
            <Hovedmeny className={menyClass.className} settLenker={settLenker} />
            <Undermeny className={menyClass.className} lenker={lenker} />
        </>
    );
};

export default MobilMeny;
