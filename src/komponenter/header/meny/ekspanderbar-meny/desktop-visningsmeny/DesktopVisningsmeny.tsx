import React from 'react';
import BEMHelper from '../../../../../utils/bem';
import { MenuValue } from '../../../../../utils/meny-storage-utils';
import { Language } from '../../../../../reducer/language-duck';
import { MenySeksjon } from '../../../../../reducer/menu-duck';
import MenyUinnlogget from './meny-uinnlogget/MenyUinnlogget';
import './DesktopVisningsmeny.less';

interface Props {
    classname: string;
    isOpen: boolean;
    fellesmeny: MenySeksjon;
    minsideMeny: MenySeksjon;
    lang: Language;
    arbeidsflate: MenuValue;
}

export const DesktopVisningsmeny = (props: Props) => {
    const cls = BEMHelper(props.classname);
    return (
        <div className="media-lg-desktop media-mobil-tablet menyvisning-desktop">
            <div className={cls.element('seksjoner')}>
                <MenyUinnlogget
                    classname={props.classname}
                    menyLenker={props.fellesmeny}
                    isOpen={props.isOpen}
                />
            </div>
        </div>
    );
};

export default DesktopVisningsmeny;
