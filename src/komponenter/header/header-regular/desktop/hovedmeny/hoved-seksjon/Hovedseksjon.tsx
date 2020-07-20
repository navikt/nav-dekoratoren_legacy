import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from 'komponenter/header/header-regular/common/meny-lenker/MenyLenkeSeksjon';
import BEMHelper from 'utils/bem';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { MosaicMeny } from 'komponenter/header/header-regular/common/mosaic-meny/MosaicMeny';
import './Hovedseksjon.less';

interface Props {
    menyLenker: MenyNode;
    classname: string;
    numCols: number;
}

export const Hovedseksjon = ({ menyLenker, classname, numCols }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('hoved-seksjon')}>
            <MosaicMeny numCols={numCols}>
                {menyLenker &&
                    menyLenker.children.map((menygruppe, index) => (
                        <MenyLenkeSeksjon
                            menygruppe={menygruppe}
                            colIndex={index}
                            rowIndex={1}
                            kbNodeGroup={KbNavGroup.Hovedmeny}
                            key={menygruppe.displayName}
                        />
                    ))}
            </MosaicMeny>
        </div>
    );
};
