import React from 'react';
import BEMHelper from 'utils/bem';
import BunnseksjonLenke from './BunnseksjonLenke';
import KbNav, { NaviGroup } from 'utils/keyboard-navigation/kb-navigation';
import { MenuValue } from 'utils/meny-storage-utils';
import { Language } from 'store/reducers/language-duck';
import { finnTekst } from 'tekster/finn-tekst';
import { bunnLenker } from './BunnseksjonLenkedata';
import { ArbeidsflateLenke } from 'komponenter/header/header-regular/arbeidsflatemeny/arbeidsflate-lenker';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { erNavDekoratoren } from 'utils/Environment';
import './Bunnseksjon.less';
import { useCookies } from 'react-cookie';

interface Props {
    classname: string;
    arbeidsflate: MenuValue;
    language: Language;
}

export const Bunnseksjon = ({ classname, language, arbeidsflate }: Props) => {
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(['decorator-context']);
    const { environment } = useSelector((state: AppState) => state);
    const lenker = bunnLenker(environment)[arbeidsflate];

    return (
        <>
            <hr className={cls.element('bunn-separator')} />
            <div className={cls.element('bunn-seksjon')}>
                {lenker.map((lenke, index) => {
                    const kbNaviIndex = { col: index, row: 3, sub: 0 };
                    const context = lenke as ArbeidsflateLenke;
                    return (
                        <BunnseksjonLenke
                            url={lenke.url}
                            lenkeTekstId={lenke.lenkeTekstId}
                            stikkord={finnTekst(lenke.stikkordId, language)}
                            className={classname}
                            id={KbNav.getKbId(NaviGroup.Hovedmeny, kbNaviIndex)}
                            onClick={(event) => {
                                event.preventDefault();
                                dispatch(settArbeidsflate(context.key));
                                setCookie(
                                    'decorator-context',
                                    context.key,
                                    cookieOptions
                                );
                                if (!erNavDekoratoren()) {
                                    window.location.href = context.url;
                                }
                            }}
                            key={lenke.lenkeTekstId}
                        />
                    );
                })}
            </div>
        </>
    );
};
