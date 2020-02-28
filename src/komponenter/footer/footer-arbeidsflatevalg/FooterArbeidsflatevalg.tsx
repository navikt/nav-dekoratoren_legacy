import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
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

interface OwnProps {
    classname: string;
}

interface StateProps {
    arbeidsflate: MenuValue;
    language: Language;
}

interface DispatchProps {
    settArbeidsflate: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const FooterArbeidsflatevalg = ({
    arbeidsflate,
    language,
    settArbeidsflate,
    classname,
}: Props) => {
    const cls = BEMHelper(classname);
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
                                                    settArbeidsflate();
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

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    settArbeidsflate: () => dispatch(finnArbeidsflate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterArbeidsflatevalg);
