import React, { useMemo, useEffect } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Filter } from '../text-filter/Filter';
import './FeedbackMessage.less';

export const MAX_LENGTH = 1000;

interface Props {
    feedbackMessage: string;
    setFeedbackMessage: any;
    errors: object;
    setErrors: any;
    label?: React.ReactNode;
    description?: React.ReactNode;
}

const FeedbackMessage = (props: Props) => {
    const {
        feedbackMessage,
        setFeedbackMessage,
        errors,
        setErrors,
        label,
        description
    } = props;

    const violationsMemoized = useMemo(
        () => {
            const filter = new Filter([]);
            filter.checkForViolations(feedbackMessage);
            return filter.getViolationsFormatted();
        }, [feedbackMessage]
    );

    useEffect(() => {
        setErrors({...errors, textFieldValidInputs: violationsMemoized })
    }, [violationsMemoized])


    return (
        <>
            <Textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                description={description}
                label={label}
                placeholder="Skriv din tilbakemelding her"
                maxLength={MAX_LENGTH}
                feil={ violationsMemoized.length || feedbackMessage.length > MAX_LENGTH ? (
                        <>
                            {violationsMemoized.length > 0 &&
                                <>
                                    Det ser ut som du har skrevet inn
                                    {violationsMemoized}. Dette må fjernes før du kan gå videre.
                                </>
                            }
                            { feedbackMessage.length > MAX_LENGTH &&
                                <> {`Du kan ikke skrive mer enn ${MAX_LENGTH} tegn`}</>
                            }
                        </>

                    ) : null}

            />

        </>
    );
};

export default FeedbackMessage;
