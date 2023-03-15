import {
    createKbNavNode,
    getKbId,
    KbIdMap,
    KbNavGroup,
    NodeIndex,
    KbNavNode,
    KbNavNodeMap,
    NodeEdge,
} from './kb-navigation';

export const buildGraphAndGetRootNode = (
    group: KbNavGroup,
    rootIndex: NodeIndex,
    maxColsPerWrappedRow: number[],
    idMap: KbIdMap = {},
    nodeMap: KbNavNodeMap = {}
): KbNavNode => {
    const getTopEdgeIndex = (index: NodeIndex) => {
        const { col, row, sub } = index;

        const aboveIsSameCol = sub > 0 && !!getElement({ col: col, row: row, sub: sub - 1 });
        if (aboveIsSameCol) {
            return {
                col: col,
                row: row,
                sub: sub - 1,
            };
        }

        const maxColsCurrent = maxColsPerWrappedRow[row];
        const aboveIsSameRowWrapped = col >= maxColsCurrent;
        if (aboveIsSameRowWrapped) {
            const newCol = col - maxColsCurrent;
            const newSub = getLastSub(newCol, row);
            return {
                col: newCol,
                row: row,
                sub: newSub,
            };
        }

        const newRow = row - 1;
        if (newRow < 0) {
            return index;
        }

        const maxColsAbove = maxColsPerWrappedRow[newRow];
        const lastColAbove = getLastCol(newRow);
        const lastWrappedPositionAbove = lastColAbove % maxColsAbove;
        const bestAdjacentPositionAbove = Math.floor((col * maxColsAbove) / maxColsCurrent + 0.5);

        const newCol =
            bestAdjacentPositionAbove >= lastWrappedPositionAbove
                ? lastColAbove
                : lastColAbove - lastWrappedPositionAbove + bestAdjacentPositionAbove;
        const newSub = getLastSub(newCol, newRow);
        return {
            col: newCol,
            row: newRow,
            sub: newSub,
        };
    };

    const getBottomEdgeIndex = (index: NodeIndex) => {
        const { col, row, sub } = index;

        const belowIsSameCol = !!getElement({
            col: col,
            row: row,
            sub: sub + 1,
        });
        if (belowIsSameCol) {
            return {
                col: col,
                row: row,
                sub: sub + 1,
            };
        }

        const maxColsCurrent = maxColsPerWrappedRow[row];
        const firstColBelow = col + (maxColsCurrent - (col % maxColsCurrent));
        const belowIsSameRowWrapped = !!getElement({
            col: firstColBelow,
            row: row,
            sub: 0,
        });
        if (belowIsSameRowWrapped) {
            const newColAdjacent = col + maxColsCurrent;
            const newCol = getElement({
                col: newColAdjacent,
                row: row,
                sub: 0,
            })
                ? newColAdjacent
                : getLastCol(row);
            return {
                col: newCol,
                row: row,
                sub: 0,
            };
        }

        const newRow = row + 1;
        const rowBelowExists = !!getElement({ col: 0, row: newRow, sub: 0 });
        if (!rowBelowExists) {
            return index;
        }

        const maxColsBelow = maxColsPerWrappedRow[newRow];
        const bestAdjacentPositionBelow = Math.floor((col * maxColsBelow) / maxColsCurrent + 0.5) % maxColsBelow;
        const newCol = bestAdjacentPositionBelow < maxColsBelow ? bestAdjacentPositionBelow : maxColsBelow - 1;
        return {
            col: newCol,
            row: newRow,
            sub: 0,
        };
    };

    const getLeftEdgeIndex = (index: NodeIndex) => {
        const { col, row, sub } = index;
        const maxCols = maxColsPerWrappedRow[row];

        const newCol = col - 1;
        const isOutOfBounds = newCol % maxCols === maxCols - 1 || newCol < 0;
        if (isOutOfBounds) {
            return index;
        }

        const newSub = getElement({ col: newCol, row: row, sub }) ? sub : getLastSub(newCol, row);
        return {
            col: newCol,
            row: row,
            sub: newSub,
        };
    };

    const getRightEdgeIndex = (index: NodeIndex) => {
        const { col, row, sub } = index;
        const maxCols = maxColsPerWrappedRow[row];

        const newCol = col + 1;
        const isOutOfBounds = newCol % maxCols === 0;
        if (isOutOfBounds) {
            return index;
        }

        const newSub = getElement({ col: newCol, row: row, sub }) ? sub : getLastSub(newCol, row);
        return {
            col: newCol,
            row: row,
            sub: newSub,
        };
    };

    const getLastCol = (row: number, col = 0): number => {
        const nextCol = col + 1;
        if (getElement({ col: nextCol, row: row, sub: 0 })) {
            return getLastCol(row, nextCol);
        }
        return col;
    };

    const getLastSub = (col: number, row: number, sub = 0): number => {
        const nextSub = sub + 1;
        if (getElement({ col: col, row: row, sub: nextSub })) {
            return getLastSub(col, row, nextSub);
        }
        return sub;
    };

    const getElement = (index: NodeIndex) => document.getElementById(getKbId(group, index, idMap)) as HTMLElement;

    const getNodeAtIndex = (index: NodeIndex): KbNavNode => {
        const generatedId = getKbId(group, index, idMap);
        const id = idMap[generatedId] || generatedId;
        if (nodeMap[id]) {
            return nodeMap[id];
        }

        const node: KbNavNode = createKbNavNode(id, index, group);
        nodeMap[id] = node;

        if (node) {
            node[NodeEdge.Top] = getNodeAtIndex(getTopEdgeIndex(index));
            node[NodeEdge.Bottom] = getNodeAtIndex(getBottomEdgeIndex(index));
            node[NodeEdge.Left] = getNodeAtIndex(getLeftEdgeIndex(index));
            node[NodeEdge.Right] = getNodeAtIndex(getRightEdgeIndex(index));
        }

        return node;
    };

    return getNodeAtIndex(rootIndex);
};
