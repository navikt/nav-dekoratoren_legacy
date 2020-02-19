import React, { useEffect, useState } from 'react';
import BEMHelper, { BEMWrapper } from '../../../../../../utils/bem';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import Toppseksjon from './topp-seksjon/Toppseksjon';
import BunnSeksjon from './bunn-seksjon/BunnSeksjon';
import './MenyUinnlogget.less';
import { MenyUinnloggetHovedseksjon } from './hoved-seksjon/Hovedseksjon';
import KbNav, { NaviGraphData, NaviGroup, NaviNode } from '../keyboard-navigation/kb-navigation';
import { matchMediaPolyfill } from '../../../../../../utils/matchMediaPolyfill';
import { AppState } from '../../../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { finnArbeidsflate } from '../../../../../../reducer/arbeidsflate-duck';

interface Props {
    classname: string;
    menyLenker: MenySeksjon;
    isOpen: boolean;
}

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const kbNaviGroup = NaviGroup.DesktopHeaderDropdown;
const kbRootIndex = { col: 0, row: 0, sub: 0 };
const kbIdMap = {
    [KbNav.getKbId(kbNaviGroup, kbRootIndex)]: 'decorator-meny-toggleknapp-desktop',
};

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

const MenyUinnlogget = (props: Props) => {
    const { classname, menyLenker, isOpen } = props;
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();

    const { arbeidsflate, language } = useSelector(stateSelector);
    const settArbeidsflateFunc = () => dispatch(finnArbeidsflate());

    const matchMedia = matchMediaPolyfill;
    const mqlDesktop = matchMedia('(min-width: 1024px)');
    const mqlTablet = matchMedia('(min-width: 896px)');

    const [kbNaviGraph, setKbNaviGraph] = useState<NaviGraphData>();
    const [kbNaviNode, setKbNaviNode] = useState<NaviNode>(null);

    useEffect(() => {
        const updateNaviGraph = () => {
            const colSetup = getColSetup(cls);
            const updatedNaviGraph = KbNav.getNaviGraphData(kbNaviGroup, kbRootIndex, colSetup, kbIdMap);
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
            const freshNaviGraph = KbNav.getNaviGraphData(kbNaviGroup, kbRootIndex, colSetup, kbIdMap);
            setKbNaviGraph(freshNaviGraph);
            setKbNaviNode(freshNaviGraph.rootNode);
        };

        if (isOpen) {
            makeNewNaviGraph();
        }
    }, [isOpen, menyLenker, arbeidsflate]);

    return (
        <div className={cls.element('meny-uinnlogget')}>
            <Toppseksjon
                classname={classname}
                arbeidsflate={arbeidsflate}
            />
            <MenyUinnloggetHovedseksjon
                menyLenker={menyLenker}
                classname={classname}
                isOpen={isOpen}
            />
            <BunnSeksjon
                classname={classname}
                language={language}
                arbeidsflate={arbeidsflate}
                settArbeidsflateFunc={settArbeidsflateFunc}
            />
        </div>
    );
};

export default MenyUinnlogget;
