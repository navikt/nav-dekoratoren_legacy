import React from 'react';
import './SokMenyKnapp.less';
import BEMHelper from '../../../../utils/bem';
import Menyknapp from '../ekspanderende-menyer/meny-knapp/Menyknapp';
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
        <Menyknapp
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
        </Menyknapp>
    );
};

export default SokMenyKnapp;
