import React from 'react';
import BEMHelper from '../../../../../../utils/bem';
import { MenyNode } from '../../../../../../reducer/menu-duck';
import { MenyLenkeSeksjon } from '../../meny-lenker/MenyLenkeSeksjon';
import KbNav, {
    NaviGroup,
    NodeEdge,
} from '../../../../../../utils/keyboard-navigation/kb-navigation';
import { LenkeMedGA } from '../../../../../LenkeMedGA';
import Environment from '../../../../../../utils/Environment';
import { GACategory } from '../../../../../../utils/google-analytics';
import Tekst from '../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import { KbNavigation } from '../../../../../../utils/keyboard-navigation/KbNavigation';
import { desktopMinsideKnappId } from '../MinsideMenyDesktop';

type Props = {
    classname: string;
    isOpen: boolean;
    menyLenker: MenyNode | undefined;
};

const rootIndex = { col: 0, row: 0, sub: 0 };
const colSetup = [1, 3];

export const MinsideDropdown = (props: Props) => {
    const { classname, isOpen, menyLenker } = props;
    const cls = BEMHelper(classname);

    if (!menyLenker) {
        return null;
    }

    return (
        <KbNavigation
            group={NaviGroup.MinsideMeny}
            rootIndex={rootIndex}
            maxColsPerSection={colSetup}
            isEnabled={isOpen}
            parentNodeId={desktopMinsideKnappId}
            parentEdge={NodeEdge.Bottom}
        >
            <>
                <div className={cls.element('topp-seksjon')}>
                    <LenkeMedGA
                        href={Environment.DITT_NAV_URL}
                        id={KbNav.getKbId(NaviGroup.MinsideMeny, {
                            col: 0,
                            row: 0,
                            sub: 0,
                        })}
                        gaEventArgs={{
                            category: GACategory.Header,
                            action: 'dittnav',
                            label: Environment.DITT_NAV_URL,
                        }}
                    >
                        <Tekst id={'til-forside'} />
                    </LenkeMedGA>
                    <Systemtittel
                        className={cls.element('topp-seksjon-tittel')}
                    >
                        <Tekst id={'min-side'} />
                    </Systemtittel>
                </div>
                <div className={cls.element('lenke-seksjoner')}>
                    {menyLenker &&
                        menyLenker.children.map((menygruppe, index) => (
                            <MenyLenkeSeksjon
                                menygruppe={menygruppe}
                                isOpen={isOpen}
                                colIndex={index}
                                rowIndex={1}
                                kbNaviGroup={NaviGroup.MinsideMeny}
                                key={menygruppe.displayName}
                            />
                        ))}
                </div>
            </>
        </KbNavigation>
    );
};

export default MinsideDropdown;
