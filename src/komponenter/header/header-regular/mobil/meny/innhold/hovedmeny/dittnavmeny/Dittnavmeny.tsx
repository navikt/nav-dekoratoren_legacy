import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import BEMHelper from 'utils/bem';
import { MobilMenyKategoriLenke } from '../kategorilenke/MobilMenyKategoriLenke';

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
                    <MobilMenyKategoriLenke callback={() => openMeny(menyElement)}>
                        {menyElement.displayName}
                    </MobilMenyKategoriLenke>
                </li>
            ))}
        </ul>
    );
};

export default Dittnavmeny;
