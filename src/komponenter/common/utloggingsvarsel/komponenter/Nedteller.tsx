import React, { FunctionComponent } from 'react';
import TypografiBase from 'nav-frontend-typografi';
import Clock from '../../../../ikoner/varsler/Clock';

export type TypografiTypes =
    | 'sidetittel'
    | 'innholdstittel'
    | 'systemtittel'
    | 'undertittel'
    | 'ingress'
    | 'element'
    | 'feilmelding'
    | 'normaltekst'
    | 'undertekstBold'
    | 'undertekst';

interface Props {
    typoGrafi: TypografiTypes;
    tekst: string;
}
const Nedteller: FunctionComponent<Props> = (props) => {
    const { tekst } = props;
    return (
        <div className="utloggingsvarsel__timer">
            <Clock width="1.125rem" height="1.125rem" />
            <TypografiBase type={props.typoGrafi}>{tekst}</TypografiBase>
            {/*<TypografiBase type={props.typoGrafi}>Du blir automatisk logget ut om 3 minutter</TypografiBase>*/}
        </div>
    );
};

export default Nedteller;
