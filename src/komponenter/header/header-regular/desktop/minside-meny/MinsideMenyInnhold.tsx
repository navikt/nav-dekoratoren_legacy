import React from 'react';
import BEMHelper from 'utils/bem';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from 'komponenter/header/header-regular/common/meny-lenker/MenyLenkeSeksjon';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import Tekst from 'tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import MinsideLockMsg from 'komponenter/header/header-regular/common/minside-lock-msg/MinsideLockMsg';
import { Normaltekst } from 'nav-frontend-typografi';
import { UndertekstBold } from 'nav-frontend-typografi';

const nodeGroup = KbNavGroup.MinsideMeny;

type Props = {
    classname: string;
    menyLenker: MenyNode | undefined;
    dittNavUrl: string;
    brukernavn: string;
    authLevel: string;
};

export const MinsideMenyInnhold = (props: Props) => {
    const { classname, menyLenker, dittNavUrl, brukernavn, authLevel } = props;

    if (!menyLenker) {
        return null;
    }

    const cls = BEMHelper(classname);

    return (
        <>
            <div className={cls.element('topp-seksjon')}>
                <div className={cls.element('topp-seksjon-left')}>
                    <Systemtittel
                        className={cls.element('topp-seksjon-tittel')}
                    >
                        <Tekst id={'min-side'} />
                    </Systemtittel>
                    <LenkeMedGA
                        href={dittNavUrl}
                        id={KbNav.getKbId(nodeGroup, {
                            col: 0,
                            row: 0,
                            sub: 0,
                        })}
                        gaEventArgs={{
                            category: GACategory.Header,
                            action: 'dittnav',
                            label: dittNavUrl,
                        }}
                    >
                        <Tekst id={'til-forside'} />
                    </LenkeMedGA>
                </div>
                <div className={cls.element('topp-seksjon-right')}>
                    <UndertekstBold>
                        <Tekst id={'logget-inn-som'} />
                    </UndertekstBold>
                    <Normaltekst className={cls.element('brukernavn')}>
                        {brukernavn}
                    </Normaltekst>
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

export default MinsideMenyInnhold;
