import React from 'react';
import { Heading } from '@navikt/ds-react';
import { BEMWrapper } from '../../../../../../../utils/bem';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../store/reducers';
import { MenyNode } from '../../../../../../../store/reducers/menu-duck';
import { MinsideLockMsg } from '../../../../common/minside-lock-msg/MinsideLockMsg';
import { genererUrl } from '../../../../../../../utils/Environment';
import Listelement from '../utils/Listelement';
import { LenkeMedSporing } from '../../../../../../common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from '../../../../../../../utils/analytics/analytics';

import './MobilUndermenySeksjon.less';

const stateSelector = (state: AppState) => ({
    auth: state.innloggingsstatus.data,
    XP_BASE_URL: state.environment.XP_BASE_URL,
});

type Props = {
    menyClass: BEMWrapper;
    lenker: MenyNode;
};

export const MobilUndermenySeksjon = ({ menyClass, lenker }: Props) => {
    const { auth, XP_BASE_URL } = useSelector(stateSelector);

    const showSecurityLevelWarning = auth.securityLevel !== '4' && lenker.children.some((lenke) => lenke.displayLock);

    return (
        <>
            <Heading level={'2'} size={'medium'} className={'mobilUndermenySeksjonHeader'}>
                {lenker.displayName}
            </Heading>
            {showSecurityLevelWarning && <MinsideLockMsg />}
            <ul className={menyClass.element('meny', 'list')}>
                {lenker.children.map((lenke, index: number) => {
                    const displayLock = lenke.displayLock && auth.securityLevel !== '4';
                    const href = genererUrl(XP_BASE_URL, lenke.path);
                    return (
                        <Listelement
                            key={index}
                            className={menyClass.className}
                            classElement={'text-element-undermeny'}
                        >
                            <LenkeMedSporing
                                href={href}
                                withChevron={true}
                                withLock={displayLock}
                                analyticsEventArgs={{
                                    category: AnalyticsCategory.Meny,
                                    action: `${lenker.displayName}/${lenke.displayName}`,
                                    label: href,
                                    ...(lenke.isMyPageMenu && { lenkegruppe: 'innlogget meny' }),
                                }}
                            >
                                {lenke.displayName}
                            </LenkeMedSporing>
                        </Listelement>
                    );
                })}
            </ul>
        </>
    );
};
