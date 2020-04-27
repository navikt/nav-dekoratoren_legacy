import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    addEventListenersAndReturnHandlers,
    createHeaderMainGraph,
    removeListeners,
} from './kb-navigation-setup';
import { KbNavGraph, KbNavNode } from './kb-navigation';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';
import { AppState } from 'store/reducers';
import { KbNavNodeMap } from './kb-navigation';
import { createKbNaviNode } from './kb-navigation';
import { desktopHeaderLogoId } from 'komponenter/header/header-regular/meny/DesktopMenylinje';
import { NodeGroup } from './kb-navigation';

const stateSelector = (state: AppState) => ({
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    menyStatus: state.menypunkt.status,
    innloggingsStatus: state.innloggingsstatus.data,
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

export const kbMasterNode = createKbNaviNode(
    desktopHeaderLogoId,
    { col: 0, row: 1, sub: 0 },
    NodeGroup.HeaderMenylinje
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
        const handlers = addEventListenersAndReturnHandlers(
            kbNavState.currentNode,
            {
                ...kbNavState.mainGraph.nodeMap,
                ...kbNavState.subGraph?.nodeMap,
            },
            (node: KbNavNode) => setCurrentNode(node),
            () => dispatch(lukkAlleDropdowns())
        );

        return () => removeListeners(handlers);
    }, [kbNavState]);

    return {
        mainNodeMap: kbNavState.mainGraph.nodeMap,
        subNodeMap: kbNavState.subGraph?.nodeMap,
        currentNode: kbNavState.currentNode,
        setCurrentNode,
        setSubGraph,
    };
};
