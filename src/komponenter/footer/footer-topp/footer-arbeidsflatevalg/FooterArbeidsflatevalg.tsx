import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../reducer/reducer';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import BEMHelper from '../../../../utils/bem';
import { GACategory } from '../../../../utils/google-analytics';
import { LenkeMedGA } from '../../../LenkeMedGA';
import { finnArbeidsflate } from '../../../../reducer/arbeidsflate-duck';
import { Language } from '../../../../reducer/language-duck';
import Tekst from '../../../../tekster/finn-tekst';
import { oppdaterSessionStorage } from '../../../../utils/meny-storage-utils';
import {
    ArbeidsflateLenke,
    arbeidsflateLenker,
} from '../../../header/arbeidsflatemeny/arbeidsflate-lenker';
import { erNavDekoratoren } from '../../../../utils/Environment';

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
                                return (
                                    <li key={lenke.tittelId}>
                                        <Lenkepanel
                                            href={lenke.url}
                                            tittelProps="normaltekst"
                                            key={lenke.key}
                                            border
                                        >
                                            <Normaltekst className="arbeidsflatevalg-tekst">
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
                                                        if (
                                                            !erNavDekoratoren()
                                                        ) {
                                                            window.location.href =
                                                                lenke.url;
                                                        }
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
                                                            id={lenke.tittelId}
                                                        />
                                                    </Undertittel>
                                                    <Normaltekst>
                                                        {lenke.beskrivelse}
                                                    </Normaltekst>
                                                </LenkeMedGA>
                                            </Normaltekst>
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
