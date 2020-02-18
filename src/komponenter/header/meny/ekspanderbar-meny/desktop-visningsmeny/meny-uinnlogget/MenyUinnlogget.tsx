import React, { useEffect, useState } from 'react';
import BEMHelper, { BEMWrapper } from '../../../../../../utils/bem';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import Toppseksjon from './topp-seksjon/Toppseksjon';
import BunnSeksjon from './bunn-seksjon/BunnSeksjon';
import './MenyUinnlogget.less';
import { MenyUinnloggetHovedseksjon } from './hoved-seksjon/Hovedseksjon';
import KbNav, { NaviGraphData, NaviGroup, NaviNode } from '../keyboard-navigation/kb-navigation';
import { matchMediaPolyfill } from '../../../../../../utils/matchMediaPolyfill';

interface Props {
    classname: string;
    menyLenker: MenySeksjon;
    isOpen: boolean;
}

const kbNaviGroup = NaviGroup.DesktopHeaderDropdown;
const kbRootIndex = {x: 0, y: 0, sub: 0};

const getColSetup = (cls: BEMWrapper): Array<number> => {
    const getNumCols = (element: HTMLElement) =>
        parseInt(window.getComputedStyle(element).getPropertyValue('--num-cols'), 10);

    const menyKnappCols = 1;
    const toppSeksjonCols = 1;

    const hovedSeksjonElement = document.getElementsByClassName(cls.element('hoved-seksjon-tema'))[0] as HTMLElement;
    const hovedSeksjonCols = hovedSeksjonElement && getNumCols(hovedSeksjonElement) || 5;

    const bunnSeksjonElement = document.getElementsByClassName(cls.element('bunn-seksjon-col'))[0] as HTMLElement;
    const bunnSeksjonCols = bunnSeksjonElement && getNumCols(bunnSeksjonElement) || 3;

    return [menyKnappCols, toppSeksjonCols, hovedSeksjonCols, bunnSeksjonCols];
};

const MenyUinnlogget = (props: Props) => {
    const {classname, menyLenker, isOpen} = props;
    const cls = BEMHelper(classname);

    const matchMedia = matchMediaPolyfill;
    const mqlDesktop = matchMedia('(min-width: 1024px');
    const mqlTablet = matchMedia('(min-width: 896px)');

    const [kbNaviGraph, setKbNaviGraph] = useState<NaviGraphData>();
    const [kbNaviNode, setKbNaviNode] = useState<NaviNode>(null);

    useEffect(() => {
        const updateNaviGraph = () => {
            const updatedNaviGraph = KbNav.getNaviGraphData(kbNaviGroup, kbRootIndex, getColSetup(cls));
            const currentNodeId = kbNaviNode?.id;
            const newNode = (currentNodeId && updatedNaviGraph.nodeMap[currentNodeId]) || updatedNaviGraph.rootNode;
            setKbNaviGraph(updatedNaviGraph);
            setKbNaviNode(newNode);
        };

        const kbHandler = KbNav.kbHandler(kbNaviNode, kbNaviGroup, setKbNaviNode);
        const focusHandler = KbNav.focusHandler(kbNaviNode, kbNaviGraph, setKbNaviNode);

        document.addEventListener('focusin', focusHandler);
        document.addEventListener('keydown', kbHandler);
        mqlDesktop.addEventListener('change', updateNaviGraph);
        mqlTablet.addEventListener('change', updateNaviGraph);
        return () => {
            document.removeEventListener('keydown', kbHandler);
            document.removeEventListener('focusin', focusHandler);
            mqlDesktop.removeEventListener('change', updateNaviGraph);
            mqlTablet.removeEventListener('change', updateNaviGraph);
        };
    }, [kbNaviNode]);

    useEffect(() => {
        const makeNewNaviGraph = () => {
            const colSetup = getColSetup(cls);
            const freshNaviGraph = KbNav.getNaviGraphData(kbNaviGroup, kbRootIndex, colSetup);
            setKbNaviGraph(freshNaviGraph);
            setKbNaviNode(freshNaviGraph.rootNode);
        };

        if (isOpen) {
            makeNewNaviGraph();
        }
    }, [isOpen, menyLenker]);

    return (
        <div className={cls.element('meny-uinnlogget')}>
            <Toppseksjon
                classname={classname}
                arbeidsflate={menyLenker.displayName}
            />
            <MenyUinnloggetHovedseksjon
                menyLenker={menyLenker}
                classname={classname}
                isOpen={isOpen}
            />
            <BunnSeksjon
                classname={classname}
            />
        </div>
    );
};

export default MenyUinnlogget;
