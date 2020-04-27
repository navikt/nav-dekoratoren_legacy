import React, { useEffect } from 'react';
import { createNaviGraph, NodeEdgeOpposite, selectNode } from './kb-navigation';
import { KbNavConfig } from './kb-navigation-setup';
import { KbNavMain } from './useKbNavMain';

export const useKbNavSub = (
    config: KbNavConfig,
    kbNavMain: KbNavMain,
    isEnabled: boolean
) => {
    const {
        group,
        rootIndex,
        maxColsPerRow,
        parentNodeId,
        parentNodeEdge,
        idMap,
    } = config;
    const {
        currentNode,
        mainNodeMap,
        subNodeMap,
        setCurrentNode,
        setSubGraph,
    } = kbNavMain;

    useEffect(() => {
        const parentNode = mainNodeMap[parentNodeId];
        const cleanUp = () => {
            if (parentNode) {
                parentNode[parentNodeEdge] = parentNode;
                if (subNodeMap && subNodeMap[currentNode.id]) {
                    selectNode(parentNode, (node) => setCurrentNode(node));
                }
            }
        };

        if (!parentNode) {
            console.log('no parent', parentNodeId, mainNodeMap);
            return;
        }

        if (!isEnabled) {
            cleanUp();
            return;
        }

        const graph = createNaviGraph(group, rootIndex, maxColsPerRow, idMap);
        if (graph) {
            setSubGraph(graph);
            parentNode[parentNodeEdge] = graph.rootNode;
            graph.rootNode[NodeEdgeOpposite[parentNodeEdge]] = parentNode;
        }
    }, [group, rootIndex, idMap, maxColsPerRow, isEnabled]);
};
