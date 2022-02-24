import React from 'react';
import { Link } from '@navikt/ds-react';
import { Undertittel } from 'nav-frontend-typografi/';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { useDispatch } from 'react-redux';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';

interface Props {
    className: string;
}

const Lukkundermeny = (props: Props) => {
    const dispatch = useDispatch();
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('lukk-undermeny')}>
            <Undertittel className={cls.element('meny', 'tilbakelenke')}>
                <Link
                    href="https://nav.no"
                    onClick={(event) => {
                        event.preventDefault();
                        dispatch(toggleUndermenyVisning());
                    }}
                >
                    <VenstreChevron />
                    <Tekst id="tilbake-til-overskrift" />
                </Link>
            </Undertittel>
        </div>
    );
};

export default Lukkundermeny;
