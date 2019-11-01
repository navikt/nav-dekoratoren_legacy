import { Action, Reducer } from 'redux';
import { ActionType } from '../redux/actions';

export enum Language {
    NORSK = 'NORSK',
    ENGELSK = 'ENGELSK',
    SAMISK = 'SAMISK',
}

export interface LanguageState {
    language: Language;
}

const initialLanguageState: LanguageState = {
    language: Language.NORSK,
};

export const languageDuck = genericDuck<
    LanguageState,
    ActionType.SETT_LANGUAGE
>(initialLanguageState, ActionType.SETT_LANGUAGE);

export interface Data {
    [key: string]: any;
}

interface ActionCreator<A> extends Data {
    type: A;
}

interface GenericDuck<I, T> {
    reducer: Reducer<I, Action<T>>;
    actionCreator: (data: Data) => Action<T>;
}

function genericDuck<I extends object, T>(
    initialState: I,
    actionType: T
): GenericDuck<I, T> {
    const reducer = (state: I = initialState, action: ActionCreator<T>): I => {
        switch (action.type) {
            case actionType:
                const { ...data } = action;
                return Object.assign({}, state, data);
            default:
                return state;
        }
    };

    const actionCreator = (data: Data): ActionCreator<T> => ({
        ...data,
        type: actionType,
    });

    return {
        reducer,
        actionCreator,
    };
}

export const spraakValgetErNorsk = (lang: Language): boolean => {
    return lang === Language.NORSK;
};

export const spraakValgetErEngelsk = (lang: Language): boolean => {
    return lang === Language.ENGELSK;
};

export const spraakValgetErSamisk = (lang: Language): boolean => {
    return lang === Language.SAMISK;
};
