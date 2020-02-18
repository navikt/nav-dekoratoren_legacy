import React, { useEffect, useState } from 'react';
import BEMHelper, { BEMWrapper } from '../../../../../../utils/bem';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import Toppseksjon from './topp-seksjon/Toppseksjon';
import BunnSeksjon from './bunn-seksjon/BunnSeksjon';
import './MenyUinnlogget.less';
import { MenyUinnloggetHovedseksjon } from './hoved-seksjon/Hovedseksjon';
import KbNav, { NaviGraphData, NaviGroup, NaviNode } from '../keyboard-navigation/kb-navigation';
import { matchMediaPolyfill } from '../../../../../../utils/matchMediaPolyfill';
import { MenuValue } from '../../../../../../utils/meny-storage-utils';
import { AppState } from '../../../../../../reducer/reducer';
import { connect } from 'react-redux';
import { Language } from '../../../../../../reducer/language-duck';
import { Dispatch } from '../../../../../../redux/dispatch-type';
import { finnArbeidsflate } from '../../../../../../reducer/arbeidsflate-duck';

interface OwnProps {
    classname: string;
    menyLenker: MenySeksjon;
    isOpen: boolean;
}

interface StateProps {
    arbeidsflate: MenuValue,
    language: Language
}

interface DispatchProps {
    settArbeidsflateFunc: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const kbNaviGroup = NaviGroup.DesktopHeaderDropdown;
const kbRootIndex = {x: 0, y: 0, sub: 0};
const idMap = {
    [KbNav.getKbId(kbNaviGroup, kbRootIndex)]: 'decorator-meny-toggleknapp-desktop',
};

const getNumCols = (element: HTMLElement) => (
    parseInt(window.getComputedStyle(element).getPropertyValue('--num-cols'), 10)
);

const getColSetup = (cls: BEMWrapper): Array<number> => {
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

    // console.log(kbNaviGraph);

    useEffect(() => {
        const updateNaviGraph = () => {
            const colSetup = getColSetup(cls);
            const updatedNaviGraph = KbNav.getNaviGraphData(kbNaviGroup, kbRootIndex, colSetup, idMap);
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
            const freshNaviGraph = KbNav.getNaviGraphData(kbNaviGroup, kbRootIndex, colSetup, idMap);
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
                arbeidsflateNavn={menyLenker.displayName}
            />
            <MenyUinnloggetHovedseksjon
                menyLenker={menyLenker}
                classname={classname}
                isOpen={isOpen}
            />
            <BunnSeksjon
                classname={classname}
                language={props.language}
                arbeidsflate={props.arbeidsflate}
                settArbeidsflateFunc={props.settArbeidsflateFunc}
            />
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    settArbeidsflateFunc: () => dispatch(finnArbeidsflate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenyUinnlogget);
