import { MenyNode } from '../../../../../../reducer/menu-duck';
import React from 'react';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from '../../../../../../utils/bem';
import { MenyLenke } from './MenyLenke';
import KbNav, {
    NaviGroup,
} from '../../../../../../utils/keyboard-navigation/kb-navigation';
import './MenyLenker.less';

interface Props {
    menygruppe: MenyNode;
    isOpen: boolean;
    colIndex: number;
    rowIndex: number;
    kbNaviGroup: NaviGroup;
}

export const MenyLenkeSeksjon = ({
    menygruppe,
    isOpen,
    colIndex,
    rowIndex,
    kbNaviGroup,
}: Props) => {
    const classname = 'lenkeseksjon';
    const cls = BEMHelper(classname);

    return (
        <section className={classname}>
            <div className={cls.element('tittel')}>
                <Element>{menygruppe.displayName}</Element>
            </div>
            <ul className={cls.element('lenker')}>
                {menygruppe.children.map((lenke: MenyNode, index: number) => {
                    const kbNaviIndex = {
                        col: colIndex,
                        row: rowIndex,
                        sub: index,
                    };
                    return (
                        <MenyLenke
                            key={index}
                            lenke={lenke}
                            isOpen={isOpen}
                            menyGruppeNavn={menygruppe.displayName}
                            id={KbNav.getKbId(kbNaviGroup, kbNaviIndex)}
                        />
                    );
                })}
            </ul>
        </section>
    );
};
