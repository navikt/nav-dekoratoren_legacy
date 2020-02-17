import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import BEMHelper from '../../../../utils/bem';
import { verifyWindowObj } from '../../../../utils/Environment';
import { desktopview } from '../../../../styling-mediaquery';
import { Status } from '../../../../api/api';
import { MenuValue, selectMenu } from '../../../../utils/meny-storage-utils';
import { dataInitState, Meny, MenyPunkter } from '../../../../reducer/menu-duck';
import { Language } from '../../../../reducer/language-duck';
import Menyknapp from './meny-knapp/Menyknapp';
import MenyBakgrunn from './MenyBakgrunn';
import MobilVisningsmeny from './mobil-visningsmeny/MobilVisningsmeny';
import DesktopVisningsmeny from './desktop-visningsmeny/DesktopVisningsmeny';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';

interface StateProps {
    meny: MenyPunkter;
    language: Language;
    arbeidsflate: MenuValue;
    isMobile: boolean;
}

interface OwnProps {
    isMobile: boolean;
}

interface State {
    clicked: boolean;
    minside: Meny;
    vismenyClassname: string;
}

class Ekspanderbarmeny extends React.Component<StateProps, State> {
    static minside<T, K extends keyof T>(meny: T, key: K): T[K] {
        return meny[key];
    }

    constructor(props: StateProps) {
        super(props);
        this.state = {
            clicked: false,
            minside: dataInitState,
            vismenyClassname: 'meny',
        };
        this.menutoggle = this.menutoggle.bind(this);
    }

    menutoggle = () => {
        triggerGaEvent({category: GACategory.Header, action: `meny-${this.state.clicked ? 'close' : 'open'}`});
        this.setState({
            clicked: !this.state.clicked,
        });
    };

    setVisningsmenyClassname = (): string => {
        return verifyWindowObj() && window.innerWidth > desktopview - 1
            ? 'meny'
            : 'mobilmeny';
    };

    updateVisningsmenyClassname = () => {
        if (verifyWindowObj()) {
            this.setState({
                vismenyClassname: this.setVisningsmenyClassname(),
            });
        }
    };

    componentDidMount() {
        this.setState({vismenyClassname: this.setVisningsmenyClassname()});
        window.addEventListener('resize', this.updateVisningsmenyClassname);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateVisningsmenyClassname);
    }

    render() {
        const {meny, language, arbeidsflate, isMobile} = this.props;
        const cls = BEMHelper(this.state.vismenyClassname);

        return (
            <>
                <Menyknapp
                    ToggleMenu={this.menutoggle}
                    clicked={this.state.clicked}
                    lang={language}
                    isMobile={isMobile}
                />
                <div id="dropdown-menu" className={cls.element('meny-wrapper')}>
                    {meny.status === Status.OK ? (
                        <>
                            <div
                                className={cls.element(
                                    'meny-innhold-wrapper',
                                    this.state.clicked ? 'aktive' : '',
                                )}
                            >
                                <div className={cls.element('meny-innhold')}>
                                    {isMobile ? (
                                        <div className="media-mobil-tablet menyvisning-mobil-tablet">
                                            {language !== Language.SAMISK ? (
                                                <MobilVisningsmeny
                                                    classname={
                                                        this.state.vismenyClassname
                                                    }
                                                    menyLenker={selectMenu(
                                                        meny.data,
                                                        language,
                                                        arbeidsflate,
                                                    )}
                                                    menuIsOpen={this.state.clicked}
                                                    togglemenu={this.menutoggle}
                                                    arbeidsflate={arbeidsflate}
                                                    lang={language}
                                                />
                                            ) : null}
                                        </div>
                                    ) : (
                                        <div className="media-lg-desktop menyvisning-desktop">
                                            <DesktopVisningsmeny
                                                classname={this.state.vismenyClassname}
                                                isOpen={this.state.clicked}
                                                fellesmeny={selectMenu(
                                                    meny.data,
                                                    language,
                                                    arbeidsflate,
                                                )}
                                                minsideMeny={Ekspanderbarmeny.minside(
                                                    meny.data[0].children,
                                                    3,
                                                )}
                                                lang={language}
                                                arbeidsflate={arbeidsflate}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <MenyBakgrunn
                                toggleWindow={this.menutoggle}
                                backgroundIsActive={this.state.clicked}
                                className={this.state.vismenyClassname}
                            />
                        </>
                    ) : null}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    isMobile: ownProps.isMobile || false,
});

export default connect(mapStateToProps)(Ekspanderbarmeny);
