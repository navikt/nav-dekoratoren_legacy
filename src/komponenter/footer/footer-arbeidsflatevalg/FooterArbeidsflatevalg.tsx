import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../tekster/finn-tekst';
import BEMHelper from '../../../utils/bem';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import { finnArbeidsflate } from '../../../reducer/arbeidsflate-duck';
import { Language } from '../../../reducer/language-duck';
import { oppdaterSessionStorage } from '../../../utils/meny-storage-utils';
import {
    ArbeidsflateLenke,
    arbeidsflateLenker,
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

    const dispatch = useDispatch();
    const { arbeidsflate, language } = useSelector(stateSelector);
    const arbeidsflatevalgLenker = arbeidsflateLenker.filter(
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
                            (lenke: ArbeidsflateLenke) => {
                                return (
                                    <li key={lenke.tittelId}>
                                        <Normaltekst className="arbeidsflatevalg-tekst">
                                            <HoyreChevron />
                                            <LenkeMedGA
                                                href={lenke.url}
                                                onClick={event => {
                                                    event.preventDefault();
                                                    oppdaterSessionStorage(
                                                        lenke.key
                                                    );
                                                    dispatch(
                                                        finnArbeidsflate()
                                                    );
                                                }}
                                                gaEventArgs={{
                                                    category: GACategory.Header,
                                                    action: 'arbeidsflate-valg',
                                                }}
                                            >
                                                <Tekst id={lenke.tittelId} />
                                            </LenkeMedGA>
                                        </Normaltekst>
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
