import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { MenySeksjon } from '../../../../../../../reducer/menu-duck';
import { genererUrl } from '../../../../../../../utils/Environment';
import '../MenyUinnlogget.less';

interface Props {
    lenke: MenySeksjon;
    isOpen: boolean;
    id: string;
}

export const HovedseksjonLenke = (props: Props) => {
    const { lenke, isOpen } = props;
    const href = genererUrl(lenke.path);

    return (
        <li>
            <Lenke tabIndex={isOpen ? 0 : -1} href={href} id={props.id}>
                {lenke.displayName}
            </Lenke>
        </li>
    );
};
