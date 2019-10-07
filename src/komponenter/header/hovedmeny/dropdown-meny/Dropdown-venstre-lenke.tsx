import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Environments from '../../../../utils/environments';

const { baseUrlEnonic } = Environments();

interface Props {
    lenke: any;
    index: number;
    tabindex: boolean;
}

const genererUrl = (lenke: string): string => {
    if (lenke.startsWith('/')) {
        return baseUrlEnonic + lenke;
    }
    return lenke;
};

export const DropdownVenstreLenke = (props: Props) => {
    const { lenke, index, tabindex } = props;

    const href = genererUrl(lenke.path);
    return (
        <li key={index}>
            <Lenke tabIndex={tabindex ? 0 : -1} href={href}>
                {lenke.displayName}
            </Lenke>
        </li>
    );
};
