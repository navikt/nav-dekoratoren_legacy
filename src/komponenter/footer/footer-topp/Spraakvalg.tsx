import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../reducer/reducer';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import { Language } from '../../../reducer/language-duck';
import { GACategory } from '../../../utils/google-analytics';
import { LenkeMedGA } from '../../LenkeMedGA';
import Tekst from '../../../tekster/finn-tekst';
import { erNavDekoratoren } from '../../../utils/Environment';
import {
    getSpraaklenker,
    Spraaklenke,
    spraaklenker,
} from './Spraakvalg-lenker';

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
                                <HoyreChevron />
                                <LenkeMedGA
                                    href={
                                        this.state.erNavDekoratoren
                                            ? lenke.testurl
                                            : lenke.url
                                    }
                                    gaEventArgs={{
                                        category: GACategory.Footer,
                                        action: `språkvalg/${lenke.lang}`,
                                    }}
                                >
                                    {lenke.lenketekst}
                                </LenkeMedGA>
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
