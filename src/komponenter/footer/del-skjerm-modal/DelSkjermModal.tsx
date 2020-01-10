import React, { useEffect, useState } from 'react';
import Modal from 'nav-frontend-modal';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './DelSkjermModal.less';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const DelSkjermModal = (props: Props) => {
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const w = window as any;
    const verdictExists = typeof w !== 'undefined' && w.vngage;

    useEffect(() => {
        if (verdictExists) {
            const queues: { [key: string]: string } = w.vngage.get(
                'queuestatus'
            );
            const openQueues = Object.values(queues).filter(
                status => status === 'open'
            );
            setIsOpen(!!openQueues.length);
        }
    }, []);

    const onClick = () => {
        if (verdictExists) {
            w.vngage.join('queue', {
                opportunityId: '615FF5E7-37B7-4697-A35F-72598B0DC53B',
                solutionId: '5EB316A1-11E2-460A-B4E3-F82DBD13E21D',
                groupId: 'A034081B-6B73-46B7-BE27-23B8E9CE3079',
                caseTypeId: '66D660EF-6F14-44B4-8ADE-A70A127202D0',
                category: 'Phone2Web',
                startCode: code,
                message: 'Phone2Web',
            });
        }
    };

    return (
        <Modal
            className="navno-dekorator delskjerm__modal"
            isOpen={props.isOpen}
            contentLabel={'Skjermdeling'}
            onRequestClose={props.onClose}
        >
            <div className={'delskjerm__content'}>
                <Undertittel>Del skjermen din med veilederen</Undertittel>
                <div className={'delskjerm__beskrivelse'}></div>
                {isOpen ? (
                    <>
                        <Input
                            name={'code'}
                            label={
                                'Skriv inn koden du får fra veilederen på telefonen'
                            }
                            value={code}
                            onChange={e => {
                                setCode(e.target.value);
                                const input = document.getElementsByName(
                                    'code'
                                ) as NodeListOf<HTMLInputElement>;
                                for (let i = 0; i < input.length; i++) {
                                    input[i].value = e.target.value;
                                }
                            }}
                            maxLength={5}
                            bredde={'S'}
                        />
                        <Hovedknapp className="vngage-btn" onClick={onClick}>
                            Start skjermdeling
                        </Hovedknapp>
                    </>
                ) : (
                    <Normaltekst>Chatten er stengt</Normaltekst>
                )}
            </div>
        </Modal>
    );
};

export default DelSkjermModal;
