import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { genererUrl } from 'utils/Environment';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

interface Props {
    lenke: MenyNode;
    displayLock?: boolean;
    menyGruppeNavn: string;
    id: string;
}

export const MenyLenke = (props: Props) => {
    const auth = useSelector((state: AppState) => state.innloggingsstatus.data);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const displayLock = props.displayLock && auth.securityLevel !== '4';
    const { lenke, menyGruppeNavn } = props;
    const href = genererUrl(XP_BASE_URL, lenke.path);

    return (
        <li>
            <LenkeMedGA
                href={href}
                id={props.id}
                gaEventArgs={{
                    category: GACategory.Meny,
                    action: `${menyGruppeNavn}/${lenke.displayName}`,
                    label: href,
                }}
                withChevron={true}
                withLock={displayLock}
            >
                {lenke.displayName}
            </LenkeMedGA>
        </li>
    );
};
