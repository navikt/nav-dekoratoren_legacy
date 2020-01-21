import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import { genererUrl } from '../../../../../../utils/Environment';

interface Props {
    lenke: MenySeksjon;
    tabindex: boolean;
    listItemClassName?: string;
}

export const DropdownLenke = (props: Props) => {
    const { lenke, tabindex, listItemClassName } = props;

    const href = genererUrl(lenke.path);
    return (
        <li className={listItemClassName}>
            <Lenke tabIndex={tabindex ? 0 : -1} href={href}>
                {lenke.displayName}
            </Lenke>
        </li>
    );
};
