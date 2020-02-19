import { getKbId, IdMap, NaviGroup, NaviIndex, NaviNode, NaviNodeMap } from './kb-navigation';

export const buildNaviGraphAndGetRootNode = (
    group: NaviGroup,
    rootIndex: NaviIndex,
    maxColsPerWrappedRow: number[],
    nodeMap: NaviNodeMap,
    idMap: IdMap = {},
): NaviNode => {
    const getTopEdgeIndex = (index: NaviIndex) => {
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
        const bestAdjacentPositionAbove = Math.floor(col * maxColsAbove / maxColsCurrent + 0.5);

        const newCol = bestAdjacentPositionAbove >= lastWrappedPositionAbove
            ? lastColAbove
            : lastColAbove - lastWrappedPositionAbove + bestAdjacentPositionAbove;
        const newSub = getLastSub(newCol, newRow);
        return {
            col: newCol,
            row: newRow,
            sub: newSub,
        };
    };

    const getBottomEdgeIndex = (index: NaviIndex) => {
        const { col, row, sub } = index;

        const belowIsSameCol = !!getElement({ col: col, row: row, sub: sub + 1 });
        if (belowIsSameCol) {
            return {
                col: col,
                row: row,
                sub: sub + 1,
            };
        }

        const maxColsCurrent = maxColsPerWrappedRow[row];
        const firstColBelow = col + (maxColsCurrent - col % maxColsCurrent);
        const belowIsSameRowWrapped = !!getElement({ col: firstColBelow, row: row, sub: 0 });
        if (belowIsSameRowWrapped) {
            const newColAdjacent = col + maxColsCurrent;
            const newCol = !!getElement({ col: newColAdjacent, row: row, sub: 0 })
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
        const bestAdjacentPositionBelow = Math.floor(col * maxColsBelow / maxColsCurrent + 0.5) % maxColsBelow;
        const newCol = bestAdjacentPositionBelow < maxColsBelow
            ? bestAdjacentPositionBelow
            : maxColsBelow - 1;
        return {
            col: newCol,
            row: newRow,
            sub: 0,
        };
    };

    const getLeftEdgeIndex = (index: NaviIndex) => {
        const { col, row, sub } = index;
        const maxCols = maxColsPerWrappedRow[row];

        const newCol = col - 1;
        const isOutOfBounds = newCol % maxCols === maxCols - 1 || newCol < 0;
        if (isOutOfBounds) {
            return index;
        }

        const newSub = !!getElement({ col: newCol, row: row, sub })
            ? sub
            : getLastSub(newCol, row);
        return {
            col: newCol,
            row: row,
            sub: newSub,
        };
    };

    const getRightEdgeIndex = (index: NaviIndex) => {
        const { col, row, sub } = index;
        const maxCols = maxColsPerWrappedRow[row];

        const newCol = col + 1;
        const isOutOfBounds = newCol % maxCols === 0;
        if (isOutOfBounds) {
            return index;
        }

        const newSub = !!getElement({ col: newCol, row: row, sub })
            ? sub
            : getLastSub(newCol, row);
        return {
            col: newCol,
            row: row,
            sub: newSub,
        };
    };

    const getLastCol = (row: number, col: number = 0): number => {
        const nextCol = col + 1;
        if (getElement({ col: nextCol, row: row, sub: 0 })) {
            return getLastCol(row, nextCol);
        }
        return col;
    };

    const getLastSub = (col: number, row: number, sub: number = 0): number => {
        const nextSub = sub + 1;
        if (getElement({ col: col, row: row, sub: nextSub })) {
            return getLastSub(col, row, nextSub);
        }
        return sub;
    };

    const getElement = (index: NaviIndex) => (
        document.getElementById(getKbId(group, index, idMap)) as HTMLElement
    );

    const getNodeAtIndex = (index: NaviIndex): NaviNode => {
        if (!index || !getElement(index)) {
            return null;
        }

        const generatedId = getKbId(group, index, idMap);
        const id = idMap[generatedId] || generatedId;
        if (nodeMap[id]) {
            return nodeMap[id];
        }

        const node: NaviNode = {
            id: id,
            index: index,
            up: null,
            down: null,
            left: null,
            right: null,
        };

        nodeMap[id] = node;

        node.up = getNodeAtIndex(getTopEdgeIndex(index));
        node.down = getNodeAtIndex(getBottomEdgeIndex(index));
        node.left = getNodeAtIndex(getLeftEdgeIndex(index));
        node.right = getNodeAtIndex(getRightEdgeIndex(index));

        return node;
    };

    return getNodeAtIndex(rootIndex);
};
