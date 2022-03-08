import { MenuValue } from 'utils/meny-storage-utils';
import { ActionType } from 'store/actions';
import { Handling } from 'store/actions';
import { SettArbeidsgiverAction } from 'store/actions';
import { SettSamarbeidspartnerAction } from 'store/actions';
import { SettPrivatpersonAction } from 'store/actions';

export interface Arbeidsflate {
    status: MenuValue;
}

export const initialState: Arbeidsflate = {
    status: MenuValue.IKKEBESTEMT,
};

export const reducer = (state: Arbeidsflate = initialState, action: Handling): Arbeidsflate => {
    switch (action.type) {
        case ActionType.PRIVATPERSON: {
            return { ...state, status: MenuValue.PRIVATPERSON };
        }
        case ActionType.ARBEIDSGIVER: {
            return { ...state, status: MenuValue.ARBEIDSGIVER };
        }
        case ActionType.SAMARBEIDSPARTNER: {
            return { ...state, status: MenuValue.SAMARBEIDSPARTNER };
        }
        default:
            return state;
    }
};

export const settArbeidsflate = (type: MenuValue) => {
    switch (type) {
        case MenuValue.PRIVATPERSON:
            return { type: ActionType.PRIVATPERSON };
        case MenuValue.ARBEIDSGIVER:
            return { type: ActionType.ARBEIDSGIVER };
        case MenuValue.SAMARBEIDSPARTNER:
            return { type: ActionType.SAMARBEIDSPARTNER };
        default:
            return { type: ActionType.PRIVATPERSON };
    }
};

export const settPersonflate = (): SettPrivatpersonAction => ({
    type: ActionType.PRIVATPERSON,
});

export const settArbeidsgiverflate = (): SettArbeidsgiverAction => ({
    type: ActionType.ARBEIDSGIVER,
});

export const settSamarbeidspartnerflate = (): SettSamarbeidspartnerAction => ({
    type: ActionType.SAMARBEIDSPARTNER,
});

export default reducer;
