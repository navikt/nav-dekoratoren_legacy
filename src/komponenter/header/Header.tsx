import React from 'react';
import MediaQuery from 'react-responsive';
import { Dispatch } from '../../redux/dispatch-type';
import { connect } from 'react-redux';
import { AppState } from '../../reducer/reducer';
import { Language } from '../../reducer/language-duck';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import { mobileview } from '../../styling-mediaquery';
import Skiplinks from './skiplinks/Skiplinks';
import Toppmeny from './arbeidsflatemeny/Arbeidsflatemeny';
import Desktopmeny from './meny/Desktopmeny';
import Mobilmeny from './meny/Mobilmeny';
import './Header.less';

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
        <>
            <Skiplinks />
            <div className="hodefot">
                <header className="siteheader">
                    <div className="innhold-container">
                        <MediaQuery minWidth={mobileview}>
                            {language === Language.NORSK && <Toppmeny />}
                            <Desktopmeny language={language} />
                        </MediaQuery>
                        <MediaQuery maxWidth={mobileview - 1}>
                            <Mobilmeny />
                        </MediaQuery>
                    </div>
                </header>
            </div>
        </>
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
