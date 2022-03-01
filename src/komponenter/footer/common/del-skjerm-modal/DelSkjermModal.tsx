import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, BodyLong, Heading, TextField } from '@navikt/ds-react';
import Modal from 'nav-frontend-modal';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { AppState } from 'store/reducers';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
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
                opportunityId: '615FF5E7-37B7-4697-A35F-72598B0DC53B',
                solutionId: '5EB316A1-11E2-460A-B4E3-F82DBD13E21D',
                caseTypeId: '66D660EF-6F14-44B4-8ADE-A70A127202D0',
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
                <Heading size="medium" level="2">
                    <Tekst id={'delskjerm-modal-overskrift'} />
                </Heading>
                <div className={'delskjerm__beskrivelse typo-normal'}>
                    <BodyLong>
                        <Tekst id={'delskjerm-modal-beskrivelse'} />
                    </BodyLong>
                    <Lesmerpanel apneTekst={finnTekst('delskjerm-modal-hjelpetekst-overskrift', language)}>
                        <ul>
                            {[...Array(3)].map((_, i) => (
                                <li key={i}>
                                    <BodyLong>
                                        <Tekst id={`delskjerm-modal-hjelpetekst-${i}`} />
                                    </BodyLong>
                                </li>
                            ))}
                        </ul>
                    </Lesmerpanel>
                </div>
                {isOpen ? (
                    <>
                        <TextField
                            name={'code'}
                            label={label}
                            error={submitted && error}
                            value={code}
                            onChange={onChange}
                            maxLength={5}
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
                    <Alert variant="error">
                        <Tekst id={'delskjerm-modal-stengt'} />
                    </Alert>
                )}
            </div>
        </Modal>
    );
};

export default DelSkjermModal;
