import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import BEMHelper from '../../../../utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import { Status } from '../../../../api/api';
import {
    getSessionStorage,
    MenuValue,
    NAVHEADER,
    selectMenu,
} from '../../../../utils/meny-storage-utils';
import {
    Meny,
    dataInitState,
    MenyPunkter,
} from '../../../../reducer/menu-duck';
import Tekst from '../../../../tekster/finn-tekst';
import { Language } from '../../../../reducer/language-duck';
import HamburgerIkon from '../../../ikoner/meny/HamburgerIkon';
import DropdownHoyreSeksjon from './Dropdown-hoyre-seksjon';
import DropdownVenstreSeksjon from './Dropdown-venstre-seksjon';
import './DropdownMeny.less';
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
        };
        this.dropDownExpand = this.dropDownExpand.bind(this);
    }

    dropDownExpand = () => {
        this.setState({
            clicked: !this.state.clicked,
        });
    };

    render() {
        const { meny, classname, language, arbeidsflate } = this.props;
        const cls = BEMHelper(classname);
        const toppmenyvalg = verifyWindowObj()
            ? getSessionStorage(NAVHEADER)
            : MenuValue.PRIVATPERSON;

        return (
            <>
                <button
                    onClick={this.dropDownExpand}
                    className="meny-button"
                    aria-label="Menyknapp"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    aria-expanded={this.state.clicked}
                >
                    <div className="button-content">
                        <HamburgerIkon ikonClass="hamburger-ikon" />
                        <Undertittel>
                            <Tekst id="meny-knapp" />
                        </Undertittel>
                    </div>
                </button>

                <div
                    id="dropdown-menu"
                    className={cls.element('dropdown-menu')}
                >
                    {meny.status === Status.OK ? (
                        <div
                            className={cls.element(
                                'menyvalg',
                                this.state.clicked ? 'active' : ''
                            )}
                        >
                            <DropdownVenstreSeksjon
                                classname={this.props.classname}
                                menyLenker={selectMenu(
                                    meny.data,
                                    language,
                                    arbeidsflate
                                )}
                                tabindex={this.state.clicked}
                            />
                            {toppmenyvalg === MenuValue.PRIVATPERSON &&
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
                        </div>
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
