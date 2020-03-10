import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../tekster/finn-tekst';
import BEMHelper from '../../../utils/bem';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import { Language } from '../../../reducer/language-duck';
import {
    ArbeidsflateLenke,
    arbeidsflateLenker,
    settArbeidsflate,
} from '../../header/arbeidsflatemeny/arbeidsflate-lenker';

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
                    <Undertittel
                        className="ga-til-innhold-for"
                        id="ga-til-innhold-for"
                    >
                        <Tekst id={'footer-ga-til-innhold-for'} />
                    </Undertittel>
                    <ul
                        className="arbeidsflatevalg"
                        aria-labelledby="ga-til-innhold-for"
                    >
                        {arbeidsflatevalgLenker.map(
                            (lenke: ArbeidsflateLenke) => (
                                <li key={lenke.key}>
                                    <Normaltekst className="arbeidsflatevalg-tekst">
                                        <HoyreChevron />
                                        <LenkeMedGA
                                            href={lenke.url}
                                            onClick={event => {
                                                event.preventDefault();
                                                settArbeidsflate(lenke);
                                            }}
                                            gaEventArgs={{
                                                category: GACategory.Header,
                                                action: 'arbeidsflate-valg',
                                            }}
                                        >
                                            <Tekst id={lenke.lenkeTekstId} />
                                        </LenkeMedGA>
                                    </Normaltekst>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default FooterArbeidsflatevalg;
