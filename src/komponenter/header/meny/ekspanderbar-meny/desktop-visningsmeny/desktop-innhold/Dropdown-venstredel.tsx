import React from 'react';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from '../../../../../../utils/bem';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import { DropdownLenke } from './Dropdown-venstrelenke';

interface Props {
    classname: string;
    menyLenker: MenySeksjon;
    tabindex: boolean;
}

const DropdownVenstredel = (props: Props) => {
    const { classname, menyLenker, tabindex } = props;
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('hovedSeksjon')}>
            {menyLenker.children.map(
                (menygruppe: MenySeksjon, index: number) => {
                    return (
                        <section className={cls.element('seksjon')} key={index}>
                            <div className={cls.element('seksjonOverskrift')}>
                                <Element>{menygruppe.displayName}</Element>
                                <Menylenker
                                    menygruppe={menygruppe}
                                    tabindex={tabindex}
                                />
                            </div>
                        </section>
                    );
                }
            )}
        </div>
    );
};

interface MenylenkerProps {
    menygruppe: MenySeksjon;
    tabindex: boolean;
}

const Menylenker = ({ menygruppe, tabindex }: MenylenkerProps) => (
    <ul>
        {menygruppe.children.map((lenke: MenySeksjon, index: number) => {
            return (
                <DropdownLenke key={index} lenke={lenke} tabindex={tabindex} />
            );
        })}
    </ul>
);

export default DropdownVenstredel;
