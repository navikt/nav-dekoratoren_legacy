import KbNav, {
    createNaviGraph,
    IdMap,
    NaviGroup,
    NaviNode,
    NaviNodeMap,
    NodeSetterCallback,
} from './kb-navigation';
import { Language } from '../../reducer/language-duck';
import { MenuValue } from '../meny-storage-utils';
import { Status } from '../../api/api';
import { desktopHovedmenyKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { desktopSokKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { desktopMinsideKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';
import { desktopVarslerKnappId } from '../../komponenter/header/meny/ekspanderende-menyer/varsler-dropdown-desktop/VarslerDropdown';
import { desktopHeaderLogoId } from '../../komponenter/header/meny/DesktopMenylinje';

type Handlers = {
    focusIn: (e: FocusEvent) => void;
    keyDown: (e: KeyboardEvent) => void;
};

export const addEventListenersAndReturnHandlers = (
    currentNode: NaviNode,
    nodeMap: NaviNodeMap,
    setCurrentNode: NodeSetterCallback
): Handlers => {
    const kbHandler = KbNav.kbHandler(currentNode, setCurrentNode);
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

export const createHeaderKbNaviGraph = (
    language: Language,
    arbeidsflate: MenuValue,
    menyStatus: Status,
    erInnlogget: boolean
) => {
    const headerElement = document.getElementById('dekorator-desktop-header');
    if (!headerElement) {
        return null;
    }

    const group = NaviGroup.HeaderMenylinje;
    const rootIndex = { col: 0, row: 0, sub: 0 };
    const index = { col: 0, row: 0, sub: 0 };
    const idMap: IdMap = {};

    idMap[
        KbNav.getKbId(group, { ...index, col: index.col++ })
    ] = desktopHeaderLogoId;

    if (language !== Language.SAMISK && menyStatus === Status.OK) {
        idMap[
            KbNav.getKbId(group, { ...index, col: index.col++ })
        ] = desktopHovedmenyKnappId;
    }

    idMap[
        KbNav.getKbId(group, { ...index, col: index.col++ })
    ] = desktopSokKnappId;

    if (arbeidsflate === MenuValue.PRIVATPERSON && erInnlogget) {
        idMap[
            KbNav.getKbId(group, { ...index, col: index.col++ })
        ] = desktopVarslerKnappId;
    }

    if (
        language === Language.NORSK &&
        menyStatus === Status.OK &&
        erInnlogget
    ) {
        idMap[
            KbNav.getKbId(group, { ...index, col: index.col++ })
        ] = desktopMinsideKnappId;
    }

    const colLayout = [index.col];

    return createNaviGraph(group, rootIndex, colLayout, idMap);
};
