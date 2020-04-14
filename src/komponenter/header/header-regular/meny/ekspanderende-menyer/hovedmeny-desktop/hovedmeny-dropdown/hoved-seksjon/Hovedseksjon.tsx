import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from '../../../meny-lenker/MenyLenkeSeksjon';
import BEMHelper from 'utils/bem';
import { NaviGroup } from 'utils/keyboard-navigation/kb-navigation';
import './Hovedseksjon.less';

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
                    <MenyLenkeSeksjon
                        menygruppe={menygruppe}
                        isOpen={isOpen}
                        colIndex={index}
                        rowIndex={2}
                        kbNaviGroup={NaviGroup.Hovedmeny}
                        key={menygruppe.displayName}
                    />
                ))}
        </div>
    );
};
