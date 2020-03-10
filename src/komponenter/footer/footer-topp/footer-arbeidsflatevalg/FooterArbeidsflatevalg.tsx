import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../reducer/reducer';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import BEMHelper from '../../../../utils/bem';
import { GACategory } from '../../../../utils/google-analytics';
import { LenkeMedGA } from '../../../LenkeMedGA';
import { Language } from '../../../../reducer/language-duck';
import Tekst, { finnTekst } from '../../../../tekster/finn-tekst';
import {
    ArbeidsflateLenke,
    arbeidsflateLenker,
    settArbeidsflate,
} from '../../../header/arbeidsflatemeny/arbeidsflate-lenker';

interface Props {
    classname: string;
}

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const FooterArbeidsflatevalg = ({ classname }: Props) => {
    const cls = BEMHelper(classname);
    const { arbeidsflate, language } = useSelector(stateSelector);
    const arbeidsflatevalgLenker = arbeidsflateLenker().filter(
        lenke => lenke.key !== arbeidsflate
    );

    return (
        <section className={cls.element('menylinje-arbeidsflatevalg')}>
            {language === Language.NORSK && (
                <div className="arbeidsflatevalg-innhold">
                    <ul
                        className="arbeidsflatevalg"
                        aria-label="Gå til innhold for privatperson, arbeidsgiver eller samarbeidspartner"
                    >
                        {arbeidsflatevalgLenker.map(
                            (lenke: ArbeidsflateLenke) => {
                                /* const stikkord = finnTekst(
                                    lenke.stikkordId,
                                    Language.NORSK
                                )
                                    .split('|')
                                    .map((ord, index) => (
                                        <li key={index}>
                                            <span className={'bullet'} />
                                            {ord}
                                        </li>
                                    ));
                                 */
                                return (
                                    <li key={lenke.key}>
                                        <Lenkepanel
                                            href={lenke.url}
                                            tittelProps="normaltekst"
                                            key={lenke.key}
                                            border
                                        >
                                            <div className="arbeidsflatevalg-tekst">
                                                <LenkeMedGA
                                                    href={lenke.url}
                                                    onClick={event => {
                                                        event.preventDefault();
                                                        settArbeidsflate(lenke);
                                                    }}
                                                    gaEventArgs={{
                                                        category:
                                                            GACategory.Header,
                                                        action:
                                                            'arbeidsflate-valg',
                                                    }}
                                                >
                                                    <Undertittel>
                                                        <Tekst
                                                            id={
                                                                lenke.lenkeTekstId
                                                            }
                                                        />
                                                    </Undertittel>
                                                    <Tekst
                                                        id={
                                                            lenke.footerStikkordId
                                                        }
                                                    />
                                                </LenkeMedGA>
                                            </div>
                                        </Lenkepanel>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default FooterArbeidsflatevalg;
