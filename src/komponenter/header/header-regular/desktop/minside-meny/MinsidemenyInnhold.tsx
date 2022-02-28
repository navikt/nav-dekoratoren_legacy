import React from 'react';
import BEMHelper from 'utils/bem';
import { BodyShort, Detail, Heading } from '@navikt/ds-react';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from 'komponenter/header/header-regular/common/meny-lenker/MenyLenkeSeksjon';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { LenkeMedSporing } from 'komponenter/common/lenke-med-sporing/LenkeMedSporing';
import { AnalyticsCategory } from 'utils/analytics';
import Tekst from 'tekster/finn-tekst';
import MinsideLockMsg from 'komponenter/header/header-regular/common/minside-lock-msg/MinsideLockMsg';

const nodeGroup = KbNavGroup.Minsidemeny;

type Props = {
    classname: string;
    menyLenker: MenyNode | undefined;
    dittNavUrl: string;
    brukernavn: string;
    authLevel: string;
};

export const MinsidemenyInnhold = (props: Props) => {
    const { classname, menyLenker, dittNavUrl, brukernavn, authLevel } = props;

    if (!menyLenker) {
        return null;
    }

    const cls = BEMHelper(classname);

    return (
        <>
            <div className={cls.element('topp-seksjon')}>
                <div className={cls.element('topp-seksjon-left')}>
                    <Heading level="2" size="medium" className={cls.element('topp-seksjon-tittel')}>
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
                        }}
                    >
                        <Tekst id={'til-dittnav-forside'} />
                    </LenkeMedSporing>
                </div>
                <div className={cls.element('topp-seksjon-right')}>
                    <Detail>
                        <Tekst id={'logget-inn-som'} />
                    </Detail>
                    <BodyShort className={cls.element('brukernavn')}>{brukernavn}</BodyShort>
                </div>
            </div>
            {authLevel !== '4' && <MinsideLockMsg />}
            <div className={cls.element('lenke-seksjoner')}>
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
