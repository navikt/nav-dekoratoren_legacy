import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import { finnArbeidsflate } from '../../../reducer/arbeidsflate-duck';
import { Language } from '../../../reducer/language-duck';
import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../utils/meny-storage-utils';
import {
    ArbeidsflateLenke,
    arbeidsflateLenker,
    getArbeidsflatelenker,
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

    const [arbeidsflatevalgLenker, setArbeidsflatevalgLenker] = useState<
        ArbeidsflateLenke[]
    >([arbeidsflateLenker[1], arbeidsflateLenker[2]]);

    useEffect(() => {
        setArbeidsflatevalgLenker(getArbeidsflatelenker(arbeidsflate));
    }, [arbeidsflate]);

    return (
        <section className={cls.element('menylinje-arbeidsflatevalg')}>
            {language === Language.NORSK && (
                <div className="arbeidsflatevalg-innhold">
                    <Undertittel
                        className="ga-til-innhold-for"
                        id="ga-til-innhold-for"
                    >
                        Gå til innhold for
                    </Undertittel>
                    <ul
                        className="arbeidsflatevalg"
                        aria-labelledby="ga-til-innhold-for"
                    >
                        {arbeidsflatevalgLenker.map(
                            (lenke: ArbeidsflateLenke) => {
                                return (
                                    <li
                                        key={lenke.tittel}
                                        className={cls.element('liste-element')}
                                    >
                                        <Normaltekst>
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
                                                {lenke.tittel}
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
