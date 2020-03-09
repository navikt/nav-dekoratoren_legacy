import React, { useEffect } from 'react';
import {
    IdMap,
    NaviGroup,
    NaviIndex,
    NaviNode,
    NodeEdge,
    NodeEdgeOpposite,
    selectNode,
} from './kb-navigation';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducer/reducer';
import { buildNaviGraphAndGetRootNode } from './kb-navi-graph-builder';

type Props = {
    group: NaviGroup;
    rootIndex: NaviIndex;
    maxColsPerSection: number[];
    idMap?: IdMap;
    isEnabled: boolean;
    parentNode: NaviNode;
    parentEdge: NodeEdge;
    children: JSX.Element;
};

export const KbNavigation = (props: Props) => {
    const {
        group,
        rootIndex,
        maxColsPerSection,
        idMap,
        isEnabled,
        parentNode,
        parentEdge,
        children,
    } = props;

    if (!parentNode) {
        return children;
    }

    const currentNode = useSelector(
        (state: AppState) => state.keyboardNodes.currentNode
    );

    useEffect(() => {
        const cleanUp = () => {
            parentNode[parentEdge] = parentNode;
            if (currentNode?.group === group) {
                selectNode(parentNode);
            }
        };

        if (!isEnabled) {
            cleanUp();
            return;
        }

        const rootNode = buildNaviGraphAndGetRootNode(
            group,
            rootIndex,
            maxColsPerSection,
            idMap
        );

        if (rootNode) {
            parentNode[parentEdge] = rootNode;
            rootNode[NodeEdgeOpposite[parentEdge]] = parentNode;
        }
    }, [group, rootIndex, idMap, maxColsPerSection, isEnabled]);

    return children;
};
