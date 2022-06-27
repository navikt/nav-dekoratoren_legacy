import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from 'komponenter/header/header-regular/common/meny-lenker/MenyLenkeSeksjon';
import BEMHelper from 'utils/bem';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { MenySeksjoner } from 'komponenter/header/header-regular/common/meny-seksjoner/MenySeksjoner';
import { MenyLayout } from 'komponenter/header/header-regular/common/meny-seksjoner/MenySeksjoner';
import { matchMedia } from 'utils/match-media-polyfill';

const layoutWidthBreakpoint = 1440;
const mqlWidthBreakpoint = matchMedia(`(min-width: ${layoutWidthBreakpoint}px)`);
const layoutHeightBreakpoint = 960;
const mqlHeightBreakpoint = matchMedia(`(min-height: ${layoutHeightBreakpoint}px)`);

const getLayoutFromWindowSize = () =>
    window.innerWidth >= layoutWidthBreakpoint && window.innerHeight >= layoutHeightBreakpoint ? 'grid' : 'mosaic';

interface Props {
    menyLenker: MenyNode;
    classname: string;
    numCols: number;
}

export const Hovedseksjon = ({ menyLenker, classname, numCols }: Props) => {
    const cls = BEMHelper(classname);
    const [layout, setLayout] = useState<MenyLayout>(getLayoutFromWindowSize());

    useEffect(() => {
        const updateLayout = () => {
            setLayout(getLayoutFromWindowSize());
        };
        mqlWidthBreakpoint.addEventListener('change', updateLayout);
        mqlHeightBreakpoint.addEventListener('change', updateLayout);
        return () => {
            mqlWidthBreakpoint.removeEventListener('change', updateLayout);
            mqlHeightBreakpoint.removeEventListener('change', updateLayout);
        };
    }, []);

    return (
        <div className={cls.element('hoved-seksjon')} data-testid={'hovedseksjon'}>
            <MenySeksjoner numCols={numCols} layout={layout}>
                {menyLenker.children.map((menygruppe, index) => (
                    <MenyLenkeSeksjon
                        menygruppe={menygruppe}
                        colIndex={index}
                        rowIndex={1}
                        kbNodeGroup={KbNavGroup.Hovedmeny}
                        key={menygruppe.displayName}
                    />
                ))}
            </MenySeksjoner>
        </div>
    );
};
