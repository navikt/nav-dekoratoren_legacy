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
import {
    ArbeidsflateLenke,
    settArbeidsflateOgRedirect,
} from '../../../../../arbeidsflatemeny/arbeidsflate-lenker';
import { useDispatch } from 'react-redux';
import { finnArbeidsflate } from '../../../../../../../reducer/arbeidsflate-duck';

interface Props {
    classname: string;
    arbeidsflate: MenuValue;
    language: Language;
}

export const Bunnseksjon = ({ classname, language, arbeidsflate }: Props) => {
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();
    const settArbeidsflate = () => dispatch(finnArbeidsflate());
    const lenker = bunnLenker[arbeidsflate]();

    return (
        <>
            <hr className={cls.element('bunn-separator')} />
            <div className={cls.element('bunn-seksjon')}>
                {lenker.map((lenke, index) => {
                    const kbNaviIndex = { col: index, row: 3, sub: 0 };
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
                            onClick={event => {
                                event.preventDefault();
                                settArbeidsflateOgRedirect(
                                    lenke as ArbeidsflateLenke,
                                    settArbeidsflate
                                );
                            }}
                            key={lenke.lenkeTekstId}
                        />
                    );
                })}
            </div>
        </>
    );
};
