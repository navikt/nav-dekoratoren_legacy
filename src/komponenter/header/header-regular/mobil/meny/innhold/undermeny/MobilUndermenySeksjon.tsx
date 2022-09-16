import React from 'react';
import { Heading } from '@navikt/ds-react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../store/reducers';
import { MenyNode } from '../../../../../../../store/reducers/menu-duck';
import { MinsideLockMsg } from '../../../../common/minside-lock-msg/MinsideLockMsg';
import { genererUrl } from '../../../../../../../utils/Environment';
import { AnalyticsCategory } from '../../../../../../../utils/analytics/analytics';
import { UnstyledList } from '../utils/UnstyledList';
import { MobilMenypunkt } from '../hovedmeny/menypunkt/MobilMenypunkt';

import './MobilUndermenySeksjon.less';

const stateSelector = (state: AppState) => ({
    auth: state.innloggingsstatus.data,
    XP_BASE_URL: state.environment.XP_BASE_URL,
});

type Props = {
    lenker: MenyNode;
};

export const MobilUndermenySeksjon = ({ lenker }: Props) => {
    const { auth, XP_BASE_URL } = useSelector(stateSelector);

    const showSecurityLevelWarning = auth.securityLevel !== '4' && lenker.children.some((lenke) => lenke.displayLock);

    return (
        <>
            <Heading level={'2'} size={'medium'} className={'mobilUndermenySeksjonHeader'}>
                {lenker.displayName}
            </Heading>
            {showSecurityLevelWarning && <MinsideLockMsg />}
            <UnstyledList className={'mobilUndermenyListe'}>
                {lenker.children.map((lenke, index) => {
                    const displayLock = lenke.displayLock && auth.securityLevel !== '4';
                    const href = genererUrl(XP_BASE_URL, lenke.path);
                    return (
                        <MobilMenypunkt
                            tekst={lenke.displayName}
                            type={'lenke'}
                            href={href}
                            withLock={displayLock}
                            analyticsEventArgs={{
                                category: AnalyticsCategory.Meny,
                                action: `${lenker.displayName}/${lenke.displayName}`,
                                label: href,
                                ...(lenke.isMyPageMenu && { lenkegruppe: 'innlogget meny' }),
                            }}
                            key={index}
                        />
                    );
                })}
            </UnstyledList>
        </>
    );
};
