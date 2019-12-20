import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import BEMHelper from '../../../../utils/bem';
import { verifyWindowObj } from '../../../../utils/Environment';
import { desktopview } from '../../../../styling-mediaquery';
import { Status } from '../../../../api/api';
import { MenuValue, selectMenu } from '../../../../utils/meny-storage-utils';
import { dataInitState } from '../../../../reducer/menu-duck';
import { Meny, MenyPunkter } from '../../../../reducer/menu-duck';
import { Language } from '../../../../reducer/language-duck';
import Menyknapp from './meny-knapp/Menyknapp';
import Mobilbakgrunn from './mobil-visningsmeny/mobil-innhold/Mobilbakgrunn';
import MobilVisningsmeny from './mobil-visningsmeny/MobilVisningsmeny';
import DesktopVisningsmeny from './desktop-visningsmeny/DesktopVisningsmeny';

interface StateProps {
    meny: MenyPunkter;
    language: Language;
    arbeidsflate: MenuValue;
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
        this.setState({ vismenyClassname: this.setVisningsmenyClassname() });
        window.addEventListener('resize', this.updateVisningsmenyClassname);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateVisningsmenyClassname);
    }

    render() {
        const { meny, language, arbeidsflate } = this.props;
        const cls = BEMHelper(this.state.vismenyClassname);

        return (
            <>
                <Menyknapp
                    ToggleMenu={this.menutoggle}
                    clicked={this.state.clicked}
                    lang={language}
                />
                <div id="dropdown-menu" className={cls.element('meny-wrapper')}>
                    {meny.status === Status.OK ? (
                        <>
                            <div
                                className={cls.element(
                                    'meny-innhold',
                                    this.state.clicked ? 'aktive' : ''
                                )}
                            >
                                <div className="media-mobil-tablet menyvisning-mobil-tablet">
                                    {language !== Language.SAMISK ? (
                                        <MobilVisningsmeny
                                            classname={
                                                this.state.vismenyClassname
                                            }
                                            menyLenker={selectMenu(
                                                meny.data,
                                                language,
                                                arbeidsflate
                                            )}
                                            menuIsOpen={this.state.clicked}
                                            togglemenu={this.menutoggle}
                                            arbeidsflate={arbeidsflate}
                                            lang={language}
                                        />
                                    ) : null}
                                </div>
                                <div className="media-lg-desktop menyvisning-desktop">
                                    <DesktopVisningsmeny
                                        classname={this.state.vismenyClassname}
                                        tabindex={this.state.clicked}
                                        fellesmeny={selectMenu(
                                            meny.data,
                                            language,
                                            arbeidsflate
                                        )}
                                        minsideMeny={Ekspanderbarmeny.minside(
                                            meny.data[0].children,
                                            3
                                        )}
                                        lang={language}
                                        arbeidsflate={arbeidsflate}
                                    />
                                </div>
                            </div>
                            <Mobilbakgrunn
                                toggleWindow={this.menutoggle}
                                backgroundIsActive={this.state.clicked}
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

export default connect(mapStateToProps)(Ekspanderbarmeny);
