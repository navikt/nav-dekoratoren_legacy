import * as React from 'react';
import { AppState } from '../../../reducer/reducer';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Language } from '../../../reducer/language-duck';
import Tekst from '../../../tekster/finn-tekst';
import { verifyWindowObj } from '../../../utils/Environment';
import { erNavDekoratoren, genererUrl } from '../../../utils/Environment';
import { lang, LanguageSelectors } from '../Footer-lenker';

interface StateProps {
    language: Language;
}

interface State {
    hasMounted: boolean;
    erNavDekoratoren: boolean;
    languages: LanguageSelectors[];
}

class Spraakvalg extends React.Component<StateProps, State> {
    getLanguage = (language: Language) => {
        const nonSelectedLang = lang;
        switch (language) {
            case Language.NORSK:
                return nonSelectedLang.splice(1, 3);
            case Language.ENGELSK:
                nonSelectedLang.splice(1, 1);
                return nonSelectedLang;
            case Language.SAMISK:
                return nonSelectedLang.splice(0, 2);
            default:
                return nonSelectedLang.splice(1, 3);
        }
    };

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
                        languages: this.getLanguage(this.props.language),
                    });
                }
            }
        );
    }

    render() {
        return (
            <ul>
                <li>
                    <Undertittel>
                        <Tekst id="footer-languages-overskrift" />
                    </Undertittel>
                </li>
                {verifyWindowObj() &&
                    this.state.languages.map(lenke => {
                        return (
                            <li key={lenke.lang}>
                                <Lenke
                                    href={
                                        erNavDekoratoren
                                            ? lenke.testurl
                                            : genererUrl(lenke.url)
                                    }
                                >
                                    {lenke.lenketekst}
                                </Lenke>
                            </li>
                        );
                    })}
            </ul>
        );
    }
}
const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Spraakvalg);
