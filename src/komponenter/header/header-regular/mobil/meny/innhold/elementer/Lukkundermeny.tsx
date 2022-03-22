import React from 'react';
import { Link, Label } from '@navikt/ds-react';
import { Back } from '@navikt/ds-icons';
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
            <Link
                href="https://nav.no"
                onClick={(event) => {
                    event.preventDefault();
                    dispatch(toggleUndermenyVisning());
                }}
            >
                <Back />
                <Label>
                    <Tekst id="tilbake-til-overskrift" />
                </Label>
            </Link>
        </div>
    );
};

export default Lukkundermeny;
