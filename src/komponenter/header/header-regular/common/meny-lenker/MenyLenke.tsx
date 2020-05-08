import React, { CSSProperties } from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { genererUrl } from 'utils/Environment';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
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
    const auth = useSelector((state: AppState) => state.innloggingsstatus.data);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const lockDisplay = props.displayLock && auth.securityLevel !== '4';
    const { lenke, isOpen, menyGruppeNavn } = props;
    const href = genererUrl(XP_BASE_URL, lenke.path);
    const lockStyle = {
        position: 'absolute',
        left: '-20px',
    } as CSSProperties;

    return (
        <li style={{ position: 'relative' }}>
            {lockDisplay && (
                <div style={lockStyle}>
                    <Lock height={'18px'} width={'18px'} />
                </div>
            )}
            <LenkeMedGA
                tabIndex={isOpen ? 0 : -1}
                href={href}
                id={props.id}
                gaEventArgs={{
                    category: GACategory.Meny,
                    action: `${menyGruppeNavn}/${lenke.displayName}`,
                    label: href,
                }}
                withChevron={true}
            >
                {lenke.displayName}
            </LenkeMedGA>
        </li>
    );
};
