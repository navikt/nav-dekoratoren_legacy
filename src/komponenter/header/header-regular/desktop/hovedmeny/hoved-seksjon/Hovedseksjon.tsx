import React from 'react';
import { MenyNode } from 'store/reducers/menu-duck';
import { MenyLenkeSeksjon } from 'komponenter/header/header-regular/common/meny-lenker/MenyLenkeSeksjon';
import BEMHelper from 'utils/bem';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import './Hovedseksjon.less';

interface Props {
    menyLenker: MenyNode;
    classname: string;
}

const maxCols = 4;

const isIE = () =>
    window.navigator.userAgent &&
    /(Trident|MSIE)/.test(window.navigator.userAgent);

export const Hovedseksjon = ({ menyLenker, classname }: Props) => {
    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('hoved-seksjon-wrapper')}>
            <div
                className={`${cls.element('hoved-seksjon')}${
                    isIE() ? ' is-ie' : ''
                }`}
            >
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
                {[...Array(maxCols)].map((_, index) => (
                    <div className={'col-breaker'} key={index} />
                ))}
            </div>
        </div>
    );
};
