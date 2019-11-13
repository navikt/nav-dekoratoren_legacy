import React from 'react';
import { Dispatch } from '../../redux/dispatch-type';
import { connect } from 'react-redux';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import Toppmeny from './toppmeny/Toppmeny';
import Hovedmeny from './meny/Hovedmeny';
import './Header.less';
import { Language } from '../../reducer/language-duck';
import { AppState } from '../../reducer/reducer';
import MediaQuery from 'react-responsive';
import Mobilmeny from './meny/Mobilmeny';
import { mobileview } from '../../api/api';

interface StateProps {
    language: Language;
}

interface DispatchProps {
    hentMenypunkter: () => Promise<void>;
}

type HeaderProps = StateProps & DispatchProps;

const Header = ({ hentMenypunkter, language }: HeaderProps) => {
    React.useEffect(() => {
        hentMenypunkter();
    }, []);

    return (
        <div>
            <Skiplinks />
            <div>
                <div className="hodefot">
                    <header className="siteheader">
                        <div className="innhold-container">
                            <MediaQuery minWidth={mobileview}>
                                {language === Language.NORSK && <Toppmeny />}
                                <Hovedmeny language={language} />
                            </MediaQuery>
                            <MediaQuery maxWidth={mobileview - 1}>
                                <Mobilmeny />
                            </MediaQuery>
                        </div>
                    </header>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentMenypunkter: () => fetchMenypunkter()(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
