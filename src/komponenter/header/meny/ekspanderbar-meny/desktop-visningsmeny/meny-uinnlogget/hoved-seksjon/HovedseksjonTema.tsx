import { MenySeksjon } from '../../../../../../../reducer/menu-duck';
import React from 'react';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from '../../../../../../../utils/bem';
import { HovedseksjonLenke } from './HovedseksjonLenke';

interface Props {
    menygruppe: MenySeksjon;
    isOpen: boolean;
    className: string;
}

export const HovedseksjonTema = ({ menygruppe, isOpen, className }: Props) => {
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
                    return (
                        <HovedseksjonLenke key={index} lenke={lenke} isOpen={isOpen} />
                    );
                })}
            </ul>
        </section>
    );
};
