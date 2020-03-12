import React, { useEffect } from 'react';
import { createNaviGraph, NodeEdgeOpposite, selectNode } from './kb-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducer';
import { setCurrentNode, setKbSubGraph } from '../../reducer/keyboard-nav-duck';
import { KbNavConfig } from './kb-navigation-setup';

type Props = {
    config: KbNavConfig;
    isEnabled: boolean;
    children: JSX.Element;
};

const stateSelector = (state: AppState) => ({
    currentNode: state.kbNavigation.currentNode,
    mainNodeMap: state.kbNavigation.mainGraph.nodeMap,
    subNodeMap: state.kbNavigation.subGraph?.nodeMap,
});

export const KbNavigationWrapper = (props: Props) => {
    const { config, isEnabled, children } = props;
    const {
        group,
        rootIndex,
        maxColsPerRow,
        parentNodeId,
        parentNodeEdge,
        idMap,
    } = config;
    const dispatch = useDispatch();
    const { currentNode, mainNodeMap, subNodeMap } = useSelector(stateSelector);
    const parentNode = mainNodeMap[parentNodeId];

    useEffect(() => {
        const cleanUp = () => {
            if (parentNode) {
                parentNode[parentNodeEdge] = parentNode;
                if (subNodeMap && subNodeMap[currentNode.id]) {
                    selectNode(parentNode, node =>
                        dispatch(setCurrentNode(node))
                    );
                }
            }
        };

        if (!parentNode) {
            return;
        }

        if (!isEnabled) {
            cleanUp();
            return;
        }

        const graph = createNaviGraph(group, rootIndex, maxColsPerRow, idMap);
        if (graph) {
            dispatch(setKbSubGraph(graph));
            parentNode[parentNodeEdge] = graph.rootNode;
            graph.rootNode[NodeEdgeOpposite[parentNodeEdge]] = parentNode;
        }
    }, [group, rootIndex, idMap, maxColsPerRow, isEnabled]);

    return children;
};
