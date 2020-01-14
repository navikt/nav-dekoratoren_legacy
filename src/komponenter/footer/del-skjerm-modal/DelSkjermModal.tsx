import React, { useEffect, useState } from 'react';
import Modal from 'nav-frontend-modal';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import { useSelector } from 'react-redux';
import Veileder from '../../../ikoner/veiledere/Veileder.svg';
import Tekst, { finnTekst } from '../../../tekster/finn-tekst';
import { AppState } from '../../../reducer/reducer';
import './DelSkjermModal.less';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const DelSkjermModal = (props: Props) => {
    // Language
    const language = useSelector((state: AppState) => state.language).language;
    const feilmelding = finnTekst('delskjerm-modal-feilmelding', language);
    const label = finnTekst('delskjerm-modal-label', language);

    // State
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(feilmelding);
    const feil = submitted && error ? { feilmelding: error } : undefined;

    // Verdic
    const w = window as any;
    const verdictExists = typeof w !== 'undefined' && w.vngage;
    const navGroupId = 'A034081B-6B73-46B7-BE27-23B8E9CE3079';

    useEffect(() => {
        if (verdictExists) {
            setIsOpen(w.vngage.get('queuestatus', navGroupId));
        }
    }, []);

    const onClick = () => {
        setSubmitted(true);
        if (verdictExists && !error) {
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

    return (
        <Modal
            className="navno-dekorator delskjerm__modal"
            isOpen={props.isOpen}
            contentLabel={'Skjermdeling'}
            onRequestClose={props.onClose}
        >
            <div className={'delskjerm__header'}>
                <img className={'delskjerm__veileder'} src={Veileder} />
            </div>
            <div className={'delskjerm__content'}>
                <Undertittel>
                    <Tekst id={'delskjerm-modal-overskrift'} />
                </Undertittel>
                <div className={'delskjerm__beskrivelse'}>
                    <Normaltekst>
                        <Tekst id={'delskjerm-modal-beskrivelse'} />
                    </Normaltekst>
                </div>
                {isOpen ? (
                    <>
                        <Input
                            name={'code'}
                            label={label}
                            feil={feil}
                            value={code}
                            onChange={e => {
                                const value = e.target.value;
                                setCode(value);
                                setError('');
                                if (!value.match(/\b\d{5}\b/g)) {
                                    setError(feilmelding);
                                }
                            }}
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
                    <Normaltekst>Chatten er stengt</Normaltekst>
                )}
            </div>
        </Modal>
    );
};

export default DelSkjermModal;
