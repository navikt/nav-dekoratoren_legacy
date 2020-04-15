import KbNav, {
    createKbNaviNode,
    createNaviGraph,
    getKbId,
    GraphData,
    KbIdMap,
    KbNaviNode,
    KbNaviNodeMap,
    NodeEdge,
    NodeGroup,
    NodeIndex,
    NodeSetterCallback,
} from './kb-navigation';
import { desktopHeaderLogoId } from '../../komponenter/header/meny/DesktopMenylinje';
import { desktopHovedmenyKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { desktopSokKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { desktopVarslerKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/varsler-dropdown-desktop/VarslerDropdown';
import { desktopMinsideKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';
import { Language } from '../../reducer/language-duck';
import { MenuValue } from '../meny-storage-utils';
import { Status } from '../../api/api';

export type KbNavConfig = {
    group: NodeGroup;
    rootIndex: NodeIndex;
    maxColsPerRow: Array<number>;
    parentNodeId: string;
    parentNodeEdge: NodeEdge;
    idMap?: KbIdMap;
};

type Handlers = {
    focusIn: (e: FocusEvent) => void;
    keyDown: (e: KeyboardEvent) => void;
};

const masterNode = createKbNaviNode(
    desktopHeaderLogoId,
    { col: 0, row: 1, sub: 0 },
    NodeGroup.HeaderMenylinje
);

export const initialMainGraph: GraphData = {
    group: masterNode.group,
    rootNode: masterNode,
    nodeMap: { [masterNode.id]: masterNode },
};

export const configForNodeGroup: { [key in NodeGroup]: KbNavConfig } = {
    [NodeGroup.HeaderMenylinje]: {
        group: NodeGroup.HeaderMenylinje,
        rootIndex: masterNode.index,
        maxColsPerRow: [3, 6],
        parentNodeId: desktopHeaderLogoId,
        parentNodeEdge: NodeEdge.Right,
    },
    [NodeGroup.Hovedmeny]: {
        group: NodeGroup.Hovedmeny,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [1, 4, 3],
        parentNodeId: desktopHovedmenyKnappId,
        parentNodeEdge: NodeEdge.Bottom,
    },
    [NodeGroup.Sok]: {
        group: NodeGroup.Sok,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [3],
        parentNodeId: desktopSokKnappId,
        parentNodeEdge: NodeEdge.Bottom,
        idMap: {
            [getKbId(NodeGroup.Sok, {
                col: 0,
                row: 0,
                sub: 0,
            })]: 'desktop-sok-input',
            [getKbId(NodeGroup.Sok, {
                col: 1,
                row: 0,
                sub: 0,
            })]: 'desktop-sok-reset-knapp',
            [getKbId(NodeGroup.Sok, {
                col: 2,
                row: 0,
                sub: 0,
            })]: 'desktop-sok-submit-knapp',
        },
    },
    [NodeGroup.Varsler]: {
        group: NodeGroup.Varsler,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [1, 1, 1],
        parentNodeId: desktopVarslerKnappId,
        parentNodeEdge: NodeEdge.Bottom,
    },
    [NodeGroup.MinsideMeny]: {
        group: NodeGroup.MinsideMeny,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [1, 3],
        parentNodeId: desktopMinsideKnappId,
        parentNodeEdge: NodeEdge.Bottom,
    },
};

export const addEventListenersAndReturnHandlers = (
    currentNode: KbNaviNode,
    nodeMap: KbNaviNodeMap,
    setCurrentNode: NodeSetterCallback,
    lukkAlleDropdowns: () => void
): Handlers => {
    const kbHandler = KbNav.kbHandler(
        currentNode,
        setCurrentNode,
        lukkAlleDropdowns
    );
    const focusHandler = KbNav.focusHandler(
        currentNode,
        nodeMap,
        setCurrentNode,
        kbHandler
    );
    document.addEventListener('focusin', focusHandler);
    document.addEventListener('keydown', kbHandler);

    return { focusIn: focusHandler, keyDown: kbHandler };
};

export const removeListeners = ({ focusIn, keyDown }: Handlers) => {
    document.removeEventListener('focusin', focusIn);
    document.removeEventListener('keydown', keyDown);
};

export const createHeaderMainGraph = (
    language: Language,
    arbeidsflate: MenuValue,
    menyStatus: Status,
    erInnlogget: boolean
) => {
    const hovedmenyEnabled =
        language !== Language.SAMISK && menyStatus === Status.OK;
    const varslerEnabled =
        arbeidsflate === MenuValue.PRIVATPERSON && erInnlogget;
    const minsideMenyEnabled =
        language === Language.NORSK &&
        menyStatus === Status.OK &&
        erInnlogget &&
        arbeidsflate !== MenuValue.SAMARBEIDSPARTNER;
    const arbeidsflatemenyEnabled = Language.NORSK;

    const group = NodeGroup.HeaderMenylinje;
    const rootIndex = configForNodeGroup[group].rootIndex;
    const idMap: KbIdMap = {};

    let colIndex = rootIndex.col;

    idMap[
        KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
    ] = desktopHeaderLogoId;

    if (hovedmenyEnabled) {
        idMap[
            KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
        ] = desktopHovedmenyKnappId;
    }

    idMap[
        KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
    ] = desktopSokKnappId;

    if (varslerEnabled) {
        idMap[
            KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
        ] = desktopVarslerKnappId;
    }

    if (minsideMenyEnabled) {
        idMap[
            KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
        ] = desktopMinsideKnappId;
    }

    const maxColsPerRow = arbeidsflatemenyEnabled ? [3, colIndex] : [colIndex];

    return createNaviGraph(group, rootIndex, maxColsPerRow, idMap);
};
