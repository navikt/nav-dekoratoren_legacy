import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Environments from '../../../../../../utils/environments';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';

const { baseUrlEnonic } = Environments();

interface Props {
    lenke: MenySeksjon;
    tabindex: boolean;
    listItemClassName?: string;
}

const genererUrl = (lenke: string): string => {
    if (lenke.startsWith('/')) {
        return baseUrlEnonic + lenke;
    }
    return lenke;
};

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
