import React from 'react';
import { MenySeksjon } from '../../../../../../../reducer/menu-duck';
import { genererUrl } from '../../../../../../../utils/Environment';
import '../UinnloggetDropdown.less';
import { LenkeMedGA } from '../../../../../../LenkeMedGA';
import { GACategory } from '../../../../../../../utils/google-analytics';

interface Props {
    lenke: MenySeksjon;
    isOpen: boolean;
    menyGruppeNavn: string;
    id: string;
}

export const HovedseksjonLenke = (props: Props) => {
    const { lenke, isOpen, menyGruppeNavn } = props;
    const href = genererUrl(lenke.path);

    return (
        <li>
            <LenkeMedGA
                tabIndex={isOpen ? 0 : -1}
                href={href}
                id={props.id}
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
