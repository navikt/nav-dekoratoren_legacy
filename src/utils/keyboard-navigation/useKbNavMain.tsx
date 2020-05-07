import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createHeaderMainGraph } from './kb-navigation-setup';
import { KbNavGraph, KbNavNode } from './kb-navigation';
import { KbNavNodeMap } from './kb-navigation';
import { createKbNavNode } from './kb-navigation';
import { KbNavGroup } from './kb-navigation';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import { AppState } from 'store/reducers';
import { desktopHeaderLogoId } from 'komponenter/header/header-regular/desktop/DesktopMenylinje';
import KbNav from 'utils/keyboard-navigation/kb-navigation';

const stateSelector = (state: AppState) => ({
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    menyStatus: state.menypunkt.status,
    innloggingsStatus: state.innloggingsstatus.data,
    dropdownToggles: state.dropdownToggles,
});

export type KbNavMain = {
    mainNodeMap: KbNavNodeMap;
    subNodeMap?: KbNavNodeMap;
    currentNode: KbNavNode;
    setCurrentNode: (node: KbNavNode) => void;
    setSubGraph: (graph: KbNavGraph) => void;
};

type KeyboardNavState = {
    currentNode: KbNavNode;
    mainGraph: KbNavGraph;
    subGraph?: KbNavGraph;
};

export const kbMasterNode = createKbNavNode(
    desktopHeaderLogoId,
    { col: 0, row: 1, sub: 0 },
    KbNavGroup.HeaderMenylinje
);

export const kbNavInitialState: KeyboardNavState = {
    currentNode: kbMasterNode,
    mainGraph: {
        group: kbMasterNode.group,
        rootNode: kbMasterNode,
        nodeMap: { [kbMasterNode.id]: kbMasterNode },
    },
};

export const useKbNavMain = (): KbNavMain => {
    const {
        language,
        arbeidsflate,
        menyStatus,
        innloggingsStatus,
        dropdownToggles,
    } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const [kbNavState, setKbNavState] = useState<KeyboardNavState>(
        kbNavInitialState
    );
    const setCurrentNode = (node: KbNavNode) => {
        setKbNavState({ ...kbNavState, currentNode: node });
    };
    const setSubGraph = (graph: KbNavGraph) => {
        setKbNavState({ ...kbNavState, subGraph: graph });
    };

    const dropdownIsOpen =
        dropdownToggles.hovedmeny ||
        dropdownToggles.minside ||
        dropdownToggles.sok ||
        dropdownToggles.varsler;

    useEffect(() => {
        const graph = createHeaderMainGraph(
            language,
            arbeidsflate,
            menyStatus,
            innloggingsStatus.authenticated
        );
        if (graph) {
            setKbNavState({ ...kbNavState, mainGraph: graph });
        }
    }, [language, arbeidsflate, menyStatus, innloggingsStatus]);

    useEffect(() => {
        const arrowkeysHandler = KbNav.arrowkeysHandler(
            kbNavState.currentNode,
            setCurrentNode
        );
        const focusHandler = KbNav.focusHandler(
            kbNavState.currentNode,
            {
                ...kbNavState.mainGraph.nodeMap,
                ...kbNavState.subGraph?.nodeMap,
            },
            setCurrentNode,
            arrowkeysHandler
        );
        const escapeHandler = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') {
                return;
            }
            if (dropdownIsOpen) {
                dispatch(lukkAlleDropdowns());
            } else {
                const focusElement = document.activeElement;
                if (focusElement && focusElement instanceof HTMLElement) {
                    focusElement.blur();
                }
                document.removeEventListener('keydown', arrowkeysHandler);
            }
        };

        document.addEventListener('focusin', focusHandler);
        document.addEventListener('keydown', arrowkeysHandler);
        document.addEventListener('keydown', escapeHandler);

        return () => {
            document.removeEventListener('focusin', focusHandler);
            document.removeEventListener('keydown', arrowkeysHandler);
            document.removeEventListener('keydown', escapeHandler);
        };
    }, [kbNavState, dropdownIsOpen]);

    return {
        mainNodeMap: kbNavState.mainGraph.nodeMap,
        subNodeMap: kbNavState.subGraph?.nodeMap,
        currentNode: kbNavState.currentNode,
        setCurrentNode,
        setSubGraph,
    };
};
