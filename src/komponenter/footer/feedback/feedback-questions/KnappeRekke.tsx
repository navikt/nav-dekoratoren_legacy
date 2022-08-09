import { Button } from '@navikt/ds-react';
import React from 'react';
import Tekst from 'tekster/finn-tekst';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import style from './Alternativ.module.scss';

interface Props {
    avbryt: () => void;
}

const KnappeRekke = ({ avbryt }: Props) => {
    const userClosedFeedback = () => {
        logAmplitudeEvent('tilbakemelding', { kilde: 'footer', fritekst: 'ingen kommentar' });
        avbryt();
    };

    return (
        <div className={style.knapper}>
            <Button variant="primary" type="submit">
                <Tekst id="send-inn-tilbakemelding" />
            </Button>
            <Button variant="tertiary" size="small" onClick={userClosedFeedback} type="button">
                <Tekst id="avbryt-tilbakemelding" />
            </Button>
        </div>
    );
};

export default KnappeRekke;
