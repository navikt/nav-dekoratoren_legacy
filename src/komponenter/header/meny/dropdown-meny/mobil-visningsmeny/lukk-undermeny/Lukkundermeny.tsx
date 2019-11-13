import React from 'react';

import BEMHelper from '../../../../../../utils/bem';
import Lenke from 'nav-frontend-lenker';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';

interface Props {
    lukkundermeny: () => void;
    className: string;
}

const Lukkundermeny = (props: Props) => {
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('lukk-undermeny')}>
            <Innholdstittel className={cls.element('meny', 'tilbakeknapp')}>
                <Lenke
                    href="https://nav.no"
                    onClick={event => {
                        event.preventDefault();
                        props.lukkundermeny();
                    }}
                >
                    <VenstreChevron />
                    Tilbake til oversikt
                </Lenke>
            </Innholdstittel>
        </div>
    );
};

export default Lukkundermeny;
