import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import BEMHelper from '../../../utils/bem';
import { finnArbeidsflate } from '../../../reducer/arbeidsflate-duck';
import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../utils/meny-storage-utils';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import { arbeidsflateLenker } from '../../header/arbeidsflatemeny/arbeidsflate-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    classname: string;
    tabindex: boolean;
}

interface StateProps {
    arbeidsflate: MenuValue;
}

interface DispatchProps {
    settArbeidsflate: () => void;
}

const FooterArbeidsflatevalg = ({
    arbeidsflate,
    settArbeidsflate,
    classname,
    tabindex,
}: StateProps & DispatchProps & Props) => {
    const cls = BEMHelper(classname);

    return (
        <section className={cls.element('menylinje-arbeidsflatevalg')}>
            <Undertittel className="ga-til-innhold-for">
                Gå til innhold for
            </Undertittel>
            <ul className="arbeidsflatevalg">
                {arbeidsflateLenker.map(
                    (lenke: {
                        tittel: string;
                        url: string;
                        key: MenuValue;
                    }) => {
                        return arbeidsflate === lenke.key ? null : (
                            <li
                                key={lenke.tittel}
                                className={cls.element('liste-element')}
                            >
                                <Normaltekst>
                                    <HoyreChevron />
                                    <LenkeMedGA
                                        href={lenke.url}
                                        onClick={event => {
                                            oppdaterSessionStorage(
                                                event,
                                                lenke.key,
                                                lenke.url
                                            );
                                            settArbeidsflate();
                                        }}
                                        tabIndex={tabindex ? 0 : -1}
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
        </section>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsflate: state.arbeidsflate.status,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    settArbeidsflate: () => dispatch(finnArbeidsflate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterArbeidsflatevalg);
