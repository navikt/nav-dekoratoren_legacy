import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    lenke: any;
    index: number;
    tabindex: boolean;
}

export const DropdownVenstreLenke = (props: Props) => {
    const { lenke, index, tabindex } = props;

    const goto = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault();
        window.location.href = url;
    };

    return (
        <li key={index}>
            <a
                tabIndex={tabindex ? 0 : -1}
                href={lenke.path}
                onClick={event => goto(event, lenke.path)}
            >
                <Normaltekst>{lenke.displayName}</Normaltekst>
            </a>
        </li>
    );
};
