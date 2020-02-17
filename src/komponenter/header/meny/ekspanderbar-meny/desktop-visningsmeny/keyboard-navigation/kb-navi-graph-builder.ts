import { getElement, getId, NaviGroup, NaviIndex, NaviNode, NaviNodeMap } from './kb-navigation';

const buildNaviGraphAndGetRootNode =
    (group: NaviGroup, index: NaviIndex | null, maxColsPerSection: number[], nodeMap: NaviNodeMap): NaviNode => {
    if (!index || !getElement(group, index)) {
        return null;
    }

    const {x, y, sub} = index;
    const id = getId(group, x, y, sub);
    if (nodeMap[id]) {
        return nodeMap[id];
    }

    const node: NaviNode = {
        id: id,
        index: index,
        up: null,
        down: null,
        left: null,
        right: null
    };

    nodeMap[id] = node;

    node.up = buildNaviGraphAndGetRootNode(group, getTopEdgeIndex(group, index, maxColsPerSection), maxColsPerSection, nodeMap);
    node.down = buildNaviGraphAndGetRootNode(group, getBottomEdgeIndex(group, index, maxColsPerSection), maxColsPerSection, nodeMap);
    node.left = buildNaviGraphAndGetRootNode(group, getLeftEdgeIndex(group, index, maxColsPerSection[y]), maxColsPerSection, nodeMap);
    node.right = buildNaviGraphAndGetRootNode(group, getRightEdgeIndex(group, index, maxColsPerSection[y]), maxColsPerSection, nodeMap);

    return node;
};

const getTopEdgeIndex = (group: NaviGroup, index: NaviIndex, maxColsPerSection: Array<number>) => {
    const {x, y, sub} = index;

    const aboveIsSameSubSection = sub > 0 && !!getElement(group, {x: x, y: y, sub: sub - 1});
    if (aboveIsSameSubSection) {
        return {
            x: x,
            y: y,
            sub: sub - 1
        };
    }

    const maxColsCurrent = maxColsPerSection[y];
    const aboveIsSameSection = x >= maxColsCurrent;
    if (aboveIsSameSection) {
        const newX = x - maxColsCurrent;
        const newSub = getLastSubIndex(group, {x: newX, y: y, sub: 0});
        return {
            x: newX,
            y: y,
            sub: newSub
        };
    }

    const newY = y - 1;
    if (newY < 0) {
        return index;
    }

    const maxColsAbove = maxColsPerSection[newY];
    const lastSectionAbove = getLastSectionIndex(group, newY);
    const lastColAbove = lastSectionAbove % maxColsAbove;
    const relativeX = Math.floor(x * maxColsAbove / maxColsCurrent + 0.5);

    const newX = relativeX >= lastColAbove
        ? lastSectionAbove
        : lastSectionAbove - lastColAbove + relativeX;
    const newSub = getLastSubIndex(group, {x: newX, y: newY, sub: 0});
    return {
        x: newX,
        y: newY,
        sub: newSub,
    };
};

const getBottomEdgeIndex = (group: NaviGroup, index: NaviIndex, maxColsPerSection: Array<number>) => {
    const {x, y, sub} = index;

    const belowIsSameSubSection = !!getElement(group, {x: x, y: y, sub: sub + 1});
    if (belowIsSameSubSection) {
        return {
            x: x,
            y: y,
            sub: sub + 1
        };
    }

    const maxColsCurrent = maxColsPerSection[y];
    const firstColBelow = x + (maxColsCurrent - x % maxColsCurrent);
    const belowIsSameSection = !!getElement(group, {x: firstColBelow, y: y, sub: 0});
    if (belowIsSameSection) {
        const newX = getRightmostColIndex(group, {x: x + maxColsCurrent, y: y, sub: 0});
        return {
            x: newX,
            y: y,
            sub: 0
        };
    }

    const newY = y + 1;
    const elementBelowExists = !!getElement(group, {x: 0, y: newY, sub: 0});
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

const getLeftEdgeIndex = (group: NaviGroup, index: NaviIndex, maxCols: number) => {
    const {x, y, sub} = index;

    const newX = x - 1;
    const isOutOfBounds = newX % maxCols === maxCols - 1 || newX < 0;
    if (isOutOfBounds) {
        return index;
    }

    const newSub = getNeighborSubIndex(group, {x: newX, y, sub});
    return {
        x: newX,
        y: y,
        sub: newSub
    };
};

const getRightEdgeIndex = (group: NaviGroup, index: NaviIndex, maxCols: number) => {
    const {x, y, sub} = index;

    const newX = x + 1;
    const isOutOfBounds = newX % maxCols === 0;
    if (isOutOfBounds) {
        return index;
    }

    const newSub = getNeighborSubIndex(group, {x: newX, y, sub});
    return {
        x: newX,
        y: y,
        sub: newSub
    };
};

const getLastSectionIndex = (group: NaviGroup, y: number, x: number = 0): number => {
    if (getElement(group, {x: x, y: y, sub: 0})) {
        return getLastSectionIndex(group, y, x + 1);
    }
    return x - 1;
};

const getRightmostColIndex = (group: NaviGroup, index: NaviIndex): number => {
    if (!getElement(group, index) && index.x > 0) {
        return getRightmostColIndex(group, {x: index.x - 1, y: index.y, sub: index.sub});
    }
    return index.x;
};

const getNeighborSubIndex = (navGroup: NaviGroup, ni: NaviIndex): number => {
    if (!getElement(navGroup, ni) && ni.sub > 0) {
        return getNeighborSubIndex(navGroup, {x: ni.x, y: ni.y, sub: ni.sub - 1});
    }
    return ni.sub;
};

const getLastSubIndex = (navGroup: NaviGroup, ni: NaviIndex): number => {
    const nextSubIndex = {x: ni.x, y: ni.y, sub: ni.sub + 1};
    if (getElement(navGroup, nextSubIndex)) {
        return getLastSubIndex(navGroup, nextSubIndex);
    }
    return ni.sub;
};

export default {
    buildNaviGraphAndGetRootNode
}
