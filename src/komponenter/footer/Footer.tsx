import * as React from 'react';
import { AppState } from '../../reducer/reducer';
import { connect } from 'react-redux';
import BEMHelper from '../../utils/bem';
import { Language } from '../../reducer/language-duck';
import { erNavDekoratoren, genererUrl } from '../../utils/Environment';
import { getLanguage, LanguageSelectors } from './Footer-utils';
import { lang } from './FooterLenker';
import MenylinjeTopp from './MenylinjeTopp';
import MenylinjeBottom from './MenylinjeBottom';
import './Footer.less';

const cls = BEMHelper('footer');

interface StateProps {
    language: Language;
}

interface State {
    hasMounted: boolean;
    erNavDekoratoren: boolean;
    languages: LanguageSelectors[];
}

class Footer extends React.Component<StateProps, State> {
    constructor(props: StateProps) {
        super(props);

        this.state = {
            hasMounted: false,
            erNavDekoratoren: false,
            languages: [lang[1], lang[2]],
        };
    }

    componentDidMount(): void {
        this.setState(
            {
                hasMounted: true,
            },
            () => {
                if (this.state.hasMounted) {
                    this.setState({
                        erNavDekoratoren: erNavDekoratoren(),
                        languages: getLanguage(this.props.language),
                    });
                }
            }
        );
    }

    render() {
        return (
            <div className="navno-dekorator">
                <div className={cls.className}>
                    <div className="hodefot">
                        <footer className="sitefooter" role="contentinfo">
                            <div className={cls.element('innhold')}>
                                <MenylinjeTopp
                                    classname={cls.className}
                                    languages={this.state.languages}
                                    erNavDekoratoren={
                                        this.state.erNavDekoratoren
                                    }
                                />
                                <MenylinjeBottom classname={cls.className} />
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Footer);
