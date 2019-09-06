import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Environments from '../../../../utils/environments';
import './MinsideLenke.less';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import { getSessionStorage, MenuValue, NAVHEADER } from '../../../../utils/meny-storage-utils';

const { baseUrl, minsideArbeidsgiverUrl } = Environments();
const dittNavURL = `${baseUrl}/person/dittnav/`;
const minSideArbeidsgiverURL = `${minsideArbeidsgiverUrl}/min-side-arbeidsgiver/`;

interface StateProps {
    erInnlogget: boolean;
}

const MinsideLenke = ({erInnlogget}: StateProps) => {

    const toppmenyvalg = getSessionStorage(NAVHEADER);

    const lenketekst = toppmenyvalg === null || toppmenyvalg === MenuValue.PRIVATPERSON
        ? 'Gå til min side'
        : toppmenyvalg === MenuValue.BEDRIFT
        ? 'Gå til min side arbeidsgiver'
        : '';

    const lenkeurl = toppmenyvalg === null || toppmenyvalg === MenuValue.PRIVATPERSON
        ? dittNavURL
        : toppmenyvalg === MenuValue.BEDRIFT
        ? minSideArbeidsgiverURL
        : '';

    return (
        <div className="minside-lenke">
            {erInnlogget && !(toppmenyvalg === MenuValue.SAMHANDLER)
                ? <Lenke href={lenkeurl}>{lenketekst}</Lenke>
                : null
            }
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    erInnlogget: state.innloggingsstatus.data.authenticated,
});

export default connect(mapStateToProps)(MinsideLenke);
