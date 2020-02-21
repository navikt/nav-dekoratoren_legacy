import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import BEMHelper from '../../../../utils/bem';
import { Status } from '../../../../api/api';
import { MenuValue, selectMenu } from '../../../../utils/meny-storage-utils';
import { dataInitState, Meny, MenyPunkter } from '../../../../reducer/menu-duck';
import { Language } from '../../../../reducer/language-duck';
import Menyknapp from './meny-knapp/Menyknapp';
import MenyBakgrunn from './meny-bakgrunn/MenyBakgrunn';
import MobilVisningsmeny from './mobil-visningsmeny/MobilVisningsmeny';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';

interface StateProps {
    meny: MenyPunkter;
    language: Language;
    arbeidsflate: MenuValue;
}

interface State {
    clicked: boolean;
    minside: Meny;
}

class MobilEkspanderbarmeny extends React.Component<StateProps, State> {
    constructor(props: StateProps) {
        super(props);
        this.state = {
            clicked: false,
            minside: dataInitState,
        };
        this.menutoggle = this.menutoggle.bind(this);
    }

    menutoggle = () => {
        triggerGaEvent({category: GACategory.Header, action: `meny-${this.state.clicked ? 'close' : 'open'}`});
        this.setState({
            clicked: !this.state.clicked,
        });
    };

    render() {
        const {meny, language, arbeidsflate} = this.props;
        const {clicked} = this.state;
        const className = 'mobilmeny';
        const cls = BEMHelper(className);

        return (
            <>
                <Menyknapp
                    ToggleMenu={this.menutoggle}
                    clicked={clicked}
                    lang={language}
                    isMobile={true}
                />
                <div id="dropdown-menu" className={cls.element('meny-wrapper')}>
                    {meny.status === Status.OK ? (
                        <>
                            <div
                                className={cls.element(
                                    'meny-innhold-wrapper',
                                    clicked ? 'aktive' : '',
                                )}
                            >
                                <div className={cls.element('meny-innhold')}>
                                    <div className="media-sm-mobil menyvisning-mobil-tablet">
                                        {language !== Language.SAMISK ? (
                                            <MobilVisningsmeny
                                                classname={className}
                                                menyLenker={selectMenu(
                                                    meny.data,
                                                    language,
                                                    arbeidsflate,
                                                )}
                                                menuIsOpen={clicked}
                                                togglemenu={this.menutoggle}
                                                arbeidsflate={arbeidsflate}
                                                lang={language}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <MenyBakgrunn
                                toggleWindow={this.menutoggle}
                                backgroundIsActive={this.state.clicked}
                                className={className}
                            />
                        </>
                    ) : null}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
});

export default connect(mapStateToProps)(MobilEkspanderbarmeny);
