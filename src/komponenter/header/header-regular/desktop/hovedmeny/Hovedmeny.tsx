import React from 'react';
import { useSelector } from 'react-redux';
import { Status } from 'api/api';
import { AppState } from 'store/reducers';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapp/hovedmeny-knapp/HovedmenyKnapp';
import HovedmenyInnhold from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyInnhold';

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

    return (
        <div className={'media-tablet-desktop'}>
            <HovedmenyKnapp id={desktopHovedmenyKnappId} />
            <EkspanderbarMeny isOpen={isOpen} classname={classname} id={classname}>
                {(() => {
                    if (menyPunkter.status === Status.OK) {
                        return (
                            <HovedmenyInnhold
                                arbeidsflate={arbeidsflate}
                                isOpen={isOpen}
                                language={language}
                                menyPunkter={hovedmenyPunkter}
                                kbNavMainState={kbNavMainState}
                            />
                        );
                    } else {
                        return (
                            <Spinner tekstId={'meny-loading'} className={isOpen ? 'spinner-container--active' : ''} />
                        );
                    }
                })()}
            </EkspanderbarMeny>
        </div>
    );
};

export default Hovedmeny;
