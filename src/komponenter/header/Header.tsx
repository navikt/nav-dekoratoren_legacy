import React from 'react';
import { Dispatch } from '../../redux/dispatch-type';
import { connect } from 'react-redux';
import { fetchMenypunkter } from '../../reducer/menu-duck';
import Skiplinks from './skiplinks/Skiplinks';
import Toppmeny from './toppmeny/Toppmeny';
import Hovedmeny from './hovedmeny/Hovedmeny';
import './Header.less';
import { Language } from '../../reducer/language-duck';
import { AppState } from '../../reducer/reducer';

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
            <div id="header-withmenu">
                <div className="hodefot">
                    <header className="siteheader">
                        <div className="innhold-container">
                            {language === Language.NORSK && <Toppmeny />}
                            <Hovedmeny language={language} />
                        </div>
                    </header>
                </div>
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
