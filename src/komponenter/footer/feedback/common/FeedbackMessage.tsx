import React, { useState, Fragment, useEffect, useMemo } from 'react';
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
    const getViolationsFormatted = () => {
        const filter = new Filter([]);

        filter.checkForViolations(feedbackMessage);

        return filter.getViolationsFormatted();
    };

    const violationsMemoized = useMemo(() => getViolationsFormatted(), [
        feedbackMessage,
    ]);

    return (
        <Fragment>
            <Textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
            />

            {violationsMemoized.length ? (
                <Alertstripe form="inline" type="feil">
                    <Normaltekst>
                        Vi mistenker at du har skrevet inn
                        {violationsMemoized}. Dersom du likevel mener dette er riktig
                        kan du trykke 'Send inn'
                    </Normaltekst>
                </Alertstripe>
            ) : null}
        </Fragment>
    );
};

export default FeedbackMessage;
