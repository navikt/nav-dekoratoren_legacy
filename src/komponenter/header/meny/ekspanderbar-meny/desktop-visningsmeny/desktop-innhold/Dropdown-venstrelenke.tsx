import React from 'react';
import { MenySeksjon } from '../../../../../../reducer/menu-duck';
import { genererUrl } from '../../../../../../utils/Environment';
import { GACategory } from '../../../../../../utils/google-analytics';
import { LenkeMedGA } from '../../../../../../utils/LenkeMedGAEvent';

interface Props {
    lenke: MenySeksjon;
    tabindex: boolean;
    menyGruppeNavn: string;
    listItemClassName?: string;
}

export const DropdownLenke = (props: Props) => {
    const { lenke, tabindex, menyGruppeNavn, listItemClassName } = props;
    const href = genererUrl(lenke.path);

    return (
        <li className={listItemClassName}>
            <LenkeMedGA
                tabIndex={tabindex ? 0 : -1}
                href={href}
                gaEventArgs={{
                    category: GACategory.Meny,
                    action: `${menyGruppeNavn}/${lenke.displayName}`,
                    label: href,
                }}
            >
                {lenke.displayName}
            </LenkeMedGA>
        </li>
    );
};
