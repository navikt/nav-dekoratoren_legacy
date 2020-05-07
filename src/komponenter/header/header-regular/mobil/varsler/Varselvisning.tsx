import React from 'react';
import { connect, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { AppState } from 'store/reducers';
import { desktopview, tabletview } from '../../../../../styling-mediaquery';
import { triggerGaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { Language } from 'store/reducers/language-duck';
import { LenkeMedGA } from 'komponenter/common/LenkeMedGA';
import './Varselvisning.less';

interface OwnProps {
    tabIndex: boolean;
}

interface StateProps {
    varsler: string;
    antallVarsler: number;
    antallUlesteVarsler: number;
    language: Language;
}

interface State {
    parsedVarsler: any;
    windowSize: number;
}

type Props = OwnProps & StateProps;

class Varselvisning extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            parsedVarsler: parse(this.props.varsler),
            windowSize: window.innerWidth,
        };
        this.handleWindowSize = this.handleWindowSize.bind(this);
    }

    handleWindowSize() {
        this.setState({
            windowSize: window.innerWidth,
        });
    }

    setTabIndex = () => {
        const varsler = document.querySelector('.mobilmeny .nav-varsler');

        if (varsler) {
            for (
                let i = 0;
                i <= varsler.getElementsByTagName('a').length;
                i++
            ) {
                if (varsler.getElementsByTagName('a')[i]) {
                    varsler.getElementsByTagName('a')[i].tabIndex = this.props
                        .tabIndex
                        ? 0
                        : -1;
                }
            }
        }
    };

    gaEventHandler = (event: Event) => {
        if (event.type === 'auxclick' && (event as MouseEvent).button !== 1) {
            return;
        }
        triggerGaEvent({
            category: GACategory.Header,
            action: 'varsel-lenke',
            label: (event.target as HTMLAnchorElement).href,
        });
    };

    getVarselLenker = () => document.getElementsByClassName('varsel-lenke');

    addGaEventTriggers = () => {
        for (const varselLenke of this.getVarselLenker()) {
            if (varselLenke.tagName.toUpperCase() === 'A') {
                varselLenke.addEventListener('click', this.gaEventHandler);
                varselLenke.addEventListener('auxclick', this.gaEventHandler);
            }
        }
    };

    removeGaEventTriggers = () => {
        for (const varselLenke of this.getVarselLenker()) {
            if (varselLenke.tagName.toUpperCase() === 'A') {
                varselLenke.removeEventListener('click', this.gaEventHandler);
                varselLenke.removeEventListener(
                    'auxclick',
                    this.gaEventHandler
                );
            }
        }
    };

    componentDidMount(): void {
        window.addEventListener('resize', this.handleWindowSize);
        this.addGaEventTriggers();
        this.setTabIndex();
    }

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (this.props.tabIndex !== prevProps.tabIndex) {
            this.setTabIndex();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize);
        this.removeGaEventTriggers();
    }

    erTabletEllerDesktop = () => {
        return this.state.windowSize > tabletview - 1;
    };

    erDesktop = () => {
        return this.state.windowSize > desktopview - 1;
    };

    render() {
        const {
            tabIndex,
            antallUlesteVarsler,
            antallVarsler,
            language,
        } = this.props;

        return (
            <div className={'varsler-display-mobil-tablet'}>
                <div className="media-sm-mobil mobil-meny">
                    <div className="nye-varsler-mobil-wrapper">
                        <NyVarsel
                            antallUlesteVarsler={antallUlesteVarsler}
                            antallVarsler={antallVarsler}
                            language={language}
                            tabIndex={tabIndex}
                        />
                    </div>
                </div>
                {this.state.parsedVarsler}
                <div className="media-tablet-desktop tablet-desktop-meny">
                    <NyVarsel
                        antallUlesteVarsler={antallUlesteVarsler}
                        antallVarsler={antallVarsler}
                        language={language}
                        tabIndex={tabIndex}
                    />
                </div>
            </div>
        );
    }
}

const NyVarsel = ({
    antallVarsler,
    antallUlesteVarsler,
    language,
    tabIndex,
}: {
    antallVarsler: number;
    antallUlesteVarsler: number;
    language: Language;
    tabIndex: boolean;
}) => {
    const { API_VARSELINNBOKS_URL } = useSelector(
        (state: AppState) => state.environment
    );
    const arbeidsflate = useSelector(
        (state: AppState) => state.arbeidsflate.status
    );
    return antallVarsler > 5 ? (
        <div className="vis-alle-lenke skillelinje-topp">
            <LenkeMedGA
                href={API_VARSELINNBOKS_URL}
                tabIndex={tabIndex ? 0 : -1}
                gaEventArgs={{
                    context: arbeidsflate,
                    category: GACategory.Header,
                    action: 'varsler/visalle',
                    label: API_VARSELINNBOKS_URL,
                }}
            >
                <Tekst id={'varsler-visalle'} />
                {antallUlesteVarsler > 0
                    ? ` (${antallUlesteVarsler} ${finnTekst(
                          'varsler-nye',
                          language
                      )})`
                    : ''}
            </LenkeMedGA>
        </div>
    ) : null;
};

const mapStateToProps = (state: AppState): StateProps => ({
    varsler: state.varsler.data.varsler,
    antallVarsler: state.varsler.data.antall,
    antallUlesteVarsler: state.varsler.data.uleste,
    language: state.language.language,
});

export default connect(mapStateToProps)(Varselvisning);
