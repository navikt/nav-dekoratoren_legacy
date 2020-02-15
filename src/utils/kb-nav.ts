
export enum NavGroup {
    DesktopHeaderDropdown = 'desktop-meny-lenke'
}

export type NavIndex = {
    x: number,
    y: number
}

const getId = (navGroup: NavGroup, x: number, y: number) => `${navGroup}_${x}_${y}`;

const setFocus = (navGroup: NavGroup, navIndex: NavIndex): boolean => {
    const element = window.document.getElementById(getId(navGroup, navIndex.x, navIndex.y)) as HTMLElement;

    if (!element) {
        return false;
    }

    element.focus();
    return true;
};

const kbEventHandler =
    (navIndex: NavIndex, navGroup: NavGroup, setNavIndex: (navIndex: NavIndex) => void) =>
        (event: KeyboardEvent) => {
            let ni;
            const {x, y} = navIndex;
            if (event.key === 'ArrowUp') {
                ni = {x: x, y: Math.max(y - 1, 1)};
            } else if (event.key === 'ArrowDown') {
                ni = {x: x, y: y + 1};
            } else if (event.key === 'ArrowLeft') {
                ni = {x: Math.max(x - 1, 1), y: y};
            } else if (event.key === 'ArrowRight') {
                ni = {x: x + 1, y: y};
            } else {
                return;
            }

            event.preventDefault();

            if (setFocus(navGroup, ni)) {
                setNavIndex(ni);
            }
        };

export default {
    getId,
    kbEventHandler,
};
