import loadable from '@loadable/component';
import React from 'react';
import { useSelector } from 'react-redux';
import { Status } from 'api/api';
import { AppState } from 'store/reducers';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapp/hovedmeny-knapp/HovedmenyKnapp';
import { useState } from 'react';
import { useEffect } from 'react';

const HovedmenyDesktopInnhold = loadable(() =>
    import(
        'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyDesktopInnhold'
    )
);

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
    const [renderContent, setRenderContent] = useState(false);
    const menyLoaded = menyPunkter.status === Status.OK;

    useEffect(() => {
        const loadedAndOpened = renderContent || (menyLoaded && isOpen);
        setRenderContent(loadedAndOpened);
    }, [menyLoaded, isOpen]);

    const hovedmenyPunkter = getHovedmenyNode(
        menyPunkter.data,
        language,
        arbeidsflate
    );

    // Hide empty menues
    if (menyLoaded && !hovedmenyPunkter?.hasChildren) {
        return null;
    }

    const dropdownInnhold = menyLoaded ? (
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
    );

    return (
        <div className={'media-tablet-desktop'}>
            <HovedmenyKnapp id={desktopHovedmenyKnappId} />
            <EkspanderbarMeny
                isOpen={isOpen}
                classname={classname}
                id={classname}
            >
                {renderContent && dropdownInnhold}
            </EkspanderbarMeny>
        </div>
    );
};
