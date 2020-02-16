import React, { useEffect, useState } from 'react';
import BEMHelper, { BEMWrapper } from '../../../../../../utils/bem';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import Toppseksjon from './topp-seksjon/Toppseksjon';
import BunnSeksjon from './bunn-seksjon/BunnSeksjon';
import './MenyUinnlogget.less';
import { MenyUinnloggetHovedseksjon } from './hoved-seksjon/Hovedseksjon';
import { getNaviGraphData, NaviGraphData, NaviGroup, NaviNode, setFocus } from '../keyboard-navigation/kb-nav';

interface Props {
    classname: string;
    menyLenker: MenySeksjon;
    isOpen: boolean;
}

const kbNaviGroup = NaviGroup.DesktopHeaderDropdown;

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

const keycodeToArrowKey = (keycode: number) => {
    switch (keycode) {
        case 37:
            return 'ArrowLeft';
        case 38:
            return 'ArrowUp';
        case 39:
            return 'ArrowRight';
        case 40:
            return 'ArrowDown';
    }
    return null;
};

const MenyUinnlogget = (props: Props) => {


    const {classname, menyLenker, isOpen} = props;
    const cls = BEMHelper(classname);

    const [naviGraph, setNaviGraph] = useState<NaviGraphData>();
    const [kbNaviNode, _setKbNaviNode] = useState<NaviNode>();
    const setKbNaviNode = (node: NaviNode, focus = true) => {
        if (!node) {
            return;
        }
        _setKbNaviNode(node);
        focus && setFocus(kbNaviGroup, node);
    };

    useEffect(() => {
        const updateNaviGraph = () => {
            const freshNaviGraph = getNaviGraphData(kbNaviGroup, {x: 0, y: 0, sub: 0}, getColSetup(cls));
            const currentNodeId = kbNaviNode?.id;
            const newNode = (currentNodeId && freshNaviGraph.nodeMap[currentNodeId]) || freshNaviGraph.rootNode;
            setNaviGraph(freshNaviGraph);
            setKbNaviNode(newNode);
        };
        const kbHandler = (event: KeyboardEvent) => {
            const key = event.key || keycodeToArrowKey(event.keyCode);
            if (!kbNaviNode) {
                return;
            }
            switch (key) {
                case 'ArrowLeft':
                    setKbNaviNode(kbNaviNode.left);
                    break;
                case 'ArrowUp':
                    setKbNaviNode(kbNaviNode.up);
                    break;
                case 'ArrowRight':
                    setKbNaviNode(kbNaviNode.right);
                    break;
                case 'ArrowDown':
                    setKbNaviNode(kbNaviNode.down);
                    break;
                default:
                    return;
            }
            event.preventDefault();
        };
        const focusHandler = (event: FocusEvent) => {
            const id = (event.target as HTMLElement).id;
            if (!id || !naviGraph) {
                return;
            }

            const focusedNode = naviGraph.nodeMap[id];
            if (focusedNode) {
                setKbNaviNode(focusedNode)
            } else {
                setKbNaviNode(naviGraph.rootNode, false);
            }
        };

        document.addEventListener('focusin', focusHandler);
        document.addEventListener('keydown', kbHandler);
        window.addEventListener('resize', updateNaviGraph);
        return () => {
            document.removeEventListener('keydown', kbHandler);
            document.removeEventListener('focusin', focusHandler);
            window.removeEventListener('resize', updateNaviGraph);
        };
    }, [kbNaviNode]);

    useEffect(() => {
        if (isOpen) {
            const freshNaviGraph = getNaviGraphData(kbNaviGroup, {x: 0, y: 0, sub: 0}, getColSetup(cls));
            setNaviGraph(freshNaviGraph);
            setKbNaviNode(freshNaviGraph.rootNode);
        }
    }, [isOpen]);

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
