import React from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Status } from 'api/api';
import { getHovedmenyNode, getMinsideMenyNode } from 'utils/meny-storage-utils';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { dataInitState } from 'store/reducers/menu-duck';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapp/hovedmeny-knapp/HovedmenyKnapp';
import loadable from '@loadable/component';
import { useState } from 'react';
import { useEffect } from 'react';
import { mobilmenyKnappId } from 'utils/id-repo';

const MobilVisningsmeny = loadable(() =>
    import('./meny-dropdown/MobilVisningsmeny')
);

const classname = 'mobilmeny';

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    hovedIsOpen: state.dropdownToggles.hovedmeny,
    underIsOpen: state.dropdownToggles.undermeny,
    varselIsOpen: state.dropdownToggles.varsler,
});

export const HovedmenyMobil = () => {
    const dispatch = useDispatch();
    const {
        meny,
        language,
        arbeidsflate,
        underIsOpen,
        hovedIsOpen,
        varselIsOpen,
    } = useSelector(stateSelector);

    const [renderContent, setRenderContent] = useState(false);
    const menyLoaded = meny.status === Status.OK;
    const isOpen = hovedIsOpen || underIsOpen || varselIsOpen;

    useEffect(() => {
        const loadedAndOpened = renderContent || (menyLoaded && hovedIsOpen);
        setRenderContent(loadedAndOpened);
    }, [menyLoaded, hovedIsOpen]);

    const hovedmenyPunkter = getHovedmenyNode(
        meny.data,
        language,
        arbeidsflate
    );

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

    const dropdownInnhold = menyLoaded ? (
        <MobilVisningsmeny
            classname={classname}
            menyLenker={hovedmenyPunkter || dataInitState}
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
        <div className={'media-sm-mobil'}>
            <HovedmenyKnapp id={mobilmenyKnappId} />
            <EkspanderbarMeny
                isOpen={hovedIsOpen}
                classname={classname}
                id={classname}
            >
                {renderContent && dropdownInnhold}
            </EkspanderbarMeny>
        </div>
    );
};
