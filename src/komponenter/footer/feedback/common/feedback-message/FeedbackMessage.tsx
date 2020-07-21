import React, { useState, Fragment, useEffect, useMemo } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Filter } from 'utils/text-filter/Filter';
import Tekst from 'tekster/finn-tekst';
import './FeedbackMessage.less';

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
            <div className="advarsel">
                <Alertstripe type="advarsel">
                    <Tekst id="advarsel-om-personopplysninger" />
                </Alertstripe>
            </div>

            <Textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
            />

            {violationsMemoized.length ? (
                <Alertstripe className="personvernAdvarsel" form="inline" type="feil">
                    <Normaltekst>
                        Vi mistenker at du har skrevet inn
                        {violationsMemoized}. Dersom du likevel mener dette er
                        riktig kan du trykke 'Send inn'
                    </Normaltekst>
                </Alertstripe>
            ) : null}
        </Fragment>
    );
};

export default FeedbackMessage;
