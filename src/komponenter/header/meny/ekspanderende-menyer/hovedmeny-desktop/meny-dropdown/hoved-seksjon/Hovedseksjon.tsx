import { MenyNode } from '../../../../../../../reducer/menu-duck';
import { MenyLenkeKategori } from '../../../meny-lenker/MenyLenkeKategori';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';

interface Props {
    menyLenker: MenyNode;
    classname: string;
    isOpen: boolean;
}

export const Hovedseksjon = ({ menyLenker, classname, isOpen }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('hoved-seksjon')}>
            {menyLenker &&
                menyLenker.children.map((menygruppe, index) => (
                    <MenyLenkeKategori
                        menygruppe={menygruppe}
                        isOpen={isOpen}
                        className={classname}
                        temaIndex={index}
                        key={menygruppe.displayName}
                    />
                ))}
        </div>
    );
};
