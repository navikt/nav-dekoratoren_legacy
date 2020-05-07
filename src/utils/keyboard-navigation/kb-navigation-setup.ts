import KbNav, {
    createKbNavGraph,
    getKbId,
    KbIdMap,
    NodeEdge,
    KbNavGroup,
    NodeIndex,
} from './kb-navigation';
import { desktopHovedmenyKnappId } from 'komponenter/header/header-regular/meny/ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { desktopHeaderLogoId } from 'komponenter/header/header-regular/meny/DesktopMenylinje';
import { desktopSokKnappId } from 'komponenter/header/header-regular/meny/ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { desktopVarslerKnappId } from 'komponenter/header/header-regular/meny/ekspanderende-menyer/varsler-desktop/VarslerDropdown';
import { desktopMinsideKnappId } from 'komponenter/header/header-regular/meny/ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';
import { Language } from 'store/reducers/language-duck';
import { MenuValue } from '../meny-storage-utils';
import { Status } from 'api/api';
import { kbMasterNode } from 'utils/keyboard-navigation/useKbNavMain';
import { desktopLoginKnappId } from 'komponenter/header/header-regular/meny/logginn/LoggInnKnappDesktop';

export type KbNavConfig = {
    group: KbNavGroup;
    rootIndex: NodeIndex;
    maxColsPerRow: Array<number>;
    parentNodeId: string;
    parentNodeEdge: NodeEdge;
    idMap?: KbIdMap;
};

// TODO: Hvorfor blir desktopHovedmenyKnappId noen ganger undefined?!
const hovedmenyKnappId =
    desktopHovedmenyKnappId || 'desktop-hovedmeny-knapp-id';

export const configForNodeGroup: { [key in KbNavGroup]: KbNavConfig } = {
    [KbNavGroup.HeaderMenylinje]: {
        group: KbNavGroup.HeaderMenylinje,
        rootIndex: kbMasterNode.index,
        maxColsPerRow: [3, 6],
        parentNodeId: desktopHeaderLogoId,
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
        maxColsPerRow: [3],
        parentNodeId: desktopSokKnappId,
        parentNodeEdge: NodeEdge.Bottom,
        idMap: {
            [getKbId(KbNavGroup.Sok, {
                col: 0,
                row: 0,
                sub: 0,
            })]: 'desktop-sok-input',
            [getKbId(KbNavGroup.Sok, {
                col: 1,
                row: 0,
                sub: 0,
            })]: 'desktop-sok-reset-knapp',
            [getKbId(KbNavGroup.Sok, {
                col: 2,
                row: 0,
                sub: 0,
            })]: 'desktop-sok-submit-knapp',
        },
    },
    [KbNavGroup.Varsler]: {
        group: KbNavGroup.Varsler,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [1, 1, 1],
        parentNodeId: desktopVarslerKnappId,
        parentNodeEdge: NodeEdge.Bottom,
    },
    [KbNavGroup.MinsideMeny]: {
        group: KbNavGroup.MinsideMeny,
        rootIndex: { col: 0, row: 0, sub: 0 },
        maxColsPerRow: [1, 3],
        parentNodeId: desktopMinsideKnappId,
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
    ] = desktopHeaderLogoId;

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
        ] = desktopVarslerKnappId;
    }

    if (minsideMenyEnabled) {
        idMap[
            KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
        ] = desktopMinsideKnappId;
    }

    idMap[
        KbNav.getKbId(group, { ...rootIndex, col: colIndex++ })
    ] = desktopLoginKnappId;

    const maxColsPerRow = arbeidsflatemenyEnabled ? [3, colIndex] : [colIndex];

    return createKbNavGraph(group, rootIndex, maxColsPerRow, idMap);
};
