import { MenyNode } from 'store/reducers/menu-duck';
import { Heading } from '@navikt/ds-react';
import React from 'react';
import { MenyLenke } from './MenyLenke';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import style from './MenyLenker.module.scss';

interface Props {
    menygruppe: MenyNode;
    colIndex: number;
    rowIndex: number;
    kbNodeGroup: KbNavGroup;
}

export const MenyLenkeSeksjon = ({ menygruppe, colIndex, rowIndex, kbNodeGroup }: Props) => {
    return (
        <section className={`${style.lenkeseksjon} lenkeseksjon`} aria-labelledby={`headerId_${menygruppe.id}`}>
            <Heading level="2" size="small" id={`headerId_${menygruppe.id}`} className={style.tittel}>
                {menygruppe.displayName}
            </Heading>
            <ul className={style.lenker}>
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
