import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../redux/dispatch-type';
import { AppState } from '../../reducer/reducer';
import { Language } from '../../reducer/language-duck';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Toppmeny from './arbeidsflatemeny/Arbeidsflatemeny';
import Desktopmeny from './meny/Desktopmeny';
import Mobilmeny from './meny/Mobilmeny';

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
        <div className="navno-dekorator">
            <div className="hodefot">
                <header className="siteheader">
                    <div className="innhold-container">
                        <div className="media-sm-mobil mobil-meny">
                            <Mobilmeny />
                        </div>
                        <div className="media-md-tablet tablet-desktop-meny">
                            {language === Language.NORSK && <Toppmeny />}
                            <Desktopmeny language={language} />
                        </div>
                    </div>
                </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
