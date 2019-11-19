import React from 'react';
import { varselinnboksUrl } from '../../../../../api/api';
import './Varsel-visning.less';

interface OwnProps {
    html: Object;
    antallUlesteVarsler: number;
    antallVarsler: number;
}

const VarselVisning: React.FunctionComponent<OwnProps> = props => {
    return (
        <div id="varsler-display" className="varsler-display">
            {props.html}
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

export default VarselVisning;
