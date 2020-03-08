import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BEMHelper, { BEMWrapper } from '../../../../../../utils/bem';
import { finnArbeidsflate } from '../../../../../../reducer/arbeidsflate-duck';
import { MenuValue } from '../../../../../../utils/meny-storage-utils';
import { MenyNode } from '../../../../../../reducer/menu-duck';
import { Language } from '../../../../../../reducer/language-duck';
import KbNav, {
    NaviGroup,
    NodeEdge,
} from '../../../../../../utils/keyboard-navigation/kb-navigation';
import { matchMedia } from '../../../../../../utils/match-media-polyfill';
import { Toppseksjon } from './topp-seksjon/Toppseksjon';
import { Bunnseksjon } from './bunn-seksjon/Bunnseksjon';
import { Hovedseksjon } from './hoved-seksjon/Hovedseksjon';
import { AppState } from '../../../../../../reducer/reducer';

type Props = {
    classname: string;
    arbeidsflate: MenuValue;
    language: Language;
    menyLenker: MenyNode | undefined;
    isOpen: boolean;
};

const getColSetup = (cls: BEMWrapper): Array<number> => {
    const getNumCols = (element: HTMLElement) =>
        parseInt(
            window.getComputedStyle(element).getPropertyValue('--num-cols'),
            10
        );

    const toppSeksjonCols = 1;
    const hovedSeksjonColsFallback = 4;
    const bunnSeksjonColsFallback = 3;

    const hovedSeksjonElement = document.getElementsByClassName(
        cls.element('hoved-seksjon')
    )[0] as HTMLElement;
    const hovedSeksjonCols =
        (hovedSeksjonElement && getNumCols(hovedSeksjonElement)) ||
        hovedSeksjonColsFallback;

    const bunnSeksjonElement = document.getElementsByClassName(
        cls.element('bunn-seksjon')
    )[0] as HTMLElement;
    const bunnSeksjonCols =
        (bunnSeksjonElement && getNumCols(bunnSeksjonElement)) ||
        bunnSeksjonColsFallback;

    return [toppSeksjonCols, hovedSeksjonCols, bunnSeksjonCols];
};

export const HovedmenyDropdown = (props: Props) => {
    const { arbeidsflate, classname, language, menyLenker, isOpen } = props;

    const dispatch = useDispatch();
    const kbNode = useSelector(
        (state: AppState) => state.keyboardNodes.hovedmeny
    );

    const cls = BEMHelper(classname);

    const settArbeidsflate = () => dispatch(finnArbeidsflate());

    const mqlDesktop = matchMedia('(min-width: 1440px)');
    const mqlTablet = matchMedia('(min-width: 1024px)');

    const kbNaviGroup = NaviGroup.DesktopHovedmeny;
    const kbRootIndex = { col: 0, row: 0, sub: 0 };

    useEffect(() => {
        const cleanUp = () => {
            mqlDesktop.removeEventListener('change', updateNaviGraph);
            mqlTablet.removeEventListener('change', updateNaviGraph);
            if (kbNode) {
                kbNode[NodeEdge.Bottom] = kbNode;
            }
        };

        const updateNaviGraph = () => {
            const colSetup = getColSetup(cls);
            const naviGraph = KbNav.getNaviGraphData(
                kbNaviGroup,
                kbRootIndex,
                colSetup
            );
            if (kbNode && naviGraph.rootNode) {
                kbNode[NodeEdge.Bottom] = naviGraph.rootNode;
                naviGraph.rootNode[NodeEdge.Top] = kbNode;
            }
        };

        if (!isOpen) {
            cleanUp();
            return;
        }

        mqlDesktop.addEventListener('change', updateNaviGraph);
        mqlTablet.addEventListener('change', updateNaviGraph);
        return cleanUp;
    }, [isOpen]);

    useEffect(() => {
        const makeNewNaviGraph = () => {
            const colSetup = getColSetup(cls);
            const naviGraph = KbNav.getNaviGraphData(
                kbNaviGroup,
                kbRootIndex,
                colSetup
            );
            if (kbNode && naviGraph.rootNode) {
                kbNode[NodeEdge.Bottom] = naviGraph.rootNode;
                naviGraph.rootNode[NodeEdge.Top] = kbNode;
            }
        };

        if (isOpen) {
            makeNewNaviGraph();
        }
    }, [isOpen, menyLenker, arbeidsflate]);

    if (!menyLenker) {
        return null;
    }

    return (
        <div className={cls.element('dropdown')}>
            <Toppseksjon classname={classname} arbeidsflate={arbeidsflate} />
            <Hovedseksjon
                menyLenker={menyLenker}
                classname={classname}
                isOpen={isOpen}
            />
            <Bunnseksjon
                classname={classname}
                language={language}
                arbeidsflate={arbeidsflate}
                settArbeidsflate={settArbeidsflate}
            />
        </div>
    );
};

export default HovedmenyDropdown;
