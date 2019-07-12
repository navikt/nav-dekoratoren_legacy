import * as React from 'react';
import parse from 'html-react-parser';
import { AppState } from '../../../redux/reducer';
import { connect } from 'react-redux';
import VarselIkon from '../../../komponenter/header/ikoner/VarselIkon';
import VarselVisning from '../../../komponenter/header/nedtrekksmeny/Varsel-visning';
import './Varselinnboks.less';

interface StateProps {
    varsler: string;
    harVarsler: boolean;
    erInnlogget: boolean;
}

class Varselinnboks extends React.Component<StateProps> {
    constructor(props: StateProps) {
        super(props);
    }

    render() {
        const { varsler, harVarsler, erInnlogget } = this.props;
        const html = parse(varsler);
        console.log('varsler:', varsler);
        console.log('html:', html);
        return (
            <>
                {erInnlogget && harVarsler
                    ? (<div id="toggle-varsler-container" className="toggle-varsler-container">
                        <VarselIkon ikonClass="varselIkon"/>
                       </div>)
                    : null
                }
                <VarselVisning html={html}/>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    varsler: state.varsler.data.varsler,
    harVarsler: state.varsler.data.antall > 0,
    erInnlogget: state.innloggingsstatus.data.authenticated === true && state.innloggingsstatus.data.securityLevel === '4'
});

export default connect(mapStateToProps)(Varselinnboks);
/*
<div id="toggle-varsler-container" className="toggle-varsler-container">
    <button type="button" id="toggle-varsler" className="toggle-varsler" aria-controls="varsler-display"
            aria-label="Varsler" title="Varsler" aria-expanded="false" data-base-url="https://www-q0.nav.no/person"
            data-tekst-varselurl-lenketekst="Gå til meldingen" data-tekst-ingenvarsler="Du har ingen varsler å vise"
            data-tekst-error="Det oppstod et problem under henting av varslene dine"
            data-tekst-visalle="Vis alle dine varsler" data-tekst-visalle-nye-flertall="nye"
            data-tekst-visalle-nye-entall="ny"></button>
</div> */