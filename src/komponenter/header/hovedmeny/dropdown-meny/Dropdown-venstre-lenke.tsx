import React from 'react';
import Lenke from 'nav-frontend-lenker';

interface Props {
    lenke: any;
    index: number;
    tabindex: boolean;
}

export const DropdownVenstreLenke = (props: Props) => {
    const { lenke, index, tabindex } = props;

    return (
        <li key={index}>
            <Lenke tabIndex={tabindex ? 0 : -1} href={lenke.path}>
                {lenke.displayName}
            </Lenke>
        </li>
    );
};
