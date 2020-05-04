import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { genererUrl } from 'utils/Environment';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Lock from 'ikoner/meny/Lock';

interface Props {
    lenke: MenyNode;
    isOpen: boolean;
    displayLock?: boolean;
    menyGruppeNavn: string;
    id: string;
}

export const MenyLenke = (props: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const { lenke, isOpen, menyGruppeNavn } = props;
    const href = genererUrl(XP_BASE_URL, lenke.path);

    return (
        <li>
            {props.displayLock && <Lock height={'16px'} width={'16px'} />}
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
