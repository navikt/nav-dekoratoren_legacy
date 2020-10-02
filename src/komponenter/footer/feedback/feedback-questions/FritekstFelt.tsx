import React, { useMemo, useEffect, Dispatch, ReducerAction } from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import { Filter } from '../text-filter/Filter';
import './FritekstFelt.less';

export const MAX_LENGTH = 1000;

export interface FritekstFeil {
    invalidInput?: string,
    maxLength?: string
}

export const initialFritekstFeil: FritekstFeil = {
    invalidInput: undefined,
    maxLength: undefined
}

export type FritekstFeilAction =
    | {type: 'invalid', message: string | undefined}
    | {type: 'maxLength', message: string | undefined}
    | {type: 'reset'};


export function fritekstFeilReducer(state: FritekstFeil, action: FritekstFeilAction) {
    switch (action.type) {
        case 'invalid':
            return {
                ...state,
                invalidInput: action.message
            };
        case 'maxLength':
            return {
                ...state,
                maxLength: action.message
            };
        case 'reset':
            return {maxLength: undefined, invalidInput: undefined};
        default:
            return state;
    }
}


interface Props extends Partial<TextareaProps> {
    feedbackMessage: string;
    setFeedbackMessage: any;
    errors: FritekstFeil;
    setErrors: Dispatch<FritekstFeilAction>;
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
            setErrors({ type: 'invalid', message:  `Det ser ut som du har skrevet inn
                ${violationsMemoized}. Dette må fjernes før du kan gå videre.` });
        } else {
            setErrors({ type: 'invalid', message: undefined});
        }
    }, [violationsMemoized])

    return (
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
                        { errors.invalidInput &&
                            <span> {errors.invalidInput}</span>
                        }
                        { errors.maxLength &&
                            <span> {errors.maxLength}</span>
                        }
                    </>
                ) : null
            }
        />
    );
};

export default FritekstFelt;
