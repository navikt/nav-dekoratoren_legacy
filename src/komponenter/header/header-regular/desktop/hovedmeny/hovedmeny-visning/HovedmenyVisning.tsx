import React from 'react';
import BEMHelper from 'utils/bem';
import { MenuValue } from 'utils/meny-storage-utils';
import { MenyNode } from 'store/reducers/menu-duck';
import { Language } from 'store/reducers/language-duck';
import { Toppseksjon } from './topp-seksjon/Toppseksjon';
import { Bunnseksjon } from './bunn-seksjon/Bunnseksjon';
import { Hovedseksjon } from './hoved-seksjon/Hovedseksjon';

type Props = {
    classname: string;
    arbeidsflate: MenuValue;
    language: Language;
    menyLenker: MenyNode | undefined;
    isOpen: boolean;
};

export const HovedmenyVisning = (props: Props) => {
    const { arbeidsflate, classname, language, menyLenker, isOpen } = props;

    if (!menyLenker) {
        return null;
    }

    const cls = BEMHelper(classname);

    return (
        <div className={cls.element('dropdown')}>
            <Toppseksjon classname={classname} />
            <Hovedseksjon
                menyLenker={menyLenker}
                classname={classname}
                isOpen={isOpen}
            />
            <Bunnseksjon
                classname={classname}
                language={language}
                arbeidsflate={arbeidsflate}
            />
        </div>
    );
};

export default HovedmenyVisning;
