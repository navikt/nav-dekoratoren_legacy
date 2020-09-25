import React, { Fragment, useMemo, useEffect } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Filter } from 'utils/text-filter/Filter';
import Tekst from 'tekster/finn-tekst';
import './FeedbackMessage.less';

interface Props {
    feedbackMessage: string;
    setFeedbackMessage: any;
    errors: object;
    setErrors: any; 
}

const FeedbackMessage = ({
    feedbackMessage,
    setFeedbackMessage,
    errors,
    setErrors
}: Props) => {

    const violationsMemoized = useMemo(
        () => {
            const filter = new Filter([]);
            filter.checkForViolations(feedbackMessage);
            return filter.getViolationsFormatted();
        }

        , [feedbackMessage]
    );

    useEffect(() => {
        setErrors({...errors, textFieldValidInputs: violationsMemoized })
    }, [violationsMemoized])

    return (
        <>
            <div className="advarsel">
                <Alertstripe type="advarsel">
                    <Tekst id="advarsel-om-personopplysninger" />
                </Alertstripe>
            </div>

            <Textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
            />

            { violationsMemoized.length ? (
                <Alertstripe
                    className="personvernAdvarsel"
                    form="inline"
                    type="feil"
                >
                    <Normaltekst>
                        Vi mistenker at du har skrevet inn
                        {violationsMemoized}. Dersom du likevel mener dette er
                        riktig kan du trykke 'Send inn'
                    </Normaltekst>
                </Alertstripe>
            ) : null }
        </>
    );
};

export default FeedbackMessage;
