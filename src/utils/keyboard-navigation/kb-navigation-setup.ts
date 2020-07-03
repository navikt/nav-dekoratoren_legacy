import KbNav, {
    createKbNavGraph,
    getKbId,
    KbIdMap,
    NodeEdge,
    KbNavGroup,
    NodeIndex,
} from './kb-navigation';
import { Language } from 'store/reducers/language-duck';
import { MenuValue } from '../meny-storage-utils';
import { Status } from 'api/api';
import { headerLogoId } from 'utils/id-repo';
import { desktopSokKnappId } from 'utils/id-repo';
import { desktopSokInputId } from 'utils/id-repo';
import { varslerKnappId } from 'utils/id-repo';
import { minsideKnappId } from 'utils/id-repo';
import { loginKnappId } from 'utils/id-repo';
import { desktopHovedmenyKnappId } from 'utils/id-repo';
import { createKbNavNode } from './kb-navigation';

export type KbNavConfig = {
    group: KbNavGroup;
    rootIndex: NodeIndex;
    maxColsPerRow: Array<number>;
    parentNodeId: string;
    parentNodeEdge: NodeEdge;
    idMap?: KbIdMap;
};

export const kbMasterNode = createKbNavNode(
    headerLogoId,
    { col: 0, row: 1, sub: 0 },
    KbNavGroup.HeaderMenylinje
);

export const configForNodeGroup: { [key in KbNavGroup]: KbNavConfig } = {
    [KbNavGroup.HeaderMenylinje]: {
        group: KbNavGroup.HeaderMenylinje,
        rootIndex: kbMasterNode.index,
        maxColsPerRow: [3, 6],
        parentNodeId: headerLogoId,
        parentNodeEdge: NodeEdge.Right,
    },
    [KbNavGroup.Hovedmeny]: {
        group: KbNavGroup.Hovedmeny,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [1, 4, 3],
        parentNodeId: desktopHovedmenyKnappId,
        parentNodeEdge: NodeEdge.Bottom,
    },
    [KbNavGroup.Sok]: {
        group: KbNavGroup.Sok,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [3, 1],
        parentNodeId: desktopSokKnappId,
        parentNodeEdge: NodeEdge.Bottom,
        idMap: {
            [getKbId(KbNavGroup.Sok, {
                col: 0,
                row: 0,
                sub: 0,
            })]: desktopSokInputId,
            [getKbId(KbNavGroup.Sok, {
                col: 1,
                row: 0,
                sub: 0,
            })]: `${desktopSokInputId}-reset`,
            [getKbId(KbNavGroup.Sok, {
                col: 2,
                row: 0,
                sub: 0,
            })]: `${desktopSokInputId}-submit`,
        },
    },
    [KbNavGroup.Varsler]: {
        group: KbNavGroup.Varsler,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [1, 1, 1],
        parentNodeId: varslerKnappId,
        parentNodeEdge: NodeEdge.Bottom,
    },
    [KbNavGroup.MinsideMeny]: {
        group: KbNavGroup.MinsideMeny,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [1, 3],
        parentNodeId: minsideKnappId,
        parentNodeEdge: NodeEdge.Bottom,
    },
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

    const group = KbNavGroup.HeaderMenylinje;
    const rootIndex = configForNodeGroup[group].rootIndex;
    const idMap: KbIdMap = {};

    let colIndex = rootIndex.col;

    idMap[
        KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
    ] = headerLogoId;

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
        ] = varslerKnappId;
    }

    if (minsideMenyEnabled) {
        idMap[
            KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
        ] = minsideKnappId;
    }

    idMap[
        KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
    ] = loginKnappId;

    const maxColsPerRow = arbeidsflatemenyEnabled ? [3, colIndex] : [colIndex];

    return createKbNavGraph(group, rootIndex, maxColsPerRow, idMap);
};

export const getHovedmenyMaxColsPerRow = (classname: string): Array<number> => {
    const getNumColsFromCss = (element: HTMLElement) =>
        parseInt(
            window.getComputedStyle(element).getPropertyValue('--num-cols'),
            10
        );

    const toppSeksjonCols = 1;

    const hovedSeksjonElement = document.getElementsByClassName(
        `${classname}__hoved-seksjon`
    )[0] as HTMLElement;
    const hovedSeksjonCols =
        (hovedSeksjonElement && getNumColsFromCss(hovedSeksjonElement)) || 1;

    const bunnSeksjonElement = document.getElementsByClassName(
        `${classname}__bunn-seksjon`
    )[0] as HTMLElement;
    const bunnSeksjonCols =
        (bunnSeksjonElement && getNumColsFromCss(bunnSeksjonElement)) || 1;

    return [toppSeksjonCols, hovedSeksjonCols, bunnSeksjonCols];
};
