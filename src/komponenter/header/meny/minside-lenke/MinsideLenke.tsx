import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import Environment from '../../../../utils/Environment';
import './MinsideLenke.less';
import { GACategory } from '../../../../utils/google-analytics';
import { LenkeMedGA } from '../../../LenkeMedGA';

interface OwnProps {
    tabindex: boolean;
}

interface StateProps {
    erinnlogget: boolean;
    arbeidsflate: MenuValue;
}

type MinsideLenkeProps = StateProps & OwnProps;
export const MinsideLenke = ({
    erinnlogget,
    arbeidsflate,
    tabindex,
}: MinsideLenkeProps) => {
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
            ? Environment.dittNavUrl
            : arbeidsflate === MenuValue.ARBEIDSGIVER
            ? Environment.minsideArbeidsgiverUrl
            : '';

    return (
        <div className="minside-lenke">
            {erinnlogget && arbeidsflate !== MenuValue.SAMARBEIDSPARTNER ? (
                <LenkeMedGA
                    href={lenkeurl}
                    tabIndex={tabindex ? 0 : -1}
                    gaEventArgs={{category: GACategory.Header, action: 'minside', label: lenkeurl}}
                >
                    {lenketekst}
                </LenkeMedGA>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    erinnlogget: state.innloggingsstatus.data.authenticated,
    arbeidsflate: state.arbeidsflate.status,
});

export default connect(mapStateToProps)(MinsideLenke);
