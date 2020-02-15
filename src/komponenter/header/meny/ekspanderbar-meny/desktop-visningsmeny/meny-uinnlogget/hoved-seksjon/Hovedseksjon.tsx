import { MenySeksjon } from '../../../../../../../reducer/menu-duck';
import { HovedseksjonTema } from './HovedseksjonTema';
import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';

interface Props {
    menyLenker: MenySeksjon;
    classname: string;
    isOpen: boolean;
}

export const MenyUinnloggetHovedseksjon = ({menyLenker, classname, isOpen}: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('hoved-seksjon')}>
            {menyLenker && menyLenker.children.map((menygruppe: MenySeksjon) => (
                    <HovedseksjonTema
                        menygruppe={menygruppe}
                        isOpen={isOpen}
                        className={classname}
                        key={menygruppe.displayName}
                    />
                ),
            )}
        </div>
    );
};
