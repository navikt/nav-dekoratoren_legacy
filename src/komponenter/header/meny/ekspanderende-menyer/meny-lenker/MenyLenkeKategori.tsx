import { MenyNode } from '../../../../../reducer/menu-duck';
import React from 'react';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from '../../../../../utils/bem';
import { MenyLenke } from './MenyLenke';
import KbNav, {
    NaviGroup,
} from '../../../../../utils/keyboard-navigation/kb-navigation';

interface Props {
    menygruppe: MenyNode;
    isOpen: boolean;
    className: string;
    temaIndex: number;
}

export const MenyLenkeKategori = ({
    menygruppe,
    isOpen,
    className,
    temaIndex,
}: Props) => {
    const cls = BEMHelper(className);

    return (
        <section className={cls.element('kategori')}>
            <div className={cls.element('kategori-tittel')}>
                <Element>{menygruppe.displayName}</Element>
            </div>
            <ul className={cls.element('lenker')}>
                {menygruppe.children.map(
                    (lenke: MenyNode, index: number) => {
                        const kbNaviIndex = {
                            col: temaIndex,
                            row: 2,
                            sub: index,
                        };
                        return (
                            <MenyLenke
                                key={index}
                                lenke={lenke}
                                isOpen={isOpen}
                                menyGruppeNavn={menygruppe.displayName}
                                id={KbNav.getKbId(
                                    NaviGroup.DesktopHeaderDropdown,
                                    kbNaviIndex
                                )}
                            />
                        );
                    }
                )}
            </ul>
        </section>
    );
};
