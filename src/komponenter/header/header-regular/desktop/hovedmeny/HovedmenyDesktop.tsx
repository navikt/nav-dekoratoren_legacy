import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Status } from 'api/api';
import { AppState } from 'store/reducers';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import { HovedmenyVisning } from './hovedmeny-visning/HovedmenyVisning';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { KbNavConfig } from 'utils/keyboard-navigation/kb-navigation-setup';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { matchMedia } from 'utils/match-media-polyfill';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapper/hovedmeny-knapp/HovedmenyKnapp';
import { getHovedmenyMaxColsPerRow } from 'utils/keyboard-navigation/kb-navigation-setup';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    menyPunkter: state.menypunkt,
    language: state.language.language,
    isOpen: state.dropdownToggles.hovedmeny,
    sokIsOpen: state.dropdownToggles.sok,
});

const classname = 'desktop-hovedmeny';
export const desktopHovedmenyKnappId = 'desktop-hovedmeny-knapp-id';

const nodeGroup = KbNavGroup.Hovedmeny;
const mqlScreenWidth = matchMedia('(min-width: 1024px)');

type Props = {
    kbNavMainState: KbNavMain;
};

export const HovedmenyDesktop = ({ kbNavMainState }: Props) => {
    const dispatch = useDispatch();
    const { arbeidsflate, menyPunkter, language, isOpen } = useSelector(
        stateSelector
    );

    const hovedmenyPunkter = getHovedmenyNode(
        menyPunkter.data,
        language,
        arbeidsflate
    );

    const kbConfig = configForNodeGroup[nodeGroup];
    const [kbNavConfig, setKbNavConfig] = useState<KbNavConfig>(kbConfig);
    useKbNavSub(kbNavConfig, kbNavMainState, isOpen);

    const updateMaxCols = () =>
        setKbNavConfig({
            ...kbNavConfig,
            maxColsPerRow: getHovedmenyMaxColsPerRow(classname),
        });

    useEffect(() => {
        mqlScreenWidth.addEventListener('change', updateMaxCols);
        return () => {
            mqlScreenWidth.removeEventListener('change', updateMaxCols);
        };
    }, []);

    useEffect(() => {
        updateMaxCols();
    }, [hovedmenyPunkter, arbeidsflate]);

    // Hide empty menues
    if (menyPunkter.status === Status.OK && !hovedmenyPunkter?.hasChildren) {
        return null;
    }

    const toggleMenu = () => {
        gaEvent({
            context: arbeidsflate,
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleHovedmeny());
    };

    const knapp = (
        <HovedmenyKnapp
            isOpen={isOpen}
            onClick={toggleMenu}
            hovedmenyClassname={classname}
            id={desktopHovedmenyKnappId}
        />
    );

    return (
        <EkspanderbarMeny
            isOpen={isOpen}
            menyKnapp={knapp}
            classname={classname}
            id={classname}
        >
            {menyPunkter.status === Status.OK ? (
                <HovedmenyVisning
                    classname={classname}
                    arbeidsflate={arbeidsflate}
                    language={language}
                    menyLenker={hovedmenyPunkter}
                    isOpen={isOpen}
                />
            ) : (
                <Spinner tekstId={'meny-loading'} />
            )}
        </EkspanderbarMeny>
    );
};

export default HovedmenyDesktop;
