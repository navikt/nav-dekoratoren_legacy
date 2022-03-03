import React, { FunctionComponent } from 'react';
import Clock from '../../../../ikoner/varsler/Clock';
import BEMHelper from '../../../../utils/bem';
import { BodyLong } from '@navikt/ds-react';

interface Props {
    tekst: string;
    subClass?: string;
}

const Nedteller: FunctionComponent<Props> = (props) => {
    const { tekst, subClass } = props;
    const cls = BEMHelper('utloggingsvarsel');
    return (
        <div className={`${subClass ? cls.element('timer', subClass) : cls.element('timer')}`}>
            <Clock width="1.125rem" height="1.125rem" />
            <BodyLong>{tekst}</BodyLong>
        </div>
    );
};

export default Nedteller;
