import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { genererUrl } from 'utils/Environment';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { lukkAlleDropdowns } from 'store/reducers/dropdown-toggle-duck';

interface Props {
    lenke: MenyNode;
    displayLock?: boolean;
    menyGruppeNavn: string;
    id: string;
}

export const MenyLenke = (props: Props) => {
    const auth = useSelector((state: AppState) => state.innloggingsstatus.data);
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const dispatch = useDispatch();

    const displayLock = props.displayLock && auth.securityLevel !== '4';
    const { lenke, menyGruppeNavn } = props;
    const href = genererUrl(XP_BASE_URL, lenke.path);

    return (
        <li>
            <LenkeMedSporing
                href={href}
                id={props.id}
                analyticsEventArgs={{
                    category: AnalyticsCategory.Meny,
                    action: `${menyGruppeNavn}/${lenke.displayName}`,
                    label: href,
                }}
                withChevron={true}
                withLock={displayLock}
                onClick={() => dispatch(lukkAlleDropdowns())}
            >
                {lenke.displayName}
            </LenkeMedSporing>
        </li>
    );
};
