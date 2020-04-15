import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducers';
import MobilMenylinje from './meny/MobilMenylinje';
import { Language } from '../../reducer/language-duck';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './meny/DesktopMenylinje';
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

export const RegularHeader = () => {
    const language = useSelector((state: AppState) => state.language.language);
    return (
        <Fragment>
            <div className="media-sm-mobil mobil-meny">
                <MobilMenylinje language={language} />
            </div>
            <div className="media-tablet-desktop tablet-desktop-meny">
                <KbNavMain>
                    <div className="header-z-wrapper">
                        {language === Language.NORSK && <Arbeidsflatemeny />}
                        <DesktopMenylinje />
                    </div>
                </KbNavMain>
            </div>
        </Fragment>
    );
};
