import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import BunnseksjonLenke from './BunnseksjonLenke';
import KbNav, {
    NaviGroup,
} from '../../../../../../../utils/keyboard-navigation/kb-navigation';
import { MenuValue } from '../../../../../../../utils/meny-storage-utils';
import { Language } from '../../../../../../../reducer/language-duck';
import { finnTekst } from '../../../../../../../tekster/finn-tekst';
import { bunnLenker } from './BunnseksjonLenkedata';
import './Bunnseksjon.less';

interface Props {
    classname: string;
    settArbeidsflate: () => void;
    arbeidsflate: MenuValue;
    language: Language;
}

export const Bunnseksjon = ({
    classname,
    language,
    arbeidsflate,
    settArbeidsflate,
}: Props) => {
    const cls = BEMHelper(classname);
    const lenker = bunnLenker[arbeidsflate]();

    return (
        <>
            <hr className={cls.element('bunn-separator')} />
            <div className={cls.element('bunn-seksjon')}>
                {lenker.map((lenke, index) => {
                    const kbNaviIndex = { col: index, row: 2, sub: 0 };
                    return (
                        <BunnseksjonLenke
                            url={lenke.url}
                            lenkeTekstId={lenke.lenkeTekstId}
                            stikkord={finnTekst(lenke.stikkordId, language)}
                            className={classname}
                            id={KbNav.getKbId(
                                NaviGroup.DesktopHovedmeny,
                                kbNaviIndex
                            )}
                            onClick={
                                lenke.onClick && lenke.onClick(settArbeidsflate)
                            }
                            key={lenke.lenkeTekstId}
                        />
                    );
                })}
            </div>
        </>
    );
};
