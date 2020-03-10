import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import BunnseksjonLenke from './BunnseksjonLenke';
import KbNav, {
    NaviGroup,
} from '../../../../../../../utils/keyboard-navigation/kb-navigation';
import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../../../../../utils/meny-storage-utils';
import { Language } from '../../../../../../../reducer/language-duck';
import { finnTekst } from '../../../../../../../tekster/finn-tekst';
import { bunnLenker } from './BunnseksjonLenkedata';
import './Bunnseksjon.less';
import { erNavDekoratoren } from '../../../../../../../utils/Environment';

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
                    const kbNaviIndex = { col: index, row: 3, sub: 0 };
                    return (
                        <BunnseksjonLenke
                            url={lenke.url}
                            lenkeTekstId={lenke.lenkeTekstId}
                            stikkord={finnTekst(lenke.stikkordId, language)}
                            className={classname}
                            id={KbNav.getKbId(
                                NaviGroup.Hovedmeny,
                                kbNaviIndex
                            )}
                            onClick={event => {
                                event.preventDefault();
                                if (lenke.key) {
                                    oppdaterSessionStorage(lenke.key);
                                }
                                if (lenke.key && erNavDekoratoren()) {
                                    settArbeidsflate();
                                } else {
                                    window.location.href = lenke.url;
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
