import React from 'react';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import { logAmplitudeEvent } from 'utils/analytics/amplitude';
import './Alternativ.less';

interface Props {
    avbryt: () => void;
}

const KnappeRekke = ({ avbryt }: Props) => {
    const userClosedFeedback = () => {
        logAmplitudeEvent('tilbakemelding', { kilde: 'footer', fritekst: 'ingen kommentar' });
        avbryt();
    };

    return (
        <div className="knapper">
            <Hovedknapp htmlType="submit" className="send-inn">
                <Tekst id="send-inn-tilbakemelding" />
            </Hovedknapp>
            <Flatknapp mini onClick={userClosedFeedback} htmlType="button">
                <Tekst id="avbryt-tilbakemelding" />
            </Flatknapp>
        </div>
    );
};

export default KnappeRekke;
