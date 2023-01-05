import React from 'react';
import { useSelector } from 'react-redux';
import { Status } from 'api/api';
import { AppState } from 'store/reducers';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapp/hovedmeny-knapp/HovedmenyKnapp';
import { HovedmenyInnhold } from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyInnhold';
import { KbNavGroup } from '../../../../../utils/keyboard-navigation/kb-navigation';
import { HovedmenyInnholdSmall } from './HovedmenyInnholdSmall';

const classname = 'desktop-hovedmeny';
export const desktopHovedmenyKnappId = 'desktop-hovedmeny-knapp-id';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    menyPunkter: state.menypunkt,
    language: state.language.language,
    isOpen: state.dropdownToggles.hovedmeny,
});

type Props = {
    kbNavMainState: KbNavMain;
};

export const Hovedmeny = ({ kbNavMainState }: Props) => {
    const { arbeidsflate, menyPunkter, language, isOpen } = useSelector(stateSelector);

    const hovedmenyPunkter = getHovedmenyNode(menyPunkter.data, language, arbeidsflate);

    // Hide empty menues
    if (menyPunkter.status === Status.OK && !hovedmenyPunkter?.hasChildren) {
        return null;
    }

    const props = {
        arbeidsflate,
        isOpen,
        language,
        menyPunkter: hovedmenyPunkter,
        kbNavMainState: kbNavMainState,
    };

    const isSmallMenu = hovedmenyPunkter && hovedmenyPunkter.children?.length <= 2;

    return (
        <div className={'media-tablet-desktop'}>
            <HovedmenyKnapp id={desktopHovedmenyKnappId} menuId={KbNavGroup.Hovedmeny} />
            <EkspanderbarMeny isOpen={isOpen} classname={classname} id={classname}>
                {menyPunkter.status === Status.OK ? (
                    isSmallMenu ? (
                        <HovedmenyInnholdSmall {...props} />
                    ) : (
                        <HovedmenyInnhold {...props} />
                    )
                ) : (
                    <Spinner tekstId={'meny-loading'} />
                )}
            </EkspanderbarMeny>
        </div>
    );
};

export default Hovedmeny;
