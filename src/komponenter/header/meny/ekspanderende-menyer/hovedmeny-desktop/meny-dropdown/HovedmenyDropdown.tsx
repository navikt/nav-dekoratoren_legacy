import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BEMHelper, { BEMWrapper } from '../../../../../../utils/bem';
import { finnArbeidsflate } from '../../../../../../reducer/arbeidsflate-duck';
import { MenuValue } from '../../../../../../utils/meny-storage-utils';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import { Language } from '../../../../../../reducer/language-duck';
import KbNav, { NaviGraphData, NaviGroup, NaviNode } from '../../../../../../utils/keyboard-navigation/kb-navigation';
import { matchMediaPolyfill } from '../../../../../../utils/matchMediaPolyfill';
import { Toppseksjon } from './topp-seksjon/Toppseksjon';
import { Bunnseksjon } from './bunn-seksjon/Bunnseksjon';
import { Hovedseksjon } from './hoved-seksjon/Hovedseksjon';

const getColSetup = (cls: BEMWrapper): Array<number> => {
    const getNumCols = (element: HTMLElement) => (
        parseInt(window.getComputedStyle(element).getPropertyValue('--num-cols'), 10)
    );

    const menyKnappCols = 1;
    const toppSeksjonCols = 1;
    const hovedSeksjonColsFallback = 4;
    const bunnSeksjonColsFallback = 3;

    const hovedSeksjonElement = document.getElementsByClassName(cls.element('hoved-seksjon'))[0] as HTMLElement;
    const hovedSeksjonCols = hovedSeksjonElement && getNumCols(hovedSeksjonElement) || hovedSeksjonColsFallback;

    const bunnSeksjonElement = document.getElementsByClassName(cls.element('bunn-seksjon'))[0] as HTMLElement;
    const bunnSeksjonCols = bunnSeksjonElement && getNumCols(bunnSeksjonElement) || bunnSeksjonColsFallback;

    return [menyKnappCols, toppSeksjonCols, hovedSeksjonCols, bunnSeksjonCols];
};

type Props = {
    classname: string,
    arbeidsflate: MenuValue,
    language: Language,
    menyLenker: MenySeksjon,
    isOpen: boolean
}

export const HovedmenyDropdown = (props: Props) => {
    const { arbeidsflate, classname, language, menyLenker, isOpen } = props;

    const cls = BEMHelper(classname);
    const dispatch = useDispatch();

    const settArbeidsflate = () => dispatch(finnArbeidsflate());

    const matchMedia = matchMediaPolyfill;
    const mqlDesktop = matchMedia('(min-width: 1024px)');
    const mqlTablet = matchMedia('(min-width: 896px)');

    const [kbNaviGraph, setKbNaviGraph] = useState<NaviGraphData>();
    const [kbNaviNode, setKbNaviNode] = useState<NaviNode>(null);

    const kbNaviGroup = NaviGroup.DesktopHeaderDropdown;
    const kbRootIndex = { col: 0, row: 0, sub: 0 };
    const kbIdMap = {
        [KbNav.getKbId(kbNaviGroup, kbRootIndex)]: cls.element('decorator-meny-toggleknapp'),
    };

    useEffect(() => {
        const removeListeners = () => {
            document.removeEventListener('keydown', kbHandler);
            document.removeEventListener('focusin', focusHandler);
            mqlDesktop.removeEventListener('change', updateNaviGraph);
            mqlTablet.removeEventListener('change', updateNaviGraph);
        };

        const updateNaviGraph = () => {
            const colSetup = getColSetup(cls);
            const updatedNaviGraph = KbNav.getNaviGraphData(kbNaviGroup, kbRootIndex, colSetup, kbIdMap);
            const currentNodeId = kbNaviNode?.id;
            const newNode = (currentNodeId && updatedNaviGraph.nodeMap[currentNodeId]) || updatedNaviGraph.rootNode;
            setKbNaviGraph(updatedNaviGraph);
            setKbNaviNode(newNode);
        };

        if (!isOpen) {
            removeListeners();
            return;
        }

        const kbHandler = KbNav.kbHandler(kbNaviNode, kbNaviGroup, setKbNaviNode);
        const focusHandler = KbNav.focusHandler(kbNaviNode, kbNaviGraph, setKbNaviNode);

        document.addEventListener('focusin', focusHandler);
        document.addEventListener('keydown', kbHandler);
        mqlDesktop.addEventListener('change', updateNaviGraph);
        mqlTablet.addEventListener('change', updateNaviGraph);
        return removeListeners;
    }, [isOpen, kbNaviNode]);

    useEffect(() => {
        const makeNewNaviGraph = () => {
            const colSetup = getColSetup(cls);
            const freshNaviGraph = KbNav.getNaviGraphData(kbNaviGroup, kbRootIndex, colSetup, kbIdMap);
            setKbNaviGraph(freshNaviGraph);
            setKbNaviNode(freshNaviGraph.rootNode);
        };

        if (isOpen) {
            makeNewNaviGraph();
        }
    }, [isOpen, menyLenker, arbeidsflate]);

    return (
        <div className={cls.element('dropdown')}>
            <Toppseksjon
                classname={classname}
                arbeidsflate={arbeidsflate}
            />
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

export default HovedmenyDropdown
