import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'nav-frontend-modal';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { AppState } from 'store/reducers';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import './DelSkjermModal.less';

const veileder = require('ikoner/del-skjerm/Veileder.svg');
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const DelSkjermModal = (props: Props) => {
    const classname = 'delskjerm__modal';

    // Language
    const language = useSelector((state: AppState) => state.language).language;
    const feilmelding = finnTekst('delskjerm-modal-feilmelding', language);
    const label = finnTekst('delskjerm-modal-label', language);
    const { OPPORTUNITY_ID } = useSelector((state: AppState) => state.environment);
    const { CASETYPE_ID } = useSelector((state: AppState) => state.environment);
    const { SOLUTION_ID } = useSelector((state: AppState) => state.environment);
    console.log(OPPORTUNITY_ID);
    console.log(CASETYPE_ID);
    console.log(SOLUTION_ID);

    // State
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(feilmelding);

    // Vergic config
    const w = window as any;
    const vergicExists = typeof w !== 'undefined' && w.vngage;
    const navGroupId = 'A034081B-6B73-46B7-BE27-23B8E9CE3079';

    useEffect(() => {
        if (vergicExists) {
            setIsOpen(w.vngage.get('queuestatus', navGroupId));
        }
    }, []);

    const onClick = () => {
        setSubmitted(true);

        if (vergicExists && !error) {
            w.vngage.join('queue', {
                opportunityId: OPPORTUNITY_ID,
                solutionId: SOLUTION_ID,
                caseTypeId: CASETYPE_ID,
                category: 'Phone2Web',
                message: 'Phone2Web',
                groupId: navGroupId,
                startCode: code,
            });
            props.onClose();
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCode(value);
        setError('');
        if (!value.match(/\b\d{5}\b/g)) {
            setError(feilmelding);
        }
    };

    const setOverlayCss = () => {
        const elementsArray = document.getElementsByClassName('ReactModal__Overlay');
        const element = elementsArray[0] as HTMLElement;
        if (!element || !element.children[0] || !element.children[0].classList.contains(classname)) {
            return;
        }
        element.style.zIndex = '9999';
        element.style.backgroundColor = 'rgba(50, 65, 79, 0.8)'; // #32414f
    };

    return (
        <Modal
            onAfterOpen={setOverlayCss}
            isOpen={props.isOpen}
            className={`decorator-wrapper ${classname}`}
            contentLabel={'Skjermdeling'}
            onRequestClose={props.onClose}
        >
            <div className={'delskjerm__header'}>
                <Bilde className={'delskjerm__veileder'} asset={veileder} altText={''} />
            </div>
            <div className={'delskjerm__content'}>
                <Undertittel>
                    <Tekst id={'delskjerm-modal-overskrift'} />
                </Undertittel>
                <div className={'delskjerm__beskrivelse typo-normal'}>
                    <Normaltekst>
                        <Tekst id={'delskjerm-modal-beskrivelse'} />
                    </Normaltekst>
                    <Lesmerpanel apneTekst={finnTekst('delskjerm-modal-hjelpetekst-overskrift', language)}>
                        <ul>
                            {[...Array(3)].map((_, i) => (
                                <li key={i}>
                                    <Normaltekst>
                                        <Tekst id={`delskjerm-modal-hjelpetekst-${i}`} />
                                    </Normaltekst>
                                </li>
                            ))}
                        </ul>
                    </Lesmerpanel>
                </div>
                {isOpen ? (
                    <>
                        <Input
                            name={'code'}
                            label={label}
                            feil={submitted && error}
                            value={code}
                            onChange={onChange}
                            maxLength={5}
                            bredde={'M'}
                        />
                        <div className={'delskjerm__knapper'}>
                            <Hovedknapp onClick={onClick}>
                                <Tekst id={'delskjerm-modal-start'} />
                            </Hovedknapp>
                            <Flatknapp onClick={props.onClose}>
                                <Tekst id={'delskjerm-modal-avbryt'} />
                            </Flatknapp>
                        </div>
                    </>
                ) : (
                    <AlertStripeFeil>
                        <Tekst id={'delskjerm-modal-stengt'} />
                    </AlertStripeFeil>
                )}
            </div>
        </Modal>
    );
};

export default DelSkjermModal;
