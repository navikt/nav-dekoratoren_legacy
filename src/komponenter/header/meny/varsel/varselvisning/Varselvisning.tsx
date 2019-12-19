import React from 'react';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import { AppState } from '../../../../../reducer/reducer';
import { varselinnboksUrl } from '../../../../../api/api';
import { desktopview, tabletview } from '../../../../../styling-mediaquery';
import './Varselvisning.less';

interface OwnProps {
    tabIndex: boolean;
    togglevarselmeny?: () => void;
}

interface StateProps {
    varsler: string;
    antallVarsler: number;
    antallUlesteVarsler: number;
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
        const varslerWrapperElement: string = this.erTabletEllerDesktop()
            ? '.desktopmeny .nav-varsler'
            : '.mobilmeny .nav-varsler';

        const varsler = document.querySelector(varslerWrapperElement);

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

    componentDidMount(): void {
        window.addEventListener('resize', this.handleWindowSize);
        this.setTabIndex();
    }

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (this.props.togglevarselmeny) {
            this.setTabIndex();
            if (this.props.tabIndex && !prevProps.tabIndex) {
                this.props.togglevarselmeny();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize);
    }

    erTabletEllerDesktop = () => {
        return this.state.windowSize > tabletview - 1;
    };

    erDesktop = () => {
        return this.state.windowSize > desktopview - 1;
    };

    render() {
        const { tabIndex, antallUlesteVarsler, antallVarsler } = this.props;
        const klassenavn = this.erDesktop()
            ? 'varsler-display-desktop'
            : 'varsler-display-mobil-tablet';

        return (
            <div className={klassenavn}>
                {this.state.parsedVarsler}

                {antallVarsler > 5 && (
                    <div className="vis-alle-lenke skillelinje-topp">
                        <a href={varselinnboksUrl} tabIndex={tabIndex ? 0 : -1}>
                            Vis alle dine varsler
                            {antallUlesteVarsler > 0
                                ? ` (${antallUlesteVarsler} nye)`
                                : ''}
                        </a>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    varsler: state.varsler.data.varsler,
    antallVarsler: state.varsler.data.antall,
    antallUlesteVarsler: state.varsler.data.uleste,
});

export default connect(mapStateToProps)(Varselvisning);
