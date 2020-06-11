import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { KbNavConfig } from 'utils/keyboard-navigation/kb-navigation-setup';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { matchMedia } from 'utils/match-media-polyfill';
import { getHovedmenyMaxColsPerRow } from 'utils/keyboard-navigation/kb-navigation-setup';
import { MenuValue } from 'utils/meny-storage-utils';
import { Language } from 'store/reducers/language-duck';
import { MenyNode } from 'store/reducers/menu-duck';
import { Toppseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/topp-seksjon/Toppseksjon';
import { Hovedseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/hoved-seksjon/Hovedseksjon';
import { Bunnseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/bunn-seksjon/Bunnseksjon';

const classname = 'desktop-hovedmeny';

const nodeGroup = KbNavGroup.Hovedmeny;
const mqlScreenWidth = matchMedia('(min-width: 1024px)');

type Props = {
    arbeidsflate: MenuValue;
    menyPunkter?: MenyNode;
    language: Language;
    isOpen: boolean;
    kbNavMainState: KbNavMain;
};

export const HovedmenyDesktop = ({
    kbNavMainState,
    arbeidsflate,
    menyPunkter,
    language,
    isOpen,
}: Props) => {
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
    }, [menyPunkter, arbeidsflate]);

    if (!menyPunkter) {
        return null;
    }

    return (
        <div className={classname}>
            <Toppseksjon classname={classname} />
            <Hovedseksjon
                menyLenker={menyPunkter}
                classname={classname}
                isOpen={isOpen}
            />
            <Bunnseksjon
                classname={classname}
                language={language}
                arbeidsflate={arbeidsflate}
            />
        </div>
    );
};

export default HovedmenyDesktop;
