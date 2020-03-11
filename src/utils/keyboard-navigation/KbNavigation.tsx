import React, { useEffect } from 'react';
import {
    createNaviGraph,
    IdMap,
    NaviGroup,
    NaviIndex,
    NaviNode,
    NodeEdge,
    NodeEdgeOpposite,
    selectNode,
} from './kb-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducer';
import { setKbSubGraph } from '../../reducer/keyboard-nav-duck';

type Props = {
    group: NaviGroup;
    rootIndex: NaviIndex;
    maxColsPerSection: number[];
    idMap?: IdMap;
    isEnabled: boolean;
    parentNodeId: string;
    parentEdge: NodeEdge;
    children: JSX.Element;
};

const stateSelector = (state: AppState) => ({
    mainNodeMap: state.keyboardNodes.mainGraph.nodeMap,
});

export const KbNavigation = (props: Props) => {
    const {
        group,
        rootIndex,
        maxColsPerSection,
        idMap,
        isEnabled,
        parentNodeId,
        parentEdge,
        children,
    } = props;

    const dispatch = useDispatch();
    const { mainNodeMap } = useSelector(stateSelector);
    const parentNode = mainNodeMap[parentNodeId];

    useEffect(() => {
        const cleanUp = () => {
            if (parentNode) {
                parentNode[parentEdge] = parentNode;
            }
        };

        if (!isEnabled) {
            cleanUp();
            return;
        }

        const graph = createNaviGraph(
            group,
            rootIndex,
            maxColsPerSection,
            idMap
        );
        if (graph) {
            dispatch(setKbSubGraph(graph));
            parentNode[parentEdge] = graph.rootNode;
            graph.rootNode[NodeEdgeOpposite[parentEdge]] = parentNode;
        }
    }, [group, rootIndex, idMap, maxColsPerSection, isEnabled]);

    return children;
};
