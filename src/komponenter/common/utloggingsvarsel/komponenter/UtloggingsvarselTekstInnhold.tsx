import React, { FunctionComponent } from 'react';
import BEMHelper from '../../../../utils/bem';
import { BodyLong, Heading } from '@navikt/ds-react';

interface Props {
    overskrift: string;
}

const UtloggingsvarselTekstInnhold: FunctionComponent<Props> = (props) => {
    const { overskrift } = props;
    const cls = BEMHelper('utloggingsvarsel');

    return (
        <div className={cls.element('tekst-innhold')}>
            <Heading level="2" size="medium" className={cls.element('heading')}>
                {overskrift}
            </Heading>
            <BodyLong>Avslutt det du jobber med. Trenger du mer tid, må du logge inn på nytt.</BodyLong>
        </div>
    );
};
export default UtloggingsvarselTekstInnhold;
