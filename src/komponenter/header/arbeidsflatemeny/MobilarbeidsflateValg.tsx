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
import { arbeidsflateLenker } from './arbeidsflate-lenker';
import './MobilarbeidsflateValg.less';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';

interface Props {
    tabindex: boolean;
}

interface StateProps {
    arbeidsflate: MenuValue;
}

interface DispatchProps {
    settArbeidsflate: () => void;
}

const oppdatereArbeidsflateValg = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    valgVerdi: MenuValue
) => {
    e.preventDefault();
    oppdaterSessionStorage(valgVerdi);
};

const MobilarbeidsflateValg = ({
    arbeidsflate,
    settArbeidsflate,
    tabindex,
}: StateProps & DispatchProps & Props) => {
    const cls = BEMHelper('mobil-arbeidsflate-valg');

    return (
        <ul className={cls.className}>
            {arbeidsflateLenker.map(
                (lenke: { tittel: string; url: string; key: MenuValue }) => {
                    return arbeidsflate === lenke.key ? null : (
                        <li
                            key={lenke.tittel}
                            className={cls.element('liste-element')}
                        >
                            <LenkeMedGA
                                href={lenke.url}
                                onClick={event => {
                                    oppdatereArbeidsflateValg(event, lenke.key);
                                    settArbeidsflate();
                                }}
                                tabIndex={tabindex ? 0 : -1}
                                gaEventArgs={{
                                    category: GACategory.Header,
                                    action: 'arbeidsflate-valg',
                                }}
                            >
                                <HoyreChevron />
                                <Undertittel>
                                    <span>For </span>
                                    <span
                                        className={cls.element('lenke-tittel')}
                                    >
                                        {lenke.tittel}
                                    </span>{' '}
                                </Undertittel>
                            </LenkeMedGA>
                        </li>
                    );
                }
            )}
        </ul>
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
)(MobilarbeidsflateValg);
