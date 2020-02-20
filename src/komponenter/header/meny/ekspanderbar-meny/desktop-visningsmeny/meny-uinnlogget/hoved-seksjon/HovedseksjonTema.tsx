import { MenySeksjon } from '../../../../../../../reducer/menu-duck';
import React from 'react';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from '../../../../../../../utils/bem';
import { HovedseksjonLenke } from './HovedseksjonLenke';
import KbNav, { NaviGroup } from '../../keyboard-navigation/kb-navigation';

interface Props {
    menygruppe: MenySeksjon;
    isOpen: boolean;
    className: string;
    temaIndex: number;
}

export const HovedseksjonTema = ({ menygruppe, isOpen, className, temaIndex }: Props) => {
    const cls = BEMHelper(className);

    return (
        <section
            className={cls.element('hoved-seksjon-tema')}
        >
            <div
                className={cls.element('hoved-seksjon-tema-tittel')}
            >
                <Element>{menygruppe.displayName}</Element>
            </div>
            <ul className={cls.element('hoved-seksjon-tema-lenker')}>
                {menygruppe.children.map((lenke: MenySeksjon, index: number) => {
                    const kbNaviIndex = {col: temaIndex, row: 2, sub: index};
                    return (
                        <HovedseksjonLenke
                            key={index}
                            lenke={lenke}
                            isOpen={isOpen}
                            menyGruppeNavn={menygruppe.displayName}
                            id={KbNav.getKbId(NaviGroup.DesktopHeaderDropdown, kbNaviIndex)}
                        />
                    );
                })}
            </ul>
        </section>
    );
};
