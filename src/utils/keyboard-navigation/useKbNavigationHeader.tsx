import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    addEventListenersAndReturnHandlers,
    createHeaderMainGraph,
    kbNavInitialState,
    removeListeners,
} from './kb-navigation-setup';
import { GraphData, KbNaviNode } from './kb-navigation';
import { lukkAlleDropdowns } from '../../store/reducers/dropdown-toggle-duck';
import { AppState } from '../../store/reducers';

const stateSelector = (state: AppState) => ({
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    menyStatus: state.menypunkt.status,
    innloggingsStatus: state.innloggingsstatus.data,
});

export type KeyboardNaviState = {
    currentNode: KbNaviNode;
    mainGraph: GraphData;
    subGraph?: GraphData;
};

export const useKbNavigationHeader = () => {
    const {
        language,
        arbeidsflate,
        menyStatus,
        innloggingsStatus,
    } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const [kbNavState, setKbNavState] = useState<KeyboardNaviState>(
        kbNavInitialState
    );
    const setCurrentNode = (node: KbNaviNode) => {
        setKbNavState({ ...kbNavState, currentNode: node });
    };
    const setSubGraph = (graph: GraphData) => {
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
            (node: KbNaviNode) => dispatch(setCurrentNode(node)),
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
