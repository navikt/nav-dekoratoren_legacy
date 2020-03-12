import React, { useEffect, useState } from 'react';
import BEMHelper, { BEMWrapper } from '../../../../../../utils/bem';
import { MenuValue } from '../../../../../../utils/meny-storage-utils';
import { MenyNode } from '../../../../../../reducer/menu-duck';
import { Language } from '../../../../../../reducer/language-duck';
import { NodeGroup } from '../../../../../../utils/keyboard-navigation/kb-navigation';
import { matchMedia } from '../../../../../../utils/match-media-polyfill';
import { Toppseksjon } from './topp-seksjon/Toppseksjon';
import { Bunnseksjon } from './bunn-seksjon/Bunnseksjon';
import { Hovedseksjon } from './hoved-seksjon/Hovedseksjon';
import { KbNavigationWrapper } from '../../../../../../utils/keyboard-navigation/KbNavigationWrapper';
import {
    configForNodeGroup,
    KbNavConfig,
} from '../../../../../../utils/keyboard-navigation/kb-navigation-setup';

type Props = {
    classname: string;
    arbeidsflate: MenuValue;
    language: Language;
    menyLenker: MenyNode | undefined;
    isOpen: boolean;
};

const getMaxColsPerSection = (cls: BEMWrapper): Array<number> => {
    const getNumColsFromCss = (element: HTMLElement) =>
        parseInt(
            window.getComputedStyle(element).getPropertyValue('--num-cols'),
            10
        );

    const toppSeksjonCols = 1;

    const hovedSeksjonElement = document.getElementsByClassName(
        cls.element('hoved-seksjon')
    )[0] as HTMLElement;
    const hovedSeksjonCols =
        (hovedSeksjonElement && getNumColsFromCss(hovedSeksjonElement)) || 1;

    const bunnSeksjonElement = document.getElementsByClassName(
        cls.element('bunn-seksjon')
    )[0] as HTMLElement;
    const bunnSeksjonCols =
        (bunnSeksjonElement && getNumColsFromCss(bunnSeksjonElement)) || 1;

    return [toppSeksjonCols, hovedSeksjonCols, bunnSeksjonCols];
};

const nodeGroup = NodeGroup.Hovedmeny;
const mqlDesktop = matchMedia('(min-width: 1440px)');
const mqlTablet = matchMedia('(min-width: 1024px)');

export const HovedmenyVisning = (props: Props) => {
    const { arbeidsflate, classname, language, menyLenker, isOpen } = props;

    const cls = BEMHelper(classname);

    const [kbNavConfig, setKbNavConfig] = useState<KbNavConfig>();
    const updateMaxCols = () =>
        setKbNavConfig({
            ...configForNodeGroup[nodeGroup],
            maxColsPerRow: getMaxColsPerSection(cls),
        });

    useEffect(() => {
        const cleanUp = () => {
            mqlDesktop.removeEventListener('change', updateMaxCols);
            mqlTablet.removeEventListener('change', updateMaxCols);
        };

        mqlDesktop.addEventListener('change', updateMaxCols);
        mqlTablet.addEventListener('change', updateMaxCols);
        return cleanUp;
    }, []);

    useEffect(() => {
        updateMaxCols();
    }, [menyLenker, arbeidsflate]);

    if (!menyLenker) {
        return null;
    }

    return (
        <KbNavigationWrapper
            config={kbNavConfig || configForNodeGroup[nodeGroup]}
            isEnabled={isOpen}
        >
            <div className={cls.element('dropdown')}>
                <Toppseksjon classname={classname} />
                <Hovedseksjon
                    menyLenker={menyLenker}
                    classname={classname}
                    isOpen={isOpen}
                />
                <Bunnseksjon
                    classname={classname}
                    language={language}
                    arbeidsflate={arbeidsflate}
                />
            </div>
        </KbNavigationWrapper>
    );
};

export default HovedmenyVisning;
