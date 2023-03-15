import { Action, Reducer } from 'redux';
import { ActionType } from '../actions';

export enum Locale {
    IKKEBESTEMT = 'IKKEBESTEMT',
    BOKMAL = 'nb',
    NYNORSK = 'nn',
    ENGELSK = 'en',
    SAMISK = 'se',
    POLSK = 'pl',
    UKRAINSK = 'uk',
    RUSSISK = 'ru',
}

export type AvailableLanguage =
    | {
          url?: string;
          locale: Locale;
          handleInApp: true;
      }
    | {
          url: string;
          locale: Locale;
          handleInApp?: false;
      };

export interface LanguageState {
    language: Locale;
}

const initialLanguageState: LanguageState = {
    language: Locale.BOKMAL,
};

export const languageDuck = genericDuck<LanguageState, ActionType.SETT_LANGUAGE>(
    initialLanguageState,
    ActionType.SETT_LANGUAGE
);

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

function genericDuck<I extends object, T>(initialState: I, actionType: T): GenericDuck<I, T> {
    const reducer = (state: I = initialState, action: ActionCreator<T>): I => {
        switch (action.type) {
            case actionType: {
                const { ...data } = action;
                return Object.assign({}, state, data);
            }
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
