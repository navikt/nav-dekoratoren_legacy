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
    setDropdownMenuView,
} from '../../../../utils/meny-storage-utils';
import {
    MenySpraakSeksjon,
    DataInitState,
    MenyPunkter,
} from '../../../../reducer/menu-duck';
import Tekst from '../../../../tekster/finn-tekst';
import { Language } from '../../../../reducer/language-duck';
import HamburgerIkon from '../../../ikoner/meny/HamburgerIkon';
import DropdownHoyreSeksjon from './Dropdown-hoyre-seksjon';
import DropdownVenstreSeksjon from './Dropdown-venstre-seksjon';
import './Meny-toggle-knapp.less';

interface OwnProps {
    classname: string;
}

interface StateProps {
    meny: MenyPunkter;
    language: Language;
}

interface State {
    clicked: boolean;
    minside: MenySpraakSeksjon;
}

type MenyToggleKnappProps = OwnProps & StateProps;

class MenyToggleKnapp extends React.Component<MenyToggleKnappProps, State> {
    static minside<T, K extends keyof T>(meny: T, key: K): T[K] {
        return meny[key];
    }

    constructor(props: MenyToggleKnappProps) {
        super(props);
        this.state = {
            clicked: false,
            minside: DataInitState,
        };
        this.dropDownExpand = this.dropDownExpand.bind(this);
    }

    dropDownExpand = () => {
        this.setState({
            clicked: !this.state.clicked,
        });
    };

    render() {
        const { meny, classname, language } = this.props;
        const cls = BEMHelper(classname);
        const toppmenyvalg = getSessionStorage(NAVHEADER);

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
                                menyLenker={setDropdownMenuView(
                                    meny.data,
                                    language
                                )}
                                tabindex={this.state.clicked}
                            />
                            {toppmenyvalg === MenuValue.PRIVATPERSON &&
                            language === Language.NORSK ? (
                                <DropdownHoyreSeksjon
                                    minsideMenyView={MenyToggleKnapp.minside(
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
});

export default connect(mapStateToProps)(MenyToggleKnapp);
