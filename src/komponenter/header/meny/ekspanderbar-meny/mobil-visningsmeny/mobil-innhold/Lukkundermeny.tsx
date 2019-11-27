import React from 'react';

import BEMHelper from '../../../../../../utils/bem';
import Lenke from 'nav-frontend-lenker';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import Tekst from '../../../../../../tekster/finn-tekst';

interface Props {
    lukkundermeny: () => void;
    className: string;
    tabindex: boolean;
}

const Lukkundermeny = (props: Props) => {
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('lukk-undermeny')}>
            <Innholdstittel className={cls.element('meny', 'tilbakelenke')}>
                <Lenke
                    href="https://nav.no"
                    onClick={event => {
                        event.preventDefault();
                        props.lukkundermeny();
                    }}
                    tabIndex={props.tabindex ? 0 : -1}
                >
                    <VenstreChevron />
                    <Tekst id="tilbake-til-overskrift" />
                </Lenke>
            </Innholdstittel>
        </div>
    );
};

export default Lukkundermeny;
