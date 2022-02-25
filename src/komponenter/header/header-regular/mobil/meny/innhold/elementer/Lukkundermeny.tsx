import React from 'react';
import Lenke from 'nav-frontend-lenker';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { useDispatch } from 'react-redux';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';
import { Label } from '@navikt/ds-react';

interface Props {
    className: string;
}

const Lukkundermeny = (props: Props) => {
    const dispatch = useDispatch();
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('lukk-undermeny')}>
            <Lenke
                href="https://nav.no"
                onClick={(event) => {
                    event.preventDefault();
                    dispatch(toggleUndermenyVisning());
                }}
            >
                <VenstreChevron />
                <Label>
                    <Tekst id="tilbake-til-overskrift" />
                </Label>
            </Lenke>
        </div>
    );
};

export default Lukkundermeny;
