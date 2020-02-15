import React, { useEffect, useRef, useState } from 'react';
import BEMHelper from '../../../../../../utils/bem';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import Toppseksjon from './topp-seksjon/Toppseksjon';
import BunnSeksjon from './bunn-seksjon/BunnSeksjon';
import './MenyUinnlogget.less';
import { MenyUinnloggetHovedseksjon } from './hoved-seksjon/Hovedseksjon';
import KbNav, { NavGroup, NavIndex } from '../../../../../../utils/kb-nav';

interface Props {
    classname: string;
    menyLenker: MenySeksjon;
    isOpen: boolean;
}

const numCols = 5;  // TODO: synce dette med CSS somehow
const kbNavGroup = NavGroup.DesktopHeaderDropdown;

const MenyUinnlogget = (props: Props) => {
    const { classname, menyLenker, isOpen } = props;
    const cls = BEMHelper(classname);

    // TODO: finn nåværende focus-element
    const [navIndex, _setNavIndex] = useState<NavIndex>({x: 1, y: 1});
    const navIndexRef = useRef(navIndex);
    const setNavIndex = (ni: NavIndex) => {
        navIndexRef.current = ni;
        _setNavIndex(ni);
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const element = window.document.getElementsByClassName('asdflenke') as HTMLCollectionOf<Element>;

        if (element) {
            console.log(element);
            (element[1] as HTMLElement).focus();
        }

        const eventHandler = KbNav.kbEventHandler(
            navIndexRef.current, kbNavGroup, (ni: NavIndex) => setNavIndex(ni));

        window.document.addEventListener('keydown', eventHandler);
        return () => {
            window.document.removeEventListener('keydown', eventHandler);
        };
    }, [isOpen, navIndexRef.current]);

    return (
        <div className={cls.element('meny-uinnlogget')}>
            <Toppseksjon
                classname={classname}
                arbeidsflate={menyLenker.displayName}
            />
            <MenyUinnloggetHovedseksjon
                menyLenker={menyLenker}
                classname={classname}
                isOpen={isOpen}
            />
            <BunnSeksjon
                classname={classname}
            />
        </div>
    );
};

export default MenyUinnlogget;
