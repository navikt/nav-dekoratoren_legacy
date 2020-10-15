import { MenyNode } from 'store/reducers/menu-duck';
import React from 'react';
import BEMHelper from 'utils/bem';
import { MenyLenke } from './MenyLenke';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { Undertittel } from 'nav-frontend-typografi';
import './MenyLenker.less';

interface Props {
    menygruppe: MenyNode;
    colIndex: number;
    rowIndex: number;
    kbNodeGroup: KbNavGroup;
}

export const MenyLenkeSeksjon = ({ menygruppe, colIndex, rowIndex, kbNodeGroup }: Props) => {
    const classname = 'lenkeseksjon';
    const cls = BEMHelper(classname);

    return (
        <section className={classname} aria-labelledby={`headerId_${menygruppe.id}`}>
            <Undertittel id={`headerId_${menygruppe.id}`} className={cls.element('tittel')}>
                {menygruppe.displayName}
            </Undertittel>
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
                            displayLock={lenke.displayLock}
                            menyGruppeNavn={menygruppe.displayName}
                            id={KbNav.getKbId(kbNodeGroup, kbNaviIndex)}
                        />
                    );
                })}
            </ul>
        </section>
    );
};
