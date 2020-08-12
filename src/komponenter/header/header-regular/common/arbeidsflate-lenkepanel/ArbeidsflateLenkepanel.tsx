import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { GACategory } from 'utils/google-analytics';
import { gaEvent } from 'utils/google-analytics';
import BEMHelper from 'utils/bem';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { HoyreChevron } from 'nav-frontend-chevron';
import { useDispatch } from 'react-redux';
import { ArbeidsflateLenke } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { Language } from 'store/reducers/language-duck';
import { useCookies } from 'react-cookie';
import { cookieOptions } from 'store/reducers/arbeidsflate-duck';
import { erNavDekoratoren } from 'utils/Environment';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { finnTekst } from 'tekster/finn-tekst';
import './ArbeidsflateLenkepanel.less';

interface Props {
    lenke: ArbeidsflateLenke;
    language: Language;
    id?: string;
}

const ArbeidsflateLenkepanel = ({ lenke, language, id }: Props) => {
    const cls = BEMHelper('meny-contextlenke');
    const dispatch = useDispatch();
    const [, setCookie] = useCookies();

    return (
        <LenkepanelBase
            href={lenke.url}
            className={cls.className}
            id={id}
            onClick={(event) => {
                setCookie('decorator-context', lenke.key, cookieOptions);
                if (erNavDekoratoren()) {
                    event.preventDefault();
                    dispatch(settArbeidsflate(lenke.key));
                }
                gaEvent({
                    category: GACategory.Meny,
                    action: `hovedmeny/arbeidsflatelenke`,
                    label: lenke.url,
                });
            }}
            border={true}
        >
            <div className={cls.element('innhold')}>
                <Undertittel className={'lenkepanel__heading'}>
                    <HoyreChevron className={cls.element('chevron')} />
                    <Tekst id={lenke.lenkeTekstId} />
                </Undertittel>
                <Undertekst className={cls.element('stikkord')}>
                    {finnTekst(lenke.stikkordId, language)}
                </Undertekst>
            </div>
        </LenkepanelBase>
    );
};

export default ArbeidsflateLenkepanel;
