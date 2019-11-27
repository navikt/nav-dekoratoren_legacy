import React from 'react';
import { varselinnboksUrl } from '../../../../../api/api';
import './Varselvisning.less';
import { AppState } from '../../../../../reducer/reducer';
import { connect } from 'react-redux';
import parse from 'html-react-parser';

interface OwnProps {
    className?: string;
    tabIndex?: boolean;
    togglevarselmeny?: () => void;
}

interface StateProps {
    varsler: string;
    antallVarsler: number;
    antallUlesteVarsler: number;
}

interface State {
    parsedVarsler: any;
}

type Props = OwnProps & StateProps;

class Varselvisning extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            parsedVarsler: parse(this.props.varsler),
        };
    }

    setTabIndex = () => {
        const datapointer = document.getElementById('enonic-message');
        if (datapointer) {
            for (
                let i = 0;
                i <= datapointer.getElementsByTagName('a').length;
                i++
            ) {
                if (datapointer.getElementsByTagName('a')[i]) {
                    datapointer.getElementsByTagName('a')[i].tabIndex = this
                        .props.tabIndex
                        ? 0
                        : -1;
                }
            }
        }
    };

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (this.props.tabIndex && !prevProps.tabIndex) {
            if (this.props.togglevarselmeny) {
                this.setTabIndex();
                this.props.togglevarselmeny();
            }
        }

        if (
            !this.props.tabIndex &&
            prevProps.tabIndex &&
            !this.props.tabIndex
        ) {
            if (this.props.togglevarselmeny) {
                this.setTabIndex();
            }
        }
    }

    componentDidMount(): void {
        this.setTabIndex();
    }

    render() {
        const { className } = this.props;
        return (
            <div
                id="varsler-display"
                className={className ? className : 'varsler-display'}
            >
                <div className="enonic-message-wrapper" id="enonic-message">
                    {this.state.parsedVarsler}
                </div>
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
