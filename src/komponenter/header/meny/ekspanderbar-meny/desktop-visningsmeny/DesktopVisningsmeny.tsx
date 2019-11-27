import React from 'react';
import { MenuValue } from '../../../../../utils/meny-storage-utils';
import { Language } from '../../../../../reducer/language-duck';
import { MenySeksjon } from '../../../../../reducer/menu-duck';
import DropdownHoyredel from './desktop-innhold/Dropdown-hoyredel';
import DropdownVenstredel from './desktop-innhold/Dropdown-venstredel';
import './DesktopVisningsmeny.less';

interface Props {
    classname: string;
    tabindex: boolean;
    fellesmeny: MenySeksjon;
    minsideMeny: MenySeksjon;
    lang: Language;
    arbeidsflate: MenuValue;
}

const DesktopVisningsmeny = (props: Props) => {
    return (
        <>
            <DropdownVenstredel
                classname={props.classname}
                menyLenker={props.fellesmeny}
                tabindex={props.tabindex}
            />
            {props.arbeidsflate === MenuValue.PRIVATPERSON &&
            props.lang === Language.NORSK ? (
                <DropdownHoyredel
                    minsideMeny={props.minsideMeny}
                    classname={props.classname}
                    tabindex={props.tabindex}
                />
            ) : null}
        </>
    );
};

export default DesktopVisningsmeny;
