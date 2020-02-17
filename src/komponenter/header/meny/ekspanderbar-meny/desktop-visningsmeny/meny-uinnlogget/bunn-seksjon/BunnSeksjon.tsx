import React from 'react';
import BEMHelper from '../../../../../../../utils/bem';
import BunnseksjonLenke from './BunnseksjonLenke';
import KbNav, { NaviGroup } from '../../keyboard-navigation/kb-navigation';
import { MenuValue } from '../../../../../../../utils/meny-storage-utils';
import { Language } from '../../../../../../../reducer/language-duck';
import { AppState } from '../../../../../../../reducer/reducer';
import { connect } from 'react-redux';
import { finnTekst } from '../../../../../../../tekster/finn-tekst';
import { bunnLenker } from './BunnseksjonLenkedata';
import { Dispatch } from '../../../../../../../redux/dispatch-type';
import { finnArbeidsflate } from '../../../../../../../reducer/arbeidsflate-duck';

interface OwnProps {
    classname: string;
}

interface StateProps {
    arbeidsflate: MenuValue;
    language: Language;
}

interface DispatchProps {
    settArbeidsflateFunc: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const BunnSeksjon = ({ classname, language, arbeidsflate, settArbeidsflateFunc }: Props) => {
    const cls = BEMHelper(classname);
    const lenker = bunnLenker[arbeidsflate];

    return (
        <>
            <hr className={cls.element('bunn-separator')} />
            <div className={cls.element('bunn-seksjon')}>
                {lenker.map((lenke, index) => (
                    <BunnseksjonLenke
                        url={lenke.url}
                        lenkeTekstId={lenke.lenkeTekstId}
                        stikkord={finnTekst(lenke.stikkordId, language)}
                        className={classname}
                        id={KbNav.getId(NaviGroup.DesktopHeaderDropdown, index, 3)}
                        onClick={lenke.onClick && lenke.onClick(settArbeidsflateFunc)}
                        key={lenke.lenkeTekstId}
                    />)
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsflate: state.arbeidsflate.status,
    language: state.language.language
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    settArbeidsflateFunc: () => dispatch(finnArbeidsflate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BunnSeksjon);
