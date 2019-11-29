import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
import Lenke from 'nav-frontend-lenker';
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

interface Props {
    tabindex: boolean;
}

interface StateProps {
    arbeidsflate: MenuValue;
}

interface DispatchProps {
    settArbeidsflate: () => void;
}

const MobilarbeidsflateValg = ({
    arbeidsflate,
    settArbeidsflate,
    tabindex,
}: StateProps & DispatchProps & Props) => {
    const cls = BEMHelper('mobil-seksjon-valg');

    return (
        <ul className={cls.className}>
            {arbeidsflateLenker.map(
                (lenke: { tittel: string; url: string; key: MenuValue }) => {
                    return arbeidsflate === lenke.key ? null : (
                        <li
                            key={lenke.tittel}
                            className={cls.element('list-element')}
                        >
                            <Lenke
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
                            </Lenke>
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
