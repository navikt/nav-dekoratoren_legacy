import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../../utils/bem';

interface Props {
    overskrift: string;
}

const UtloggingsvarselTekstInnhold: FunctionComponent<Props> = (props) => {
    const { overskrift } = props;
    const cls = BEMHelper('utloggingsvarsel');

    return (
        <div className={cls.element('tekst-innhold')}>
            <Systemtittel className={cls.element('heading')}>{overskrift}</Systemtittel>
            <Normaltekst>
                Avslutt det du jobber med. Trenger du mer tid, må du logge inn på nytt.
            </Normaltekst>
        </div>
    );
};
export default UtloggingsvarselTekstInnhold;
