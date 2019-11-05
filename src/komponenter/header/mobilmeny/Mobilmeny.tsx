import React from 'react';
import BEMHelper from '../../../utils/bem';
import { Language } from '../../../reducer/language-duck';
import NavLogoRod from '../../ikoner/meny/NavLogoRod';
import './Mobilmeny.less';
import DropdownMeny from '../hovedmeny/dropdown-meny/DropdownMeny';
import { dropdownClass } from '../hovedmeny/Hovedmeny';

const cls = BEMHelper('hovedmeny');

interface Props {
    language: Language;
}

const Mobilmeny = ({ language }: Props) => {
    return (
        <nav className={cls.className}>
            <div className={cls.element('content')}>
                <div className={cls.element('meny-elementer')}>
                    <NavLogoRod
                        width="66"
                        height="66"
                        classname={cls.element('logo')}
                    />
                    <DropdownMeny classname={dropdownClass.className} />
                </div>
            </div>
        </nav>
    );
};

export default Mobilmeny;
