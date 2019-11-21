import React from 'react';
import { varselinnboksUrl } from '../../../../../api/api';
import './Varselvisning.less';
import { AppState } from '../../../../../reducer/reducer';
import { connect } from 'react-redux';
import parse from 'html-react-parser';

interface OwnProps {
    className?: string;
}

interface StateProps {
    varsler: string;
    antallVarsler: number;
    antallUlesteVarsler: number;
}

const Varselvisning: React.FunctionComponent<OwnProps & StateProps> = props => {
    const { className } = props;
    const html = parse(props.varsler);
    return (
        <div
            id="varsler-display"
            className={className ? className : 'varsler-display'}
        >
            {html}
            {props.antallVarsler > 5 && (
                <div className="vis-alle-lenke skillelinje-topp">
                    <a href={varselinnboksUrl}>
                        Vis alle dine varsler
                        {props.antallUlesteVarsler > 0
                            ? ` (${props.antallUlesteVarsler} nye)`
                            : ''}
                    </a>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    varsler: state.varsler.data.varsler,
    antallVarsler: state.varsler.data.antall,
    antallUlesteVarsler: state.varsler.data.uleste,
});

export default connect(mapStateToProps)(Varselvisning);
