import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Close from '../../../../../ikoner/varsler/Close';
import BEMHelper from '../../../../../utils/bem';
import Nedteller, { TypografiTypes } from '../Nedteller';
import CollapseUp from '../../../../../ikoner/varsler/CollapseUp';
import { Normaltekst } from 'nav-frontend-typografi';
import './liteEkspanderbartvindu.less';

interface Props {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    setMinimized: Dispatch<SetStateAction<boolean>>;
    minimized: boolean;
    typoGrafi: TypografiTypes;
    tid: string;
    visFullTekst: boolean;
}

const LiteEkspanderbartvindu: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('liteExpanderbartvindu');
    const { setMinimized, setModalOpen, minimized, typoGrafi, tid, visFullTekst } = props;
    const tekst = visFullTekst ? 'Du blir automatisk logget ut om ' : '';

    const setFocus = (id: string) => {
        const element = document.getElementById(id);
        if(element) {
            element.focus();
        }
    }

    const keyHandler = (event: any, buttonkey: string) => {
        if(buttonkey === 'open' && event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            setFocus('desktop-sok-knapp')
        }else if (buttonkey === 'close' && !event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            setFocus('footer-til-toppen')
        }
    }

    return (
        <nav className={cls.className} aria-hidden={!minimized}>
            <div className={cls.element('wrapper')}>
                <Nedteller typoGrafi={typoGrafi} tekst={tekst.concat(tid)} />
                <div className={cls.element('expanderbart-nav')}>
                    <>
                        <div className={cls.element('btn-container')}>
                            <button
                                id="open-utloggingsvarsel"
                                tabIndex={minimized ? 0 : -1}
                                onKeyDownCapture={event => keyHandler(event, 'open')}
                                onClick={() => {
                                    document.body.setAttribute("aria-hidden", "true");
                                    document.body.style.overflow = 'hidden';
                                    setMinimized(false);
                                }}
                            >
                                <span className={cls.element('btn-content')}>
                                    <Normaltekst>Åpne</Normaltekst>
                                    <CollapseUp width="1.5rem" height="1.5rem" />
                                </span>
                            </button>
                        </div>
                    </>
                    <div className={cls.element('btn-container')}>
                        <button
                            id="close-utloggingsvarsel"
                            tabIndex={minimized ? 0 : -1}
                            onKeyDownCapture={event => keyHandler(event, 'close')}
                            onClick={() => {
                                setMinimized(false);
                                setModalOpen(false);
                            }}
                        >
                            <span className={cls.element('btn-content')}>
                                <Normaltekst>Lukk</Normaltekst>
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
