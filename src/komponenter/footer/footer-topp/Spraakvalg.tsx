import * as React from 'react';
import { AppState } from '../../../reducer/reducer';
import { connect } from 'react-redux';
import { Language } from '../../../reducer/language-duck';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../tekster/finn-tekst';
import { erNavDekoratoren } from '../../../utils/Environment';
import { getSpraaklenker, Spraaklenke, spraaklenker } from './Spraakvalg-lenker';
import LenkeMedGAEvent from '../../../utils/LenkeMedGAEvent';
import { GACategory } from '../../../utils/google-analytics';

interface StateProps {
    language: Language;
}

interface State {
    hasMounted: boolean;
    erNavDekoratoren: boolean;
    spraaklenker: Spraaklenke[];
}

class Spraakvalg extends React.Component<StateProps, State> {
    constructor(props: StateProps) {
        super(props);

        this.state = {
            hasMounted: false,
            erNavDekoratoren: false,
            spraaklenker: [spraaklenker[1], spraaklenker[2]],
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
                        spraaklenker: getSpraaklenker(this.props.language),
                    });
                }
            }
        );
    }

    render() {
        return (
            <>
                <Undertittel className="blokk-xxs">
                    <Tekst id="footer-languages-overskrift" />
                </Undertittel>
                <ul>
                    {this.state.spraaklenker.map(lenke => {
                        return (
                            <li key={lenke.lang}>
                                <LenkeMedGAEvent
                                    href={
                                        this.state.erNavDekoratoren
                                            ? lenke.testurl
                                            : lenke.url
                                    }
                                    gaEventArgs={{category: GACategory.Footer, action: `språkvalg-${lenke.lang}`}}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGAEvent>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}
const mapStateToProps = (state: AppState): StateProps => ({
    language: state.language.language,
});

export default connect(mapStateToProps)(Spraakvalg);
