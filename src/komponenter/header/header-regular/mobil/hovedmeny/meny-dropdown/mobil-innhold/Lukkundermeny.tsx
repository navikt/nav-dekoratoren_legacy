import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi/';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import BEMHelper from 'utils/bem';
import Tekst from 'tekster/finn-tekst';
import { useDispatch } from 'react-redux';
import { toggleUndermenyVisning } from 'store/reducers/dropdown-toggle-duck';

interface Props {
    setFocusIndex: () => void;
    className: string;
}

const Lukkundermeny = (props: Props) => {
    const dispatch = useDispatch();
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('lukk-undermeny')}>
            <Undertittel className={cls.element('meny', 'tilbakelenke')}>
                <Lenke
                    href="https://nav.no"
                    onClick={(event) => {
                        event.preventDefault();
                        props.setFocusIndex();
                        dispatch(toggleUndermenyVisning());
                    }}
                >
                    <VenstreChevron />
                    <Tekst id="tilbake-til-overskrift" />
                </Lenke>
            </Undertittel>
        </div>
    );
};

export default Lukkundermeny;
