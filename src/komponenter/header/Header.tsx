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
    settCurrentNode,
    settKeyboardNodes,
} from '../../reducer/keyboard-nav-duck';
import { desktopHovedmenyKnappId } from './meny/ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { desktopSokKnappId } from './meny/ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { desktopMinsideKnappId } from './meny/ekspanderende-menyer/minside-meny-desktop/MinsideMenyDesktop';
import { desktopVarslerKnappId } from './meny/ekspanderende-menyer/varsler-dropdown-desktop/VarslerDropdown';

const stateSelector = (state: AppState) => ({
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    menyStatus: state.menypunkt.status,
    innloggingsStatus: state.innloggingsstatus.data,
    currentNode: state.keyboardNodes.currentNode,
});

export const Header = () => {
    const dispatch = useDispatch();
    const { language, arbeidsflate, menyStatus, innloggingsStatus, currentNode } = useSelector(
        stateSelector,
    );
    const [kbNaviGraph, setKbNaviGraph] = useState<NaviGraphData>();

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
            innloggingsStatus.authenticated,
        );
        if (graphData?.rootNode) {
            setKbNaviGraph(graphData);
            const nodes: KeyboardNodeState = {
                hovedmeny: graphData.nodeMap[desktopHovedmenyKnappId],
                minside: graphData.nodeMap[desktopMinsideKnappId],
                sok: graphData.nodeMap[desktopSokKnappId],
                varsler: graphData.nodeMap[desktopVarslerKnappId],
                currentNode: graphData.rootNode,
            };
            dispatch(settKeyboardNodes(nodes));
            dispatch(settCurrentNode(graphData.rootNode));
        }
    }, [language, arbeidsflate, menyStatus, innloggingsStatus]);

    useEffect(() => {
        if (!kbNaviGraph) {
            return;
        }

        const eventHandlers = addEventListenersAndReturnHandlers(
            currentNode,
            kbNaviGraph,
            (node: NaviNode) => dispatch(settCurrentNode(node)),
        );
        return removeListeners.bind(document, eventHandlers);
    }, [currentNode]);

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
