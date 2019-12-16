import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../reducer/reducer';
import parse from 'html-react-parser';
import { varselinnboksUrl } from '../../../../../api/api';
import { tabletview } from '../../../../../styling-mediaquery';
import './Varselvisning.less';

interface OwnProps {
    className?: string;
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
        const erTabletEllerDesktop = this.state.windowSize > tabletview - 1;
        const varslerWrapperElement = erTabletEllerDesktop
            ? '.desktopmeny #varselinnboks-varsler'
            : '.mobilmeny #varselinnboks-varsler';

        const varselinnboksVarsler = document.querySelector(
            varslerWrapperElement
        );

        if (varselinnboksVarsler) {
            for (
                let i = 0;
                i <= varselinnboksVarsler.getElementsByTagName('a').length;
                i++
            ) {
                if (varselinnboksVarsler.getElementsByTagName('a')[i]) {
                    varselinnboksVarsler.getElementsByTagName('a')[
                        i
                    ].tabIndex = this.props.tabIndex ? 0 : -1;
                }
            }
        }
    };

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (this.props.togglevarselmeny) {
            this.setTabIndex();
            if (this.props.tabIndex && !prevProps.tabIndex) {
                this.props.togglevarselmeny();
            }
        }
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.handleWindowSize);
        this.setTabIndex();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize);
    }

    render() {
        const { className } = this.props;
        return (
            <div className={className ? className : 'varsler-display-desktop'}>
                {this.state.parsedVarsler}

                {this.props.antallVarsler > 5 && (
                    <div className="vis-alle-lenke skillelinje-topp">
                        <a
                            href={varselinnboksUrl}
                            tabIndex={this.props.tabIndex ? 0 : -1}
                        >
                            Vis alle dine varsler
                            {this.props.antallUlesteVarsler > 0
                                ? ` (${this.props.antallUlesteVarsler} nye)`
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
