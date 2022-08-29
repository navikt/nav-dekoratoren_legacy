import React, { ChangeEvent, useEffect, useState } from 'react';
import { Alert, BodyLong, Button, Heading, ReadMore, TextField, Modal } from '@navikt/ds-react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Tekst, { finnTekst } from 'tekster/finn-tekst';
import { Bilde } from 'komponenter/common/bilde/Bilde';
import style from './DelSkjermModal.module.scss';

const veileder = require('ikoner/del-skjerm/Veileder.svg');
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const DelSkjermModal = (props: Props) => {
    // Language
    const language = useSelector((state: AppState) => state.language).language;
    const feilmelding = finnTekst('delskjerm-modal-feilmelding', language);
    const label = finnTekst('delskjerm-modal-label', language);
    const { OPPORTUNITY_ID } = useSelector((state: AppState) => state.environment);
    const { CASETYPE_ID } = useSelector((state: AppState) => state.environment);
    const { SOLUTION_ID } = useSelector((state: AppState) => state.environment);
    const { NAV_GROUP_ID } = useSelector((state: AppState) => state.environment);

    // State
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(feilmelding);

    // Vergic config
    const w = window as any;
    const vergicExists = typeof w !== 'undefined' && w.vngage;

    useEffect(() => {
        if (vergicExists) {
            setIsOpen(w.vngage.get('queuestatus', NAV_GROUP_ID));
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
                groupId: NAV_GROUP_ID,
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

    return (
        <Modal
            open={props.isOpen}
            className={`decorator-wrapper ${style.delskjerm}`}
            aria-label={'Skjermdeling'}
            onClose={props.onClose}
            style={{ overlay: { backgroundColor: 'rgba(50, 65, 79, 0.8)' } }}
        >
            <div className={style.header}>
                <Bilde className={style.veileder} asset={veileder} altText={''} />
            </div>
            <div className={style.content}>
                <Heading size="medium" level="2">
                    <Tekst id={'delskjerm-modal-overskrift'} />
                </Heading>
                <div className={style.beskrivelse}>
                    <BodyLong>
                        <Tekst id={'delskjerm-modal-beskrivelse'} />
                    </BodyLong>
                    <ReadMore header={finnTekst('delskjerm-modal-hjelpetekst-overskrift', language)}>
                        <ul>
                            {[...Array(3)].map((_, i) => (
                                <li key={i}>
                                    <BodyLong>
                                        <Tekst id={`delskjerm-modal-hjelpetekst-${i}`} />
                                    </BodyLong>
                                </li>
                            ))}
                        </ul>
                    </ReadMore>
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
                        <div className={style.knapper}>
                            <Button onClick={onClick}>
                                <Tekst id={'delskjerm-modal-start'} />
                            </Button>
                            <Button variant="tertiary" onClick={props.onClose}>
                                <Tekst id={'delskjerm-modal-avbryt'} />
                            </Button>
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
