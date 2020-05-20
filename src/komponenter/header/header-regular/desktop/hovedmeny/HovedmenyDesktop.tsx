import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { Status } from 'api/api';
import { AppState } from 'store/reducers';
import { getHovedmenyNode } from 'utils/meny-storage-utils';
import Tekst from 'tekster/finn-tekst';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { GACategory, gaEvent } from 'utils/google-analytics';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import { HovedmenyVisning } from './hovedmeny-visning/HovedmenyVisning';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import HamburgerIkon from 'komponenter/header/header-regular/common/meny-knapper/ikoner/hamburger-ikon/HamburgerIkon';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapper/MenylinjeKnapp';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { KbNavConfig } from 'utils/keyboard-navigation/kb-navigation-setup';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { matchMedia } from 'utils/match-media-polyfill';

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

const getMaxColsPerRow = (): Array<number> => {
    const getNumColsFromCss = (element: HTMLElement) =>
        parseInt(
            window.getComputedStyle(element).getPropertyValue('--num-cols'),
            10
        );

    const toppSeksjonCols = 1;

    const hovedSeksjonElement = document.getElementsByClassName(
        `${classname}__hoved-seksjon`
    )[0] as HTMLElement;
    const hovedSeksjonCols =
        (hovedSeksjonElement && getNumColsFromCss(hovedSeksjonElement)) || 1;

    const bunnSeksjonElement = document.getElementsByClassName(
        `${classname}__bunn-seksjon`
    )[0] as HTMLElement;
    const bunnSeksjonCols =
        (bunnSeksjonElement && getNumColsFromCss(bunnSeksjonElement)) || 1;

    return [toppSeksjonCols, hovedSeksjonCols, bunnSeksjonCols];
};

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
            maxColsPerRow: getMaxColsPerRow(),
        });

    useEffect(() => {
        const cleanUp = () => {
            mqlScreenWidth.removeEventListener('change', updateMaxCols);
        };

        mqlScreenWidth.addEventListener('change', updateMaxCols);
        return cleanUp;
    }, []);

    useEffect(() => {
        updateMaxCols();
    }, [hovedmenyPunkter, arbeidsflate]);

    const toggleMenu = () => {
        gaEvent({
            context: arbeidsflate,
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleHovedmeny());
    };

    const knapp = (
        <MenylinjeKnapp
            onClick={toggleMenu}
            isOpen={isOpen}
            classname={classname}
            id={desktopHovedmenyKnappId}
            ariaLabel={'Hovedmenyknapp'}
        >
            <HamburgerIkon isOpen={isOpen} />
            <Undertittel>
                <Tekst id="meny-knapp" />
            </Undertittel>
        </MenylinjeKnapp>
    );

    // Hide empty menues
    if (menyPunkter.status === Status.OK && !hovedmenyPunkter?.hasChildren) {
        return null;
    }

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
