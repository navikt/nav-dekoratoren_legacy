import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Environments from '../../../../utils/environments';
import './MinsideLenke.less';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import { MenuValue } from '../../../../utils/meny-storage-utils';

const { baseUrl, minsideArbeidsgiverUrl } = Environments();
export const dittNavURL = `${baseUrl}/person/dittnav/`;
const minSideArbeidsgiverURL = minsideArbeidsgiverUrl;

interface StateProps {
    erInnlogget: boolean;
    arbeidsflate: MenuValue;
}

const MinsideLenke = ({ erInnlogget, arbeidsflate }: StateProps) => {
    const lenketekst =
        arbeidsflate === MenuValue.IKKEVALGT ||
        arbeidsflate === MenuValue.PRIVATPERSON
            ? 'Gå til min side'
            : arbeidsflate === MenuValue.ARBEIDSGIVER
            ? 'Gå til min side arbeidsgiver'
            : '';

    const lenkeurl =
        arbeidsflate === MenuValue.IKKEVALGT ||
        arbeidsflate === MenuValue.PRIVATPERSON
            ? dittNavURL
            : arbeidsflate === MenuValue.ARBEIDSGIVER
            ? minSideArbeidsgiverURL
            : '';

    return (
        <div className="minside-lenke">
            {erInnlogget && arbeidsflate !== MenuValue.SAMARBEIDSPARTNER ? (
                <Lenke href={lenkeurl}>{lenketekst}</Lenke>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    erInnlogget: state.innloggingsstatus.data.authenticated,
    arbeidsflate: state.arbeidsflate.status,
});

export default connect(mapStateToProps)(MinsideLenke);
