import React from 'react';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import { genererUrl } from '../../../../../../utils/Environment';
import { GACategory } from '../../../../../../utils/google-analytics';
import GALenke from '../../../../../../utils/LenkeMedGAEvent';

interface Props {
    lenke: MenySeksjon;
    tabindex: boolean;
    menyGruppeNavn: string;
    listItemClassName?: string;
}

export const DropdownLenke = (props: Props) => {
    const { lenke, tabindex, menyGruppeNavn, listItemClassName } = props;
    const href = genererUrl(lenke.path);

    const gaAction = `${menyGruppeNavn}/${lenke.displayName}`;
    const gaEventArgs = {category: GACategory.Meny, action: gaAction, url: href};

    return (
        <li className={listItemClassName}>
            <GALenke
                tabIndex={tabindex ? 0 : -1}
                href={href}
                className={'lenke'}
                gaEventArgs={gaEventArgs}
            >
                {lenke.displayName}
            </GALenke>
        </li>
    );
};
