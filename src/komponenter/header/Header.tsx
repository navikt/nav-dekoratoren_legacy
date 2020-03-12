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
    createHeaderMainGraph,
    removeListeners,
} from '../../utils/keyboard-navigation/kb-navigation-setup';
import {
    setCurrentNode,
    setKbMainGraph,
} from '../../reducer/keyboard-nav-duck';
import { KbNaviNode } from '../../utils/keyboard-navigation/kb-navigation';
import { lukkAlleDropdowns } from '../../reducer/dropdown-toggle-duck';

const stateSelector = (state: AppState) => ({
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    menyStatus: state.menypunkt.status,
    innloggingsStatus: state.innloggingsstatus.data,
    kbNavState: state.kbNavigation,
});

const KbNavMain = ({ children }: { children: JSX.Element }) => {
    const {
        language,
        arbeidsflate,
        menyStatus,
        innloggingsStatus,
        kbNavState,
    } = useSelector(stateSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const graph = createHeaderMainGraph(
            language,
            arbeidsflate,
            menyStatus,
            innloggingsStatus.authenticated
        );
        if (graph) {
            dispatch(setKbMainGraph(graph));
            dispatch(setCurrentNode(graph.rootNode));
        }
    }, [language, arbeidsflate, menyStatus, innloggingsStatus]);

    useEffect(() => {
        const handlers = addEventListenersAndReturnHandlers(
            kbNavState.currentNode,
            {
                ...kbNavState.mainGraph.nodeMap,
                ...kbNavState.subGraph?.nodeMap,
            },
            (node: KbNaviNode) => dispatch(setCurrentNode(node)),
            () => dispatch(lukkAlleDropdowns())
        );

        return () => removeListeners(handlers);
    }, [kbNavState]);

    return children;
};

export const Header = () => {
    const dispatch = useDispatch();

    const { language } = useSelector(stateSelector);

    useEffect(() => {
        fetchMenypunkter()(dispatch);
        if (Environment.CONTEXT !== MenuValue.IKKEVALGT) {
            oppdaterSessionStorage(Environment.CONTEXT);
        }
    }, []);

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
                    <KbNavMain>
                        <div className="header-z-wrapper">
                            {language === Language.NORSK && (
                                <Arbeidsflatemeny />
                            )}
                            <DesktopMenylinje />
                        </div>
                    </KbNavMain>
                </div>
                <MenyBakgrunn />
            </header>
        </>
    );
};

export default Header;
