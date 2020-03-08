import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducer';
import { Language } from '../../reducer/language-duck';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MobilMenylinje from './meny/MobilMenylinje';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './meny/DesktopMenylinje';
import MenyBakgrunn from './meny/ekspanderende-menyer/meny-bakgrunn/MenyBakgrunn';
import {
    oppdaterSessionStorage,
    MenuValue,
} from '../../utils/meny-storage-utils';
import Environment from '../../utils/Environment';
import {
    addEventListenersAndReturnHandlers,
    getHeaderKbNavGraphData,
    removeListeners,
} from '../../utils/keyboard-navigation/kb-header-navigation';
import {
    NaviGraphData,
    NaviNode,
} from '../../utils/keyboard-navigation/kb-navigation';
import {
    KeyboardNodeState,
    settKeyboardNodes,
} from '../../reducer/keyboard-nav-duck';
import BEMHelper from '../../utils/bem';
import { hovedmenyDesktopClassname } from './meny/ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { sokDropdownDesktopClassname } from './meny/ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { minsideMenyDesktopClassname } from './meny/ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';

const stateSelector = (state: AppState) => ({
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    menyStatus: state.menypunkt.status,
    erInnlogget: state.innloggingsstatus.data.authenticated,
});

export const Header = () => {
    const dispatch = useDispatch();
    const { language, arbeidsflate, menyStatus, erInnlogget } = useSelector(
        stateSelector
    );
    const [kbNaviGraph, setKbNaviGraph] = useState<NaviGraphData>();
    const [kbNaviNode, setKbNaviNode] = useState<NaviNode>(null);

    useEffect(() => {
        fetchMenypunkter()(dispatch);
        if (Environment.CONTEXT !== MenuValue.IKKEVALGT) {
            oppdaterSessionStorage(Environment.CONTEXT);
        }
    }, []);

    useEffect(() => {
        const graphData = getHeaderKbNavGraphData(
            language,
            arbeidsflate,
            menyStatus,
            erInnlogget
        );
        if (graphData?.rootNode) {
            setKbNaviGraph(graphData);
            setKbNaviNode(graphData.rootNode);
            const nodes: KeyboardNodeState = {
                hovedmeny:
                    graphData.nodeMap[
                        BEMHelper(hovedmenyDesktopClassname).element('knapp')
                    ],
                minside:
                    graphData.nodeMap[
                        BEMHelper(minsideMenyDesktopClassname).element('knapp')
                    ],
                sok:
                    graphData.nodeMap[
                        BEMHelper(sokDropdownDesktopClassname).element('knapp')
                    ],
                varsler:
                    graphData.nodeMap[
                        BEMHelper('toggle-varsler-container').element('knapp')
                    ],
                currentNode: graphData.rootNode,
            };
            dispatch(settKeyboardNodes(nodes));
        }
    }, [language, arbeidsflate, menyStatus, erInnlogget]);

    useEffect(() => {
        if (!kbNaviGraph) {
            return;
        }

        const eventHandlers = addEventListenersAndReturnHandlers(
            kbNaviNode,
            kbNaviGraph,
            setKbNaviNode
        );
        return removeListeners.bind(document, eventHandlers);
    }, [kbNaviNode]);

    return (
        <>
            <div className="header-z-wrapper">
                <Skiplinks />
            </div>
            <header className="siteheader">
                <div className="media-sm-mobil mobil-meny">
                    <MobilMenylinje language={language} />
                </div>
                <div
                    className="media-tablet-desktop tablet-desktop-meny"
                    id="dekorator-desktop-header"
                >
                    <div className="header-z-wrapper">
                        {language === Language.NORSK && <Arbeidsflatemeny />}
                        <DesktopMenylinje />
                    </div>
                </div>
                <MenyBakgrunn />
            </header>
        </>
    );
};

export default Header;
