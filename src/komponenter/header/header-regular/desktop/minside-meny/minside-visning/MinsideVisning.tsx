import React from 'react';
import BEMHelper from 'utils/bem';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from 'komponenter/header/header-regular/common/meny-lenker/MenyLenkeSeksjon';
import KbNav, { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { LenkeMedGA } from 'komponenter/common/lenke-med-ga/LenkeMedGA';
import { GACategory } from 'utils/google-analytics';
import Tekst from 'tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import MinsideDropdownLockMsg from './MinsideDropdownLockMsg';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { Normaltekst } from 'nav-frontend-typografi';
import { UndertekstBold } from 'nav-frontend-typografi';

type Props = {
    classname: string;
    isOpen: boolean;
    menyLenker: MenyNode | undefined;
    dittNavUrl: string;
    brukerNavn: string;
};

const nodeGroup = KbNavGroup.MinsideMeny;

export const MinsideVisning = (props: Props) => {
    const { classname, isOpen, menyLenker, dittNavUrl, brukerNavn } = props;
    const auth = useSelector((state: AppState) => state.innloggingsstatus.data);

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
                        {brukerNavn}
                    </Normaltekst>
                </div>
            </div>
            {auth.securityLevel !== '4' && (
                <MinsideDropdownLockMsg classname={classname} />
            )}
            <div className={cls.element('lenke-seksjoner')}>
                {menyLenker &&
                    menyLenker.children.map((menygruppe, index) => (
                        <MenyLenkeSeksjon
                            menygruppe={menygruppe}
                            isOpen={isOpen}
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

export default MinsideVisning;
