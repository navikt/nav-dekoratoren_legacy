import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Close from '../../../../../ikoner/varsler/Close';
import BEMHelper from '../../../../../utils/bem';
import Nedteller, { TypografiTypes } from '../Nedteller';
import CollapseUp from '../../../../../ikoner/varsler/CollapseUp';
import './liteEkspanderbartvindu.less';
import { useCookies } from 'react-cookie';
import {
    utloggingsvarselEkspander,
    UtloggingsvarselState,
    VarselEkspandert,
} from '../../../../../store/reducers/utloggingsvarsel-duck';
import { CookieName, cookieOptions } from '../../../../../server/cookieSettings';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    typoGrafi: TypografiTypes;
    tid: string;
    visFullTekst: boolean;
}

const stateSelector = (state: AppState) => ({
    utloggingsvarsel: state.utloggingsvarsel,
});

const LiteEkspanderbartvindu: FunctionComponent<Props> = (props) => {
    const { utloggingsvarsel } = useSelector(stateSelector);
    const [, setCookie] = useCookies();
    const dispatch = useDispatch();
    const cls = BEMHelper('liteExpanderbartvindu');
    const { setModalOpen, typoGrafi, tid, visFullTekst } = props;
    const tekst = visFullTekst ? 'Du blir automatisk logget ut om ' : '';
    const htmlUUEnable: boolean = utloggingsvarsel.varselState === VarselEkspandert.MINIMERT;

    const setFocus = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.focus();
        }
    };

    const keyHandler = (event: any, buttonkey: string) => {
        if (buttonkey === 'open' && event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            setFocus('desktop-sok-knapp');
        } else if (buttonkey === 'close' && !event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            setFocus('footer-til-toppen');
        }
    };

    const ekspanderUtloggingsvarsel = (
        setCookieValue: Partial<UtloggingsvarselState> = { varselState: VarselEkspandert.EKSPANDERT }
    ) => {
        dispatch(utloggingsvarselEkspander());
        setCookie(
            CookieName.DECORATOR_LOGOUT_WARNING,
            {
                ...utloggingsvarsel,
                ...setCookieValue,
            } as UtloggingsvarselState,
            cookieOptions
        );
    };

    return (
        <nav className={cls.className} aria-hidden={!htmlUUEnable}>
            <div className={cls.element('wrapper')}>
                <Nedteller typoGrafi={typoGrafi} tekst={tekst.concat(tid)} />
                <div className={cls.element('expanderbart-nav')}>
                    <>
                        <div className={cls.element('btn-container')}>
                            <button
                                id="open-utloggingsvarsel"
                                tabIndex={htmlUUEnable ? 0 : -1}
                                onKeyDownCapture={(event) => keyHandler(event, 'open')}
                                onClick={() => {
                                    document.body.setAttribute('aria-hidden', 'true');
                                    document.body.style.overflow = 'hidden';
                                    ekspanderUtloggingsvarsel();
                                }}
                            >
                                <span className={cls.element('btn-content')}>
                                    <BodyShort>Åpne</BodyShort>
                                    <CollapseUp width="1.5rem" height="1.5rem" />
                                </span>
                            </button>
                        </div>
                    </>
                    <div className={cls.element('btn-container')}>
                        <button
                            id="close-utloggingsvarsel"
                            tabIndex={htmlUUEnable ? 0 : -1}
                            onKeyDownCapture={(event) => keyHandler(event, 'close')}
                            onClick={() => {
                                setModalOpen(false);
                                ekspanderUtloggingsvarsel({
                                    ...utloggingsvarsel,
                                    varselState: VarselEkspandert.EKSPANDERT,
                                    modalLukketAvBruker: true,
                                });
                            }}
                        >
                            <span className={cls.element('btn-content')}>
                                <BodyShort>Lukk</BodyShort>
                                <Close width="1.5rem" height="1.5rem" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default LiteEkspanderbartvindu;
