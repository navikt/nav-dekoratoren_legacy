import React, { FunctionComponent } from 'react';
import Close from '../../../../ikoner/varsler/Close';
import BEMHelper from '../../../../utils/bem';
import { Element } from 'nav-frontend-typografi';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {
    utloggingsvarselMinimer,
    UtloggingsvarselState,
    VarselEkspandert
} from '../../../../store/reducers/utloggingsvarsel-duck';
import { CookieName, cookieOptions } from '../../../../server/cookieSettings';
import { AppState } from '../../../../store/reducers';

const stateSelector = (state: AppState) => ({
    utloggingsvarsel: state.utloggingsvarsel
});

const UtloggingNavigasjon: FunctionComponent = () => {
    const { utloggingsvarsel } = useSelector(stateSelector);
    const cls = BEMHelper('utloggingsvarsel');
    const dispatch = useDispatch();
    const [, setCookie] = useCookies();

    return (
        <nav className={cls.element('navigasjon')} aria-label='minimere og lukk varsel valg'>
            <button
                className={cls.element('lukk')}
                tabIndex={utloggingsvarsel.varselState === VarselEkspandert.MINIMERT ? -1 : 0}
                onClick={() => {
                    document.body.style.overflow = 'initial';
                    document.body.setAttribute('aria-hidden', 'false');
                    dispatch(utloggingsvarselMinimer());
                    setCookie(CookieName.DECORATOR_LOGOUT_WARNING,
                        {
                            ...utloggingsvarsel,
                            varselState: VarselEkspandert.MINIMERT

                        } as UtloggingsvarselState,
                        cookieOptions);
                }}
                aria-label='lukk modalen'
            >
                <Element>Lukk</Element>
                <Close width='1.5rem' height='1.5rem' />
            </button>
        </nav>
    );
};
export default UtloggingNavigasjon;
