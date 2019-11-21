import React from 'react';
import {
    MenuValue,
    oppdaterSessionStorage,
} from '../../../utils/meny-storage-utils';
import BEMHelper from '../../../utils/bem';
import { arbeidsflateLenker } from './arbeidsflate-lenker';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { AppState } from '../../../reducer/reducer';
import { Dispatch } from '../../../redux/dispatch-type';
import { finnArbeidsflate } from '../../../reducer/arbeidsflate-duck';
import { connect } from 'react-redux';
import './MobilarbeidsflateValg.less';

interface StateProps {
    arbeidsflate: MenuValue;
}

interface DispatchProps {
    settArbeidsflate: () => void;
}

const MobilarbeidsflateValg = ({
    arbeidsflate,
    settArbeidsflate,
}: StateProps & DispatchProps) => {
    const cls = BEMHelper('mobil-seksjon-valg');

    return (
        <ul className={cls.className}>
            {arbeidsflateLenker.map(
                (lenke: { tittel: string; url: string; key: MenuValue }) => {
                    return arbeidsflate === lenke.key ? null : (
                        <Lenke
                            key={lenke.tittel}
                            className={cls.element('list-element')}
                            href={lenke.url}
                            onClick={event => {
                                oppdaterSessionStorage(
                                    event,
                                    lenke.key,
                                    lenke.url
                                );
                                settArbeidsflate();
                            }}
                        >
                            <li>
                                <div
                                    className={cls.element(
                                        'list-element',
                                        'chevron'
                                    )}
                                >
                                    <HoyreChevron />
                                </div>
                                <Undertittel>
                                    <span>For </span>
                                    <span
                                        className={cls.element('lenke-tittel')}
                                    >
                                        {lenke.tittel}
                                    </span>{' '}
                                </Undertittel>
                            </li>
                        </Lenke>
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
