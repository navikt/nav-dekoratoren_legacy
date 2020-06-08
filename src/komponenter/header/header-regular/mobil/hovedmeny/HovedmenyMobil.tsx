import React from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Status } from 'api/api';
import { getHovedmenyNode, getMinsideMenyNode } from 'utils/meny-storage-utils';
import MobilVisningsmeny from './meny-dropdown/MobilVisningsmeny';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { dataInitState } from 'store/reducers/menu-duck';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapper/hovedmeny-knapp/HovedmenyKnapp';

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    hovedIsOpen: state.dropdownToggles.hovedmeny,
    underIsOpen: state.dropdownToggles.undermeny,
    varselIsOpen: state.dropdownToggles.varsler,
});

const classname = 'mobilmeny';
export const mobilHovedmenyKnappId = `${classname}-knapp-id`;
export const mobilSokInputId = `${classname}-sok-input`;

const HovedmenyMobil = () => {
    const dispatch = useDispatch();
    const {
        meny,
        language,
        arbeidsflate,
        underIsOpen,
        hovedIsOpen,
        varselIsOpen,
    } = useSelector(stateSelector);

    const menutoggle = () => {
        gaEvent({
            category: GACategory.Header,
            action: `meny-${underIsOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleUndermenyVisning());
    };

    const hovedmenutoggle = () => {
        gaEvent({
            context: arbeidsflate,
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleHovedmeny());
    };

    const isOpen = hovedIsOpen || underIsOpen || varselIsOpen;

    const menyKnapp = (
        <HovedmenyKnapp
            isOpen={hovedIsOpen}
            onClick={hovedmenutoggle}
            hovedmenyClassname={classname}
            id={mobilHovedmenyKnappId}
        />
    );

    const dropdownInnhold =
        meny.status === Status.OK ? (
            <MobilVisningsmeny
                classname={classname}
                menyLenker={
                    getHovedmenyNode(meny.data, language, arbeidsflate) ||
                    dataInitState
                }
                minsideLenker={
                    getMinsideMenyNode(meny.data, language) || dataInitState
                }
                menuIsOpen={hovedIsOpen}
                underMenuIsOpen={underIsOpen}
                varslerIsOpen={varselIsOpen}
                togglemenu={menutoggle}
                togglehovedmenu={hovedmenutoggle}
                lang={language}
            />
        ) : (
            <Spinner
                tekstId={'meny-loading'}
                className={isOpen ? 'spinner-container--active' : ''}
            />
        );

    return (
        <>
            <EkspanderbarMeny
                classname={classname}
                isOpen={isOpen}
                menyKnapp={menyKnapp}
                id={classname}
            >
                {dropdownInnhold}
            </EkspanderbarMeny>
        </>
    );
};

export default HovedmenyMobil;
