import React from 'react';
import { useSelector } from 'react-redux';
import { Status } from 'api/api';
import { AppState } from 'store/reducers';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import HovedmenyDesktopInnhold from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyDesktopInnhold';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/knapper/hovedmeny-knapp/HovedmenyKnapp';

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

export const HovedmenyDesktop = ({ kbNavMainState }: Props) => {
    const { arbeidsflate, menyPunkter, language, isOpen } = useSelector(
        stateSelector
    );

    const hovedmenyPunkter = getHovedmenyNode(
        menyPunkter.data,
        language,
        arbeidsflate
    );

    // Hide empty menues
    if (menyPunkter.status === Status.OK && !hovedmenyPunkter?.hasChildren) {
        return null;
    }

    return (
        <div className={'media-tablet-desktop'}>
            <HovedmenyKnapp id={desktopHovedmenyKnappId} />
            <EkspanderbarMeny
                isOpen={isOpen}
                classname={classname}
                id={classname}
            >
                {menyPunkter.status === Status.OK ? (
                    <HovedmenyDesktopInnhold
                        arbeidsflate={arbeidsflate}
                        isOpen={isOpen}
                        language={language}
                        menyPunkter={hovedmenyPunkter}
                        kbNavMainState={kbNavMainState}
                    />
                ) : (
                    <Spinner
                        tekstId={'meny-loading'}
                        className={isOpen ? 'spinner-container--active' : ''}
                    />
                )}
            </EkspanderbarMeny>
        </div>
    );
};
