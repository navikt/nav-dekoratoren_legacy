import React from 'react';
import BEMHelper from '../../../../../../utils/bem';
import { MenyNode } from '../../../../../../reducer/menu-duck';
import { Hovedseksjon } from '../../hovedmeny-desktop/meny-dropdown/hoved-seksjon/Hovedseksjon';

type Props = {
    classname: string,
    isOpen: boolean,
    menyLenker: MenyNode | undefined,
}

export const MinsideDropdown = ({ classname, isOpen, menyLenker }: Props) => {
    const cls = BEMHelper(classname);

    if (!menyLenker) {
        return null;
    }

    return (
        <div className={cls.element('dropdown')}>
            <Hovedseksjon
                menyLenker={menyLenker}
                classname={classname}
                isOpen={isOpen}
            />
        </div>
    );
};

export default MinsideDropdown;
