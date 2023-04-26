import React, { useState } from 'react';
import BEMHelper from 'utils/bem';
import { MobilUndermeny } from './innhold/undermeny/MobilUndermeny';
import { MobilHovedmenyInnhold } from './innhold/hovedmeny/MobilHovedmenyInnhold';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import { dataInitState } from 'store/reducers/menu-duck';
import './MobilMeny.scss';

type Props = {
    classPrefix: string;
};

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
});

export const MobilMeny = (props: Props) => {
    const { meny, language, arbeidsflate } = useSelector(stateSelector);
    const initLenker = getHovedmenyNode(meny.data, language, arbeidsflate) || dataInitState;
    const [lenker, settLenker] = useState(initLenker.children[0]);
    const menyClass = BEMHelper(props.classPrefix);

    return (
        <>
            <MobilHovedmenyInnhold classPrefix={menyClass.className} settLenker={settLenker} />
            <MobilUndermeny classPrefix={menyClass.className} lenker={lenker} />
        </>
    );
};
