import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import Lenke from 'nav-frontend-lenker';
import Environments from '../../../../utils/environments';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import './MinsideLenke.less';

const { baseUrl, minsideArbeidsgiverUrl } = Environments();
export const dittNavURL = `${baseUrl}/person/dittnav/`;

interface StateProps {
    erInnlogget: boolean;
    arbeidsflate: MenuValue;
}

interface Props {
    tabindex: boolean;
}

const MinsideLenke = ({
    erInnlogget,
    arbeidsflate,
    tabindex,
}: StateProps & Props) => {
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
            ? minsideArbeidsgiverUrl
            : '';

    return (
        <div className="minside-lenke">
            {erInnlogget && arbeidsflate !== MenuValue.SAMARBEIDSPARTNER ? (
                <Lenke href={lenkeurl} tabIndex={tabindex ? 0 : -1}>
                    {lenketekst}
                </Lenke>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    erInnlogget: state.innloggingsstatus.data.authenticated,
    arbeidsflate: state.arbeidsflate.status,
});

export default connect(mapStateToProps)(MinsideLenke);
