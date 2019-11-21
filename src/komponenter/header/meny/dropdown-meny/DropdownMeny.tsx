import React from 'react';
import BEMHelper from '../../../../utils/bem';
import { Status, tabletview } from '../../../../api/api';
import { MenuValue, selectMenu } from '../../../../utils/meny-storage-utils';
import {
    dataInitState,
    Meny,
    MenyPunkter,
} from '../../../../reducer/menu-duck';
import { Language } from '../../../../reducer/language-duck';
import DropdownHoyreSeksjon from './dropdown-innhold/Dropdown-hoyre-seksjon';
import DropdownVenstreSeksjon from './dropdown-innhold/Dropdown-venstre-seksjon';
import MediaQuery from 'react-responsive';
import './DropdownMeny.less';
import Visningsmeny from './mobil-visningsmeny/Visningsmeny';
import Menyknapp from '../meny-knapp/Menyknapp';
import Mobilbakgrunn from './mobil-bakgrunn/Mobilbakgrunn';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import { verifyWindowObj } from '../../../../utils/environments';

interface OwnProps {
    classname: string;
}

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

type MenyToggleKnappProps = OwnProps & StateProps;

class DropdownMeny extends React.Component<MenyToggleKnappProps, State> {
    static minside<T, K extends keyof T>(meny: T, key: K): T[K] {
        return meny[key];
    }

    constructor(props: MenyToggleKnappProps) {
        super(props);
        this.state = {
            clicked: false,
            minside: dataInitState,
            vismenyClassname: 'dropdown',
        };
        this.dropDownExpand = this.dropDownExpand.bind(this);
    }

    dropDownExpand = () => {
        this.setState({
            clicked: !this.state.clicked,
        });
    };

    setVisningsmenyClassname = (): string => {
        return verifyWindowObj() && window.innerWidth > tabletview - 1
            ? 'dropdown'
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
        const { meny, classname, language, arbeidsflate } = this.props;

        const cls = BEMHelper(this.state.vismenyClassname);

        return (
            <>
                <Menyknapp
                    ToggleMenu={this.dropDownExpand}
                    clicked={this.state.clicked}
                    lang={this.props.language}
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
                                <MediaQuery minWidth={tabletview}>
                                    <DropdownVenstreSeksjon
                                        classname={classname}
                                        menyLenker={selectMenu(
                                            meny.data,
                                            language,
                                            arbeidsflate
                                        )}
                                        tabindex={this.state.clicked}
                                    />
                                    {arbeidsflate === MenuValue.PRIVATPERSON &&
                                    language === Language.NORSK ? (
                                        <DropdownHoyreSeksjon
                                            minsideMeny={DropdownMeny.minside(
                                                meny.data[0].children,
                                                3
                                            )}
                                            classname={classname}
                                            tabindex={this.state.clicked}
                                        />
                                    ) : null}
                                </MediaQuery>
                                <MediaQuery maxWidth={tabletview - 1}>
                                    {this.props.language !== Language.SAMISK ? (
                                        <Visningsmeny
                                            classname={
                                                this.state.vismenyClassname
                                            }
                                            menyLenker={selectMenu(
                                                meny.data,
                                                language,
                                                arbeidsflate
                                            )}
                                            viewIndex={this.state.clicked}
                                            closeButton={this.dropDownExpand}
                                            arbeidsflate={arbeidsflate}
                                            lang={this.props.language}
                                        />
                                    ) : (
                                        <div />
                                    )}
                                </MediaQuery>
                            </div>
                            <Mobilbakgrunn
                                toggleWindow={this.dropDownExpand}
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

export default connect(mapStateToProps)(DropdownMeny);
