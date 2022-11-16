import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import { Varselvisning } from './varselvisning/Varselvisning';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { VarslerKnapp } from './varsler-knapp/VarslerKnapp';
import SlideToClose from 'komponenter/header/header-regular/mobil/meny/innhold/utils/SlideToClose';

import style from './Varsler.module.scss';

export const varslerDropdownId = 'varsler-dropdown';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
});

type Props = {
    kbNavMainState: KbNavMain;
};

export const Varsler = ({ kbNavMainState }: Props) => {
    const { isOpen } = useSelector(stateSelector);
    useKbNavSub(configForNodeGroup[KbNavGroup.Varsler], kbNavMainState, isOpen);

    return (
        <>
            <VarslerKnapp />
            <EkspanderbarMeny
                classname={style.varslerDropdown}
                id={varslerDropdownId}
                isOpen={isOpen}
                classnameInnhold={style.varslerInnhold}
            >
                <SlideToClose>
                    <Varselvisning setKbId={true} />
                </SlideToClose>
            </EkspanderbarMeny>
        </>
    );
};

export default Varsler;
