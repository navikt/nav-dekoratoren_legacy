import React, { useEffect, useState } from 'react';
import BEMHelper from '../../../../../../utils/bem';
import { MenyNode } from '../../../../../../reducer/menu-duck';
import { MenyLenkeSeksjon } from '../../meny-lenker/MenyLenkeSeksjon';
import KbNav, {
    NaviGraphData,
    NaviGroup,
    NaviNode,
} from '../../../../../../utils/keyboard-navigation/kb-navigation';
import { LenkeMedGA } from '../../../../../LenkeMedGA';
import { GACategory } from '../../../../../../utils/google-analytics';
import Tekst from '../../../../../../tekster/finn-tekst';
import { Systemtittel } from 'nav-frontend-typografi';
import { desktopMinsideKnappId } from '../MinsideMenyDesktop';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../reducer/reducers';

type Props = {
    classname: string;
    isOpen: boolean;
    menyLenker: MenyNode | undefined;
};

const colSetup = [1, 1, 3];

export const MinsideDropdown = (props: Props) => {
    const { environment } = useSelector((state: AppState) => state);
    const { classname, isOpen, menyLenker } = props;

    const cls = BEMHelper(classname);

    const [kbNaviGraph, setKbNaviGraph] = useState<NaviGraphData>();
    const [kbNaviNode, setKbNaviNode] = useState<NaviNode>(null);

    const kbNaviGroup = NaviGroup.MinsideMeny;
    const kbRootIndex = { col: 0, row: 0, sub: 0 };
    const kbIdMap = {
        [KbNav.getKbId(kbNaviGroup, kbRootIndex)]: desktopMinsideKnappId,
    };

    useEffect(() => {
        const removeListeners = () => {
            document.removeEventListener('keydown', kbHandler);
            document.removeEventListener('focusin', focusHandler);
        };

        if (!isOpen) {
            removeListeners();
            return;
        }

        const kbHandler = KbNav.kbHandler(
            kbNaviNode,
            kbNaviGroup,
            setKbNaviNode
        );
        const focusHandler = KbNav.focusHandler(
            kbNaviNode,
            kbNaviGraph,
            setKbNaviNode
        );

        document.addEventListener('focusin', focusHandler);
        document.addEventListener('keydown', kbHandler);
        return removeListeners;
    }, [isOpen, kbNaviNode]);

    useEffect(() => {
        const makeNewNaviGraph = () => {
            const freshNaviGraph = KbNav.getNaviGraphData(
                kbNaviGroup,
                kbRootIndex,
                colSetup,
                kbIdMap
            );
            setKbNaviGraph(freshNaviGraph);
            setKbNaviNode(freshNaviGraph.rootNode);
        };

        if (isOpen) {
            makeNewNaviGraph();
        }
    }, [isOpen, menyLenker]);

    if (!menyLenker) {
        return null;
    }

    return (
        <>
            <div className={cls.element('topp-seksjon')}>
                <LenkeMedGA
                    href={environment.DITT_NAV_URL}
                    id={KbNav.getKbId(NaviGroup.MinsideMeny, {
                        col: 0,
                        row: 1,
                        sub: 0,
                    })}
                    gaEventArgs={{
                        category: GACategory.Header,
                        action: 'dittnav',
                        label: environment.DITT_NAV_URL,
                    }}
                >
                    <Tekst id={'til-forside'} />
                </LenkeMedGA>
                <Systemtittel className={cls.element('topp-seksjon-tittel')}>
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
                            rowIndex={2}
                            kbNaviGroup={NaviGroup.MinsideMeny}
                            key={menygruppe.displayName}
                        />
                    ))}
            </div>
        </>
    );
};

export default MinsideDropdown;
