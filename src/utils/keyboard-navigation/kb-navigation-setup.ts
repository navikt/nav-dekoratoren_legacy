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
import { kbMasterNode } from 'utils/keyboard-navigation/useKbNavMain';
import { desktopHovedmenyKnappId } from 'komponenter/header/header-regular/desktop/hovedmeny/Hovedmeny';
import { headerLogoId } from 'komponenter/header/header-regular/HeaderMenylinje';
import { desktopSokKnappId } from 'komponenter/header/header-regular/desktop/sok-dropdown/sok-knapp/SokKnapp';
import { desktopSokInputId } from 'komponenter/header/header-regular/desktop/sok-dropdown/SokDropdown';
import { varslerKnappId } from 'komponenter/header/header-regular/common/varsler/varsler-knapp/VarslerKnapp';
import { minsideKnappId } from 'komponenter/header/header-regular/desktop/minside-meny/MinsideMeny';
import { loginKnappId } from 'komponenter/header/header-regular/common/logg-inn/LoggInnKnapp';

// TODO: Finn ut hvorfor akkurat denne noen ganger blir undefined :|
const hovedmenyKnappId =
    desktopHovedmenyKnappId || 'desktop-hovedmeny-knapp-id';

export type KbNavConfig = {
    group: KbNavGroup;
    rootIndex: NodeIndex;
    maxColsPerRow: Array<number>;
    parentNodeId: string;
    parentNodeEdge: NodeEdge;
    idMap?: KbIdMap;
};

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
        parentNodeId: hovedmenyKnappId,
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
        ] = hovedmenyKnappId;
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
