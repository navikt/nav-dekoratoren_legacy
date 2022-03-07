import React, { useEffect, Dispatch } from 'react';
import { Ingress, Textarea, TextareaProps } from '@navikt/ds-react';
import { checkForViolations, getViolationErrorMessage } from './Sanitizer';
import { useDebounce } from '../../../../../utils/hooks/useDebounce';
import Tekst from '../../../../../tekster/finn-tekst';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import './FritekstFelt.less';

export const MAX_LENGTH = 200;

export interface FritekstFeil {
    invalidInput?: string;
    maxLength?: string;
}

export const initialFritekstFeil: FritekstFeil = {
    invalidInput: undefined,
    maxLength: undefined,
};

export type FritekstFeilAction =
    | { type: 'invalid'; message: string | undefined }
    | { type: 'maxLength'; message: string | undefined }
    | { type: 'reset' };

export function fritekstFeilReducer(state: FritekstFeil, action: FritekstFeilAction) {
    switch (action.type) {
        case 'invalid':
            return {
                ...state,
                invalidInput: action.message,
            };
        case 'maxLength':
            return {
                ...state,
                maxLength: action.message,
            };
        case 'reset':
            return { maxLength: undefined, invalidInput: undefined };
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
    harTrykketSubmit: boolean;
}

const FritekstFelt = (props: Props) => {
    const { language } = useSelector((state: AppState) => state.language);
    const debouncedInputVerdier = useDebounce(props.feedbackMessage, 500);
    const { feedbackMessage, setErrors, harTrykketSubmit } = props;

    useEffect(() => {
        const violations = checkForViolations(debouncedInputVerdier);
        if (violations.length > 0) {
            const errorMelding = getViolationErrorMessage(violations, language);
            setErrors({ type: 'invalid', message: errorMelding });
        } else {
            setErrors({ type: 'invalid', message: undefined });
        }
    }, [debouncedInputVerdier, setErrors]);

    const fritekstChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setFeedbackMessage(e.target.value);
        // Fjern feilmelding når bruker begynner å skrive etter en submit
        if (harTrykketSubmit && feedbackMessage.length > MAX_LENGTH) {
            setErrors({ type: 'maxLength', message: undefined });
        }
    };

    /*
     * Per 01.03.2022 Textarea does not support custom countdown text, which
     * the previous nav-frontend-skjema/Textarea did. Will add a PR to suggest
     * feature re-added. Keeping this function commented out as we expect to be
     * able to reuse it shortly.
    const tellerTekst = (antallTegn: number, maxLength: number): React.ReactNode => {
        let content = '';
        let className = '';
        const antallTegnIgjen = maxLength - antallTegn;
        if (antallTegnIgjen < 0) {
            content = finnTekst('textarea-overmaks', language, Math.abs(antallTegnIgjen).toString());
            className = 'teller-tekst teller-tekst--overflow';
        } else {
            content = finnTekst('textarea-undermaks', language, antallTegnIgjen.toString());
            className = 'teller-tekst';
        }

        return (
            <span className={className} aria-live="polite">
                {content}
            </span>
        );
    };
    */

    const getErrorMessage = () => {
        const { invalidInput, maxLength } = props.errors;

        if (!invalidInput && !maxLength) {
            return null;
        }

        return (
            <>
                {props.errors.invalidInput && <>{props.errors.invalidInput}</>}
                {props.errors.maxLength && <span> {props.errors.maxLength}</span>}
            </>
        );
    };

    return (
        <Textarea
            value={props.feedbackMessage}
            onChange={fritekstChanged}
            description={props.description}
            label={
                <Ingress>
                    <Tekst id="hva-lette-du-etter" />
                </Ingress>
            }
            maxLength={MAX_LENGTH}
            error={getErrorMessage()}
        />
    );
};

export default FritekstFelt;
