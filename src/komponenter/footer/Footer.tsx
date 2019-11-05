import * as React from 'react';
import { AppState } from '../../reducer/reducer';
import { connect } from 'react-redux';
import BEMHelper from '../../utils/bem';
import { Language } from '../../reducer/language-duck';
import FooterLenkeMeny from './FooterLenkeMeny';
import './Footer.less';

const cls = BEMHelper('footer');

interface Props {
    visSpraak: boolean;
}

interface StateProps {
    language: Language;
}

const Footer = ({ language, visSpraak }: StateProps & Props) => {
    return (
        <div className={cls.className}>
            <div className="hodefot">
                <FooterLenkeMeny
                    className={cls.className}
                    language={language}
                    visSpraak={visSpraak}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Footer);
