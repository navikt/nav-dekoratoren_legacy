import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Environments from '../../../../utils/environments';
import { MenyLenke } from '../../../../reducer/menu-duck';

const { baseUrlEnonic } = Environments();

interface Props {
    lenke: MenyLenke;
    tabindex: boolean;
}

const genererUrl = (lenke: string): string => {
    if (lenke.startsWith('/')) {
        return baseUrlEnonic + lenke;
    }
    return lenke;
};

export const DropdownVenstreLenke = (props: Props) => {
    const { lenke, tabindex } = props;

    const href = genererUrl(lenke.path);
    return (
        <li>
            <Lenke tabIndex={tabindex ? 0 : -1} href={href}>
                {lenke.displayName}
            </Lenke>
        </li>
    );
};
