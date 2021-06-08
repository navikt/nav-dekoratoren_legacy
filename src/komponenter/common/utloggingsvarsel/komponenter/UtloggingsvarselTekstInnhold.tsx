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
                Lukk denne boksen og avslutt det du jobber med. <br />
                Er du ferdig, kan du logge ut med en gang eller logge inn på ny.
            </Normaltekst>
        </div>
    );
};
export default UtloggingsvarselTekstInnhold;
