import { getKbId, IdMap, NaviGroup, NaviIndex, NaviNode, NaviNodeMap } from './kb-navigation';

export const buildNaviGraphAndGetRootNode = (
    group: NaviGroup,
    rootIndex: NaviIndex,
    maxColsPerSection: number[],
    nodeMap: NaviNodeMap,
    idMap: IdMap = {},
): NaviNode => {
    const getTopEdgeIndex = (index: NaviIndex) => {
        const { x, y, sub } = index;

        const aboveIsSameSubSection = sub > 0 && !!getElement({ x: x, y: y, sub: sub - 1 });
        if (aboveIsSameSubSection) {
            return {
                x: x,
                y: y,
                sub: sub - 1,
            };
        }

        const maxColsCurrent = maxColsPerSection[y];
        const aboveIsSameSection = x >= maxColsCurrent;
        if (aboveIsSameSection) {
            const newX = x - maxColsCurrent;
            const newSub = getLastSubIndex({ x: newX, y: y, sub: 0 });
            return {
                x: newX,
                y: y,
                sub: newSub,
            };
        }

        const newY = y - 1;
        if (newY < 0) {
            return index;
        }

        const maxColsAbove = maxColsPerSection[newY];
        const lastSectionAbove = getLastSectionIndex(newY);
        const lastColAbove = lastSectionAbove % maxColsAbove;
        const relativeX = Math.floor(x * maxColsAbove / maxColsCurrent + 0.5);

        const newX = relativeX >= lastColAbove
            ? lastSectionAbove
            : lastSectionAbove - lastColAbove + relativeX;
        const newSub = getLastSubIndex({ x: newX, y: newY, sub: 0 });
        return {
            x: newX,
            y: newY,
            sub: newSub,
        };
    };

    const getBottomEdgeIndex = (index: NaviIndex) => {
        const { x, y, sub } = index;

        const belowIsSameSubSection = !!getElement({ x: x, y: y, sub: sub + 1 });
        if (belowIsSameSubSection) {
            return {
                x: x,
                y: y,
                sub: sub + 1,
            };
        }

        const maxColsCurrent = maxColsPerSection[y];
        const firstColBelow = x + (maxColsCurrent - x % maxColsCurrent);
        const belowIsSameSection = !!getElement({ x: firstColBelow, y: y, sub: 0 });
        if (belowIsSameSection) {
            const newX = getRightmostColIndex({ x: x + maxColsCurrent, y: y, sub: 0 });
            return {
                x: newX,
                y: y,
                sub: 0,
            };
        }

        const newY = y + 1;
        const elementBelowExists = !!getElement({ x: 0, y: newY, sub: 0 });
        if (!elementBelowExists) {
            return index;
        }

        const maxColsBelow = maxColsPerSection[newY];
        const relativeX = Math.floor(x * maxColsBelow / maxColsCurrent + 0.5);

        const newXMax = relativeX % maxColsBelow;
        const newX = newXMax < maxColsBelow ? newXMax : maxColsBelow - 1;
        return {
            x: newX,
            y: newY,
            sub: 0,
        };
    };

    const getLeftEdgeIndex = (index: NaviIndex) => {
        const { x, y, sub } = index;
        const maxCols = maxColsPerSection[y];

        const newX = x - 1;
        const isOutOfBounds = newX % maxCols === maxCols - 1 || newX < 0;
        if (isOutOfBounds) {
            return index;
        }

        const newSub = getNeighborSubIndex({ x: newX, y, sub });
        return {
            x: newX,
            y: y,
            sub: newSub,
        };
    };

    const getRightEdgeIndex = (index: NaviIndex) => {
        const { x, y, sub } = index;
        const maxCols = maxColsPerSection[y];

        const newX = x + 1;
        const isOutOfBounds = newX % maxCols === 0;
        if (isOutOfBounds) {
            return index;
        }

        const newSub = getNeighborSubIndex({ x: newX, y, sub });
        return {
            x: newX,
            y: y,
            sub: newSub,
        };
    };

    const getLastSectionIndex = (y: number, x: number = 0): number => {
        if (getElement({ x: x, y: y, sub: 0 })) {
            return getLastSectionIndex(y, x + 1);
        }
        return x - 1;
    };

    const getRightmostColIndex = (index: NaviIndex): number => {
        if (!getElement(index) && index.x > 0) {
            return getRightmostColIndex({ x: index.x - 1, y: index.y, sub: index.sub });
        }
        return index.x;
    };

    const getNeighborSubIndex = (index: NaviIndex): number => {
        if (!getElement(index) && index.sub > 0) {
            return getNeighborSubIndex({ x: index.x, y: index.y, sub: index.sub - 1 });
        }
        return index.sub;
    };

    const getLastSubIndex = (index: NaviIndex): number => {
        const nextSubIndex = { x: index.x, y: index.y, sub: index.sub + 1 };
        if (getElement(nextSubIndex)) {
            return getLastSubIndex(nextSubIndex);
        }
        return index.sub;
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
