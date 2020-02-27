import React from 'react';
import './SokMenyKnapp.less';
import BEMHelper from '../../../../utils/bem';
import HovedmenyKnapp from './HovedmenyKnapp';
import { toggleSok } from '../../../../reducer/dropdown-toggle-duck';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../../tekster/finn-tekst';
import { useDispatch } from 'react-redux';

type Props = {
    isOpen: boolean;
};

// TODO: bedre classnames

const classname = 'sok-knapp';

export const SokMenyKnapp = ({ isOpen }: Props) => {
    const cls = BEMHelper(classname);
    const dispatch = useDispatch();

    return (
        <HovedmenyKnapp
            toggleMenu={() => dispatch(toggleSok())}
            clicked={isOpen}
            classname={'sok-dropdown'}
            ariaControlsId={classname}
        >
            <div
                className={`${cls.element('container')}${
                    classname ? ` ${classname}` : ''
                }`}
            >
                <div className={cls.element('circle', isOpen ? 'open' : '')} />
                <div className={cls.element('line', isOpen ? 'open' : '')} />
            </div>
            <Undertittel>
                <Tekst id={'sok-knapp'} />
            </Undertittel>
        </HovedmenyKnapp>
    );
};

export default SokMenyKnapp;
