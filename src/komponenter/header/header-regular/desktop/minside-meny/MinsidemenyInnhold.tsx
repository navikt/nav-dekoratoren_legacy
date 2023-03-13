import React from 'react';
import { BodyShort, Detail, Heading } from '@navikt/ds-react';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from 'komponenter/header/header-regular/common/meny-lenker/MenyLenkeSeksjon';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import Tekst from 'tekster/finn-tekst';
import { MinsideLockMsg } from 'komponenter/header/header-regular/common/minside-lock-msg/MinsideLockMsg';

import style from 'komponenter/header/header-regular/desktop/minside-meny/Minsidemeny.module.scss';

const nodeGroup = KbNavGroup.Minsidemeny;

type Props = {
    menyLenker: MenyNode | undefined;
    dittNavUrl: string;
    brukernavn: string;
    authLevel: string;
};

export const MinsidemenyInnhold = (props: Props) => {
    const { menyLenker, dittNavUrl, brukernavn, authLevel } = props;

    if (!menyLenker) {
        return null;
    }

    return (
        <>
            <div className={style.toppSeksjon}>
                <div className={style.toppSeksjonLeft}>
                    <Heading level="2" size="medium" className={style.toppSeksjonTittel}>
                        <Tekst id={'min-side'} />
                    </Heading>
                    <LenkeMedSporing
                        href={dittNavUrl}
                        id={KbNav.getKbId(nodeGroup, {
                            col: 0,
                            row: 0,
                            sub: 0,
                        })}
                        analyticsEventArgs={{
                            category: AnalyticsCategory.Header,
                            action: 'dittnav',
                            label: dittNavUrl,
                            lenkegruppe: 'innlogget meny',
                        }}
                    >
                        <Tekst id={'til-dittnav-forside'} />
                    </LenkeMedSporing>
                </div>
                <div className={style.toppSeksjonRight}>
                    <Detail>
                        <Tekst id={'logget-inn-som'} />
                    </Detail>
                    <BodyShort className={style.brukernavn}>{brukernavn}</BodyShort>
                </div>
            </div>
            {authLevel !== '4' && <MinsideLockMsg />}
            <div className={style.lenkeSeksjoner}>
                {menyLenker.children.map((menygruppe, index) => (
                    <MenyLenkeSeksjon
                        menygruppe={menygruppe}
                        colIndex={index}
                        rowIndex={1}
                        kbNodeGroup={nodeGroup}
                        key={menygruppe.displayName}
                    />
                ))}
            </div>
        </>
    );
};

export default MinsidemenyInnhold;
