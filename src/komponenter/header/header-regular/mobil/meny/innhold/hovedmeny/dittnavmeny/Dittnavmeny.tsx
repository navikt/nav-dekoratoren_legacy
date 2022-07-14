import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import BEMHelper from 'utils/bem';
import { MobilMenypunkt } from '../kategorilenke/MobilMenypunkt';

type Props = {
    minsideLenker: MenyNode;
    openMeny: (menyElement: MenyNode) => void;
    className: string;
};

const Dittnavmeny = ({ openMeny, minsideLenker, className }: Props) => {
    const cls = BEMHelper(className);

    return (
        <ul className={cls.element('meny', 'minsidelist')}>
            {minsideLenker.children.map((menyElement: MenyNode, index: number) => (
                <li key={index}>
                    <MobilMenypunkt type={'kategori'} callback={() => openMeny(menyElement)}>
                        {menyElement.displayName}
                    </MobilMenypunkt>
                </li>
            ))}
        </ul>
    );
};

export default Dittnavmeny;
