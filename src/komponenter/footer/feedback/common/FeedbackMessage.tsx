import React, { useState, Fragment } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Filter } from 'utils/text-filter/Filter';
import { Hovedknapp } from 'nav-frontend-knapper';

const FeedbackMessage = () => {
    const [feedbackMessage, setFeedbackMessage] = useState(String);
    const [violations, setViolations] = useState(String);

    const getViolationsFormatted = () => {
        const filter = new Filter([]);

        filter.checkForViolations(feedbackMessage);

        return filter.getViolationsFormatted();
    };

    const submitFeedback = (evt: any) => {
        evt.preventDefault();

        const violations = getViolationsFormatted();

        violations.length ? setViolations(violations) : setViolations('');
    };

    return (
        <Fragment>
            <form onSubmit={submitFeedback}>
                <Textarea
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                />

                {violations.length ? (
                    <Alertstripe form="inline" type="feil">
                        <Normaltekst>
                            Vi mistenker at du har skrevet inn
                            {violations}. Dersom du likevel mener dette er
                            riktig kan du trykke 'Send inn'
                        </Normaltekst>
                    </Alertstripe>
                ) : null}

                <div className="">
                    <Hovedknapp htmlType="submit">Send inn</Hovedknapp>
                </div>
            </form>
        </Fragment>
    );
};

export default FeedbackMessage;
