import React, { useMemo, useEffect } from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import { Filter } from '../text-filter/Filter';
import './FritekstFelt.less';

export const MAX_LENGTH = 1000;

export interface FritekstFeil {
    invalidInput?: string,
    maxLength?: string
}

interface Props extends Partial<TextareaProps> {
    feedbackMessage: string;
    setFeedbackMessage: any;
    errors: FritekstFeil;
    setErrors:  (errors: FritekstFeil) => void;
    textareaRef?: (textarea: HTMLTextAreaElement | null) => any;
}

const FritekstFelt = (props: Props) => {
    const {
        feedbackMessage,
        setFeedbackMessage,
        errors,
        setErrors,
        label,
        description,
        textareaRef
    } = props;

    const violationsMemoized = useMemo(
        () => {
            const filter = new Filter([]);
            filter.checkForViolations(feedbackMessage);
            return filter.getViolationsFormatted();
        }, [feedbackMessage]
    );

    useEffect(() => {
        if (violationsMemoized.length > 0) {
            setErrors({...errors, invalidInput: `Det ser ut som du har skrevet inn
                ${violationsMemoized}. Dette må fjernes før du kan gå videre.` })
        } else {
            setErrors({...errors, invalidInput: undefined })
        }
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
                textareaRef={textareaRef}
                feil={ (errors.invalidInput || errors.maxLength) ? (
                        <>
                            {errors.invalidInput}
                            { errors.maxLength &&
                                <> {errors.maxLength}</>
                            }
                        </>
                    ) : null
                }
            />

        </>
    );
};

export default FritekstFelt;
