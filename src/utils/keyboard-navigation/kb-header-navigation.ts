import KbNav, {
    getNaviGraphData,
    IdMap,
    NaviGraphData,
    NaviGroup,
    NaviNode,
    NodeSetterCallback,
} from './kb-navigation';
import BEMHelper from '../bem';
import { Language } from '../../reducer/language-duck';
import { MenuValue } from '../meny-storage-utils';
import { Status } from '../../api/api';
import { hovedmenyDesktopClassname } from '../../komponenter/header/meny/ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { sokDropdownDesktopClassname } from '../../komponenter/header/meny/ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { minsideMenyDesktopClassname } from '../../komponenter/header/meny/ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';

type Handlers = {
    focusIn: (e: FocusEvent) => void;
    keyDown: (e: KeyboardEvent) => void;
};

export const addEventListenersAndReturnHandlers = (
    node: NaviNode,
    graphData: NaviGraphData,
    setKbNaviNode: NodeSetterCallback
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
    erInnlogget: boolean
) => {
    const headerElement = document.getElementById('dekorator-desktop-header');
    if (!headerElement) {
        return;
    }

    const naviGroup = NaviGroup.DesktopHeaderMenylinje;
    const rootIndex = { col: 0, row: 1, sub: 0 };
    const index = { col: 0, row: 1, sub: 0 };
    const idMap: IdMap = {};

    idMap[KbNav.getKbId(naviGroup, { ...index, col: index.col++ })] = BEMHelper(
        'desktopmeny'
    ).element('nav-brand');

    if (language !== Language.SAMISK && menyStatus === Status.OK) {
        idMap[
            KbNav.getKbId(naviGroup, { ...index, col: index.col++ })
        ] = BEMHelper(hovedmenyDesktopClassname).element('knapp');
    }

    idMap[KbNav.getKbId(naviGroup, { ...index, col: index.col++ })] = BEMHelper(
        sokDropdownDesktopClassname
    ).element('knapp');

    if (arbeidsflate === MenuValue.PRIVATPERSON && erInnlogget) {
        idMap[KbNav.getKbId(naviGroup, { ...index, col: index.col++ })] =
            'toggle-varsler-container__knapp';
    }

    if (
        language === Language.NORSK &&
        menyStatus === Status.OK &&
        erInnlogget
    ) {
        idMap[
            KbNav.getKbId(naviGroup, { ...index, col: index.col++ })
        ] = BEMHelper(minsideMenyDesktopClassname).element('knapp');
    }

    const colLayout = [3, index.col];

    return getNaviGraphData(naviGroup, rootIndex, colLayout, idMap);
};
