import React, { useEffect, useState } from 'react';
import Modal from 'nav-frontend-modal';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './DelSkjermModal.less';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const DelSkjermModal = (props: Props) => {
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const w = window as any;
    const verdictExists = typeof w !== 'undefined' && w.vngage;
    const navGroupId = 'A034081B-6B73-46B7-BE27-23B8E9CE3079';

    useEffect(() => {
        if (verdictExists) {
            setIsOpen(w.vngage.get('queuestatus', navGroupId));
        }
    }, []);

    const onClick = () => {
        if (verdictExists) {
            const response = w.vngage.join('queue', {
                opportunityId: '615FF5E7-37B7-4697-A35F-72598B0DC53B',
                solutionId: '5EB316A1-11E2-460A-B4E3-F82DBD13E21D',
                caseTypeId: '66D660EF-6F14-44B4-8ADE-A70A127202D0',
                category: 'Phone2Web',
                message: 'Phone2Web',
                groupId: navGroupId,
                startCode: code,
            });
            console.log(response);
            setIsOpen(false);
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
                <div className={'delskjerm__beskrivelse'}>
                    Nå gir du veilederen tilgang til å se det du ser på i
                    nettvindu du har nav.no åpent i.
                </div>
                {isOpen ? (
                    <>
                        <Input
                            name={'code'}
                            label={
                                'Skriv inn koden du får fra veilederen på telefonen'
                            }
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            maxLength={5}
                            bredde={'M'}
                        />
                        <div className={'delskjerm__knapper'}>
                            <Hovedknapp onClick={onClick}>
                                Start skjermdeling
                            </Hovedknapp>
                            <Flatknapp onClick={props.onClose}>
                                Avbryt
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
