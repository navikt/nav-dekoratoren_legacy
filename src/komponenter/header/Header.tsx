import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../redux/dispatch-type';
import { AppState } from '../../reducer/reducer';
import { Language } from '../../reducer/language-duck';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import MobilMenylinje from './meny/MobilMenylinje';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import DesktopMenylinje from './meny/DesktopMenylinje';

interface StateProps {
    language: Language;
}

interface DispatchProps {
    hentMenypunkter?: () => Promise<void>;
}

type HeaderProps = StateProps & DispatchProps;

export const Header = ({ hentMenypunkter, language }: HeaderProps) => {
    React.useEffect(() => {
        if (hentMenypunkter) {
            hentMenypunkter();
        }
    }, []);

    return (
        <>
            <Skiplinks />
            <header className="siteheader">
                <div className="media-sm-mobil mobil-meny">
                    <MobilMenylinje />
                </div>
                <div className="media-tablet-desktop tablet-desktop-meny">
                    {language === Language.NORSK && <Arbeidsflatemeny />}
                    <DesktopMenylinje language={language} />
                </div>
            </header>
        </>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentMenypunkter: () => fetchMenypunkter()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
