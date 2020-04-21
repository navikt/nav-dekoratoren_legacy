import React from 'react';
import { LenkeMedGA } from 'komponenter/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { genererUrl } from 'utils/Environment';

interface Props {
    displayName: string;
    path: string;
}

export const FooterLenker = ({ displayName, path }: Props) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    return (
        <LenkeMedGA
            href={genererUrl(XP_BASE_URL, path)}
            gaEventArgs={{
                category: GACategory.Footer,
                action: `kontakt/${path}`,
                label: displayName,
            }}
        >
            {displayName}
        </LenkeMedGA>
    );
};

export default FooterLenker;
