import React, { useEffect } from 'react';
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
    createHeaderKbNaviGraph,
    removeListeners,
} from '../../utils/keyboard-navigation/kb-header-navigation';
import {
    setCurrentNode,
    setKbMainGraph,
} from '../../reducer/keyboard-nav-duck';
import { NaviNode } from '../../utils/keyboard-navigation/kb-navigation';

const stateSelector = (state: AppState) => ({
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    menyStatus: state.menypunkt.status,
    innloggingsStatus: state.innloggingsstatus.data,
    kbNavState: state.keyboardNodes,
});

export const Header = () => {
    const dispatch = useDispatch();

    const {
        language,
        arbeidsflate,
        menyStatus,
        innloggingsStatus,
        kbNavState,
    } = useSelector(stateSelector);

    useEffect(() => {
        fetchMenypunkter()(dispatch);
        if (Environment.CONTEXT !== MenuValue.IKKEVALGT) {
            oppdaterSessionStorage(Environment.CONTEXT);
        }
    }, []);

    useEffect(() => {
        const mainGraph = createHeaderKbNaviGraph(
            language,
            arbeidsflate,
            menyStatus,
            innloggingsStatus.authenticated
        );
        if (mainGraph) {
            dispatch(setKbMainGraph(mainGraph));
            dispatch(setCurrentNode(mainGraph.rootNode));
        }
    }, [language, arbeidsflate, menyStatus, innloggingsStatus]);

    useEffect(() => {
        const handlers = addEventListenersAndReturnHandlers(
            kbNavState.currentNode,
            {
                ...kbNavState.mainGraph.nodeMap,
                ...kbNavState.subGraph?.nodeMap,
            },
            (node: NaviNode) => dispatch(setCurrentNode(node))
        );
        console.log('header-2');

        return () => removeListeners(handlers);
    }, [kbNavState.currentNode]);

    console.log('header-0');

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
