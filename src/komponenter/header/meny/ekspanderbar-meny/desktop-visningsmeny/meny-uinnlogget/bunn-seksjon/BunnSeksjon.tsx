import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import BunnseksjonLenke from './BunnseksjonLenke';
import KbNav, { NaviGroup } from '../../keyboard-navigation/kb-navigation';
import { MenuValue } from '../../../../../../../utils/meny-storage-utils';
import { Language } from '../../../../../../../reducer/language-duck';
import { finnTekst } from '../../../../../../../tekster/finn-tekst';
import { bunnLenker } from './BunnseksjonLenkedata';

interface Props {
    classname: string;
    settArbeidsflateFunc: () => void;
    arbeidsflate: MenuValue;
    language: Language;
}

const BunnSeksjon = ({ classname, language, arbeidsflate, settArbeidsflateFunc }: Props) => {
    const cls = BEMHelper(classname);
    const lenker = bunnLenker[arbeidsflate];

    return (
        <>
            <hr className={cls.element('bunn-separator')} />
            <div className={cls.element('bunn-seksjon')}>
                {lenker.map((lenke, index) => {
                    const kbNaviIndex = {x: index, y: 3, sub: 0};
                    return (
                        <BunnseksjonLenke
                            url={lenke.url}
                            lenkeTekstId={lenke.lenkeTekstId}
                            stikkord={finnTekst(lenke.stikkordId, language)}
                            className={classname}
                            id={KbNav.getKbId(NaviGroup.DesktopHeaderDropdown, kbNaviIndex)}
                            onClick={lenke.onClick && lenke.onClick(settArbeidsflateFunc)}
                            key={lenke.lenkeTekstId}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default BunnSeksjon;
