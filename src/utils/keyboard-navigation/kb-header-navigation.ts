import KbNav, {
    getNaviGraphData,
    IdMap,
    NaviGraphData,
    NaviGroup,
    NaviNode,
    NodeSetterCallback,
} from './kb-navigation';
import { Language } from '../../reducer/language-duck';
import { MenuValue } from '../meny-storage-utils';
import { Status } from '../../api/api';
import {
    desktopHovedmenyKnappId,
} from '../../komponenter/header/meny/ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { desktopSokKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import {
    desktopMinsideKnappId,
} from '../../komponenter/header/meny/ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';
import { desktopVarslerKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/varsler-dropdown-desktop/VarslerDropdown';
import { desktopHeaderLogoId } from '../../komponenter/header/meny/DesktopMenylinje';

type Handlers = {
    focusIn: (e: FocusEvent) => void;
    keyDown: (e: KeyboardEvent) => void;
};

export const addEventListenersAndReturnHandlers = (
    node: NaviNode,
    graphData: NaviGraphData,
    setKbNaviNode: NodeSetterCallback,
): Handlers => {
    const kbHandler = KbNav.kbHandler(node, setKbNaviNode);
    const focusHandler = KbNav.focusHandler(node, graphData, setKbNaviNode);
    document.addEventListener('focusin', focusHandler);
    document.addEventListener('keydown', kbHandler);

    return { focusIn: focusHandler, keyDown: kbHandler };
};

export const removeListeners = ({ focusIn, keyDown }: Handlers) => {
    document.removeEventListener('focusin', focusIn);
    document.removeEventListener('keydown', keyDown);
};

export const getHeaderKbNavGraphData = (
    language: Language,
    arbeidsflate: MenuValue,
    menyStatus: Status,
    erInnlogget: boolean,
) => {
    const headerElement = document.getElementById('dekorator-desktop-header');
    if (!headerElement) {
        return;
    }

    const naviGroup = NaviGroup.HeaderMenylinje;
    const rootIndex = { col: 0, row: 1, sub: 0 };
    const index = { col: 0, row: 1, sub: 0 };
    const idMap: IdMap = {};

    idMap[KbNav.getKbId(naviGroup, { ...index, col: index.col++ })] = desktopHeaderLogoId;

    if (language !== Language.SAMISK && menyStatus === Status.OK) {
        idMap[
            KbNav.getKbId(naviGroup, { ...index, col: index.col++ })
            ] = desktopHovedmenyKnappId;
    }

    idMap[KbNav.getKbId(naviGroup, { ...index, col: index.col++ })] = desktopSokKnappId;

    if (arbeidsflate === MenuValue.PRIVATPERSON && erInnlogget) {
        idMap[KbNav.getKbId(naviGroup, { ...index, col: index.col++ })] =
            desktopVarslerKnappId;
    }

    if (
        language === Language.NORSK &&
        menyStatus === Status.OK &&
        erInnlogget
    ) {
        idMap[
            KbNav.getKbId(naviGroup, { ...index, col: index.col++ })
            ] = desktopMinsideKnappId;
    }

    const colLayout = [3, index.col];

    return getNaviGraphData(naviGroup, rootIndex, colLayout, idMap);
};
