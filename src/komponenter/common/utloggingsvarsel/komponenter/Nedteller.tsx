import React, { FunctionComponent } from 'react';
import TypografiBase from 'nav-frontend-typografi';
import Clock from '../../../../ikoner/varsler/Clock';
import BEMHelper from '../../../../utils/bem';

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
    subClass?: string;
}

const Nedteller: FunctionComponent<Props> = (props) => {
    const { tekst, subClass } = props;
    const cls = BEMHelper('utloggingsvarsel');
    return (
        <div className={`${subClass ? cls.element('timer', subClass) : cls.element('timer')}`}>
            <Clock width="1.125rem" height="1.125rem" />
            <TypografiBase type={props.typoGrafi}>{tekst}</TypografiBase>
        </div>
    );
};

export default Nedteller;
