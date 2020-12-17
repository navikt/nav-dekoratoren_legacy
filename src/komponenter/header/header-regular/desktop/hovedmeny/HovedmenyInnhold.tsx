import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { KbNavConfig } from 'utils/keyboard-navigation/kb-navigation-setup';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { matchMedia } from 'utils/match-media-polyfill';
import { MenuValue } from 'utils/meny-storage-utils';
import { Locale } from 'store/reducers/language-duck';
import { MenyNode } from 'store/reducers/menu-duck';
import { Toppseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/topp-seksjon/Toppseksjon';
import { Hovedseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/hoved-seksjon/Hovedseksjon';
import { Bunnseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/bunn-seksjon/Bunnseksjon';

const classname = 'desktop-hovedmeny';

const nodeGroup = KbNavGroup.Hovedmeny;

const widthBreakpoint = 64;
const mqlWidthBreakpoint = matchMedia(`(min-width: ${widthBreakpoint}em)`);
const numColsSmallScreen = 3;
const numColsLargeScreen = 4;

/* Todo: skriv om dette da det ikke gir mening med relative units. *16 er brukt for å gjøre det likt som
 da det var pixler */
const getColsFromScreenWidth = () =>
    window.innerWidth >= widthBreakpoint * 16 ? numColsLargeScreen : numColsSmallScreen;

type Props = {
    arbeidsflate: MenuValue;
    menyPunkter?: MenyNode;
    language: Locale;
    isOpen: boolean;
    kbNavMainState: KbNavMain;
};

export const HovedmenyInnhold = ({ kbNavMainState, arbeidsflate, menyPunkter, language, isOpen }: Props) => {
    const kbConfig = configForNodeGroup[nodeGroup];
    const [kbNavConfig, setKbNavConfig] = useState<KbNavConfig>(kbConfig);
    const [menuNumCols, setMenuNumCols] = useState(getColsFromScreenWidth());
    useKbNavSub(kbNavConfig, kbNavMainState, isOpen);

    useEffect(() => {
        const updateMaxCols = () => {
            setMenuNumCols(getColsFromScreenWidth());
        };
        mqlWidthBreakpoint.addEventListener('change', updateMaxCols);
        return () => {
            mqlWidthBreakpoint.removeEventListener('change', updateMaxCols);
        };
    }, []);

    useEffect(() => {
        setKbNavConfig({
            ...kbNavConfig,
            maxColsPerRow: [1, menuNumCols, 3],
        });
    }, [menuNumCols, menyPunkter, arbeidsflate]);

    if (!menyPunkter) {
        return null;
    }

    return (
        <div className={classname}>
            <Toppseksjon classname={classname} />
            <Hovedseksjon menyLenker={menyPunkter} classname={classname} numCols={menuNumCols} />
            <Bunnseksjon classname={classname} language={language} arbeidsflate={arbeidsflate} />
        </div>
    );
};

export default HovedmenyInnhold;
