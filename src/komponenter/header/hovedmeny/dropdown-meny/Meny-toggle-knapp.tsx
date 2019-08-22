import React  from 'react';
import { AppState } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import BEMHelper from '../../../../utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import { Status } from '../../../../api/api';
import { setMenuView } from '../../../../provider/Storage-provider';
import { Data, DataInitState, MenyPunkter } from '../../../../reducer/menu-duck';
import HamburgerIkon from '../../../ikoner/meny/HamburgerIkon';
import DropdownHoyreSeksjon from './DropdownHoyreSeksjon';
import DropdownVenstreSeksjon from './DropdownVenstreSeksjon';
import './Meny-toggle-knapp.less';

interface StateProps {
    meny: MenyPunkter;
}

interface State {
    clicked: boolean;
    minside: Data;
}

const cls = BEMHelper('hovedmeny');

class MenyToggleKnapp extends React.Component<StateProps, State> {

    static minside<T, K extends keyof T>(meny: T, key: K): T[K] {
        return meny[key];
    }

    constructor(props: StateProps) {
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
    }

    render() {
        const { meny } = this.props;

        return (
            <div className="toggle-meny">

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
                        <Undertittel>MENY</Undertittel>
                    </div>
                </button>

                { this.state.clicked && meny.status === Status.OK && (
                    <div id="dropdown-menu" className={cls.element('dropdown-menu')}>
                        <div
                            className={cls.element(
                                'menyvalg',
                                this.state.clicked ? 'active' : ''
                            )}
                        >
                            <DropdownVenstreSeksjon
                                classname="hovedmeny"
                                menyLenker={setMenuView(meny.data)}
                                status={meny.status}
                            />
                            <DropdownHoyreSeksjon
                                minsideMenyView={MenyToggleKnapp.minside(meny.data, 3)}
                                className="hovedmeny"
                            />
                        </div>
                    </div>
                )}

            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    meny: state.menypunkt
});

export default connect(mapStateToProps)(MenyToggleKnapp);