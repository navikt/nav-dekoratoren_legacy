import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { MobilMenypunkt } from '../menypunkt/MobilMenypunkt';
import { UnstyledList } from '../../utils/UnstyledList';

import './DittNavMeny.less';

type Props = {
    minsideLenker: MenyNode;
    setUnderMeny: (menyElement: MenyNode) => void;
};

export const DittNavMeny = ({ setUnderMeny, minsideLenker }: Props) => {
    return (
        <UnstyledList className={'mobilDittNavMeny'}>
            {minsideLenker.children.map((menyElement: MenyNode, index: number) => (
                <MobilMenypunkt type={'kategori'} callback={() => setUnderMeny(menyElement)} key={index}>
                    {menyElement.displayName}
                </MobilMenypunkt>
            ))}
        </UnstyledList>
    );
};
//
