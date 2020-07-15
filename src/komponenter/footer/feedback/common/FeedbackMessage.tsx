import React, { useState, Fragment, useEffect } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Filter } from 'utils/text-filter/Filter';

interface Props {
    feedbackMessage: string;
    setFeedbackMessage: any;
}

const FeedbackMessage: React.FC<Props> = ({
    feedbackMessage,
    setFeedbackMessage,
}) => {
    const [violations, setViolations] = useState(String);

    const getViolationsFormatted = () => {
        const filter = new Filter([]);

        filter.checkForViolations(feedbackMessage);

        return filter.getViolationsFormatted();
    };

    useEffect(() => {
        const violations = getViolationsFormatted();

        violations.length ? setViolations(violations) : setViolations('');

    }, [feedbackMessage])

    return (
        <Fragment>
            <Textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
            />

            {violations.length ? (
                <Alertstripe form="inline" type="feil">
                    <Normaltekst>
                        Vi mistenker at du har skrevet inn
                        {violations}. Dersom du likevel mener dette er riktig
                        kan du trykke 'Send inn'
                    </Normaltekst>
                </Alertstripe>
            ) : null}
        </Fragment>
    );
};

export default FeedbackMessage;
